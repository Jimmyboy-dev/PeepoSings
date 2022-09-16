import { BrowserWindow, Notification, protocol } from 'electron'
import { app } from 'electron'
import { ipcMain as ipc } from 'electron-better-ipc'
import fs from 'fs'
import path from 'path'
import ffBin from 'ffbinaries'
import type { FfmpegCommand } from 'fluent-ffmpeg'

import ffmpeg from 'fluent-ffmpeg'
import ffmetadata from 'ffmetadata'
import { PassThrough, Readable } from 'stream'
import sanitize from 'sanitize-filename'
import { DownloadInfo, IpcEvents, PeepoMeta, VideoInfo } from '@peepo/core'
import { inject, injectable } from 'inversify'
import Window from './window'
import { Database } from './Database'
import YTDlpWrap, { YTDlpReadable } from 'yt-dlp-wrap'
import Config from './config'
import { tmpdir } from 'os'
import { mkdtemp, rm, rmdir } from 'fs/promises'

@injectable()
export class MusicManager {
  ytdlPath: string
  ffmpegPath: string
  binPath: string
  ytdl: YTDlpWrap
  musicPath: string
  currentDownload?: YTDlpReadable
  dlInfo?: DownloadInfo

  constructor(@inject(Window) private window: Window, @inject(Database) private db: Database, @inject(Config) private config: Config) {
    this.binPath = path.resolve(app.getPath('exe'), this.config.isProd() ? '../' : '../../../..', 'bin')
    this.ytdlPath = path.resolve(this.binPath, `yt-dlp${process.platform === 'win32' ? '.exe' : ''}`)
    this.musicPath = path.join(app.getPath('music'), 'peepo-sings')
    this.ytdl = new YTDlpWrap(this.ytdlPath)
    this.init()
  }
  /**
   * Downloads latest binary of yt-dlp and sets up the ytdl instance.
   */
  private async init() {
    // Download ffmpeg if it doesn't exist
    const ffmpegInstalled = ffBin.locateBinariesSync(['ffmpeg', 'ffprobe'], { ensureExecutable: true, paths: [this.binPath] })
    if (!ffmpegInstalled.ffmpeg.found || !ffmpegInstalled.ffprobe.found || [ffmpegInstalled.ffmpeg.version, ffmpegInstalled.ffprobe.version].some((v) => v !== '4.4.1')) {
      await new Promise<void>((resolve, reject) => {
        ffBin.downloadBinaries(['ffmpeg', 'ffprobe'], { destination: this.binPath }, (err, binaries) => {
          if (err) {
            console.error(err)
            return reject(err)
          }
          for (let i = 0; i < 2; i++) {
            const binary = binaries[i]
            if (i === 0) {
              this.ffmpegPath = path.resolve(binary.path, binary.filename)
              ffmpeg.setFfmpegPath(this.ffmpegPath)
              ffmetadata.setFfmpegPath(this.ffmpegPath)
            } else {
              ffmpeg.setFfprobePath(path.resolve(binary.path, binary.filename))
            }
          }
          resolve()
        })
      })
      console.log('FFMPEG Installed to:', this.ffmpegPath)
    } else {
      this.ffmpegPath = ffmpegInstalled.ffmpeg.path
      ffmpeg.setFfprobePath(ffmpegInstalled.ffprobe.path)
      console.log('FFMPEG found at:')
      console.dir(ffmpegInstalled)
    }
    ffmpeg.setFfmpegPath(this.ffmpegPath)
    ffmetadata.setFfmpegPath(this.ffmpegPath)
    console.log('FFMPEG Installed to:', this.ffmpegPath)

    let githubReleasesData = await YTDlpWrap.getGithubReleases(1, 5)
    let currVersion: string | null = null

    if (fs.existsSync(this.ytdlPath)) {
      currVersion = (await this.ytdl.getVersion()).trim()
      // console.log('current yt-dlp version:', currVersion)
    }
    if (currVersion !== githubReleasesData[0].tag_name.trim()) {
      await YTDlpWrap.downloadFromGithub(this.ytdlPath)
        .then(() => {
          console.log('Downloaded Latest yt-dlp, version', githubReleasesData[0].tag_name)
        })
        .catch((e) => {
          console.log(e)
        })
    } else {
      console.log('yt-dlp is up to date, version', currVersion)
    }

    protocol.registerStreamProtocol('preview', (request, callback) => {
      const url = request.url.replace('preview', 'https')

      callback(this.getPreviewStream(url))
    })

    await this.readCurrentData()
  }

  private showNotification(title: string, body: string) {
    new Notification({ title, body }).show()
  }

  private async readCurrentData() {
    if (!fs.existsSync(this.musicPath)) {
      fs.mkdirSync(this.musicPath, { recursive: true })
    }
    if (!this.db.isInitialized) {
      await new Promise<void>((resolve) => {
        const to = setInterval(() => {
          if (this.db.isInitialized) {
            clearTimeout(to)
            resolve()
          }
        }, 100)
      })
    }
    const files = fs.readdirSync(this.musicPath)
    const knownSongs = await this.db.songs.find()
    console.log('Currently known songs:', knownSongs.map((s) => s.metadata.title).join(', '))

    knownSongs
      .filter((s) => !fs.existsSync(s.path))
      .forEach((s) => {
        this.removeSong(s.path)
      })
    for (const file of files) {
      const filePath = path.join(this.musicPath, file)
      const song = knownSongs.find((s) => s.path === filePath)
      if (song) continue

      const info = ffmetadata.read(filePath, (err, metadata) => {
        if (err) {
          console.error(err)
          return
        }
        console.log(metadata)
      })
    }
  }

  removeSong(path: string) {
    try {
      if (fs.existsSync(path)) {
        fs.rmSync(path, { maxRetries: 5 })
      }
      this.db.songs.delete({
        path,
      })
    } catch (e) {
      console.error(e)
    }
  }

  async addSong(url: string) {
    // const info = await this.getYoutubeVideoInfo(url)

    this.getYoutubeVideo(url)
      .catch((e) => {
        console.error('YT vid failed dl:', e)
        return null
      })
      .then(async (res) => {
        if (!res) return Promise.reject('Failed to download video')

        const { info, path, stream } = res
        const cleanedMeta = this.cleanMetadata(info)

        const songEntity = this.db.songs.create({
          title: info.track ?? info.title,
          path,
          artist: info.artist ?? info.channel ?? info.creator ?? info.uploader ?? 'Unknown',
          duration: info.duration,
          in: 0,
          out: info.duration,
          thumbnail: info.thumbnail ?? info.thumbnails.reduceRight((best, cur) => (cur.preference > best.preference ? cur : best)).url,
          metadata: cleanedMeta,
          album: info.album ?? undefined,
          mood: [],
        })
        const song = await this.db.songs.save(songEntity)
        ipc.callRenderer(this.window.getBrowserWindow(), IpcEvents.MUSIC_FINISHED, { path: path, dlInfo: this.dlInfo, song })
      })
      .catch((e) => {
        console.error(e)
        this.showNotification(`Error Occurred Downloading ${url}`, e || 'Unknown Error')
      })
  }
  cleanMetadata(info: VideoInfo): VideoInfo {
    const cleanedInfo: VideoInfo = {
      ...info,
      thumbnails: info.thumbnails.filter((thumbnail) => thumbnail.preference > -7),
      formats: null,
      format: null,
      requested_formats: null,
    }
    return cleanedInfo
  }

  public async getYoutubeVideo(url: string) {
    // if (!this.isVideo(url)) return
    const info = await this.getYoutubeVideoInfo(url)

    const savePath = path.join(this.musicPath, sanitize(info.title.trim().replace(/[/|\\]/g, ''), { replacement: '' }) + '.mp3')
    this.dlInfo = { start: Date.now(), vidInfo: info, savePath }
    let progress: number = 0
    let tempPath = await mkdtemp(`${tmpdir()}${path.sep}`)
    const tempVidPath = path.join(tempPath, `temp.${info.ext}`)
    let stream = this.ytdl.execStream([url, '-f', 'bestaudio'])
    this.currentDownload = stream
    stream.pipe(fs.createWriteStream(tempVidPath))
    try {
      await new Promise<void>((resolve, reject) => {
        stream
          .on('progress', (prog) => {
            this.window.setProgressBar(prog.percent / 200)
          })
          .on('end', () => {
            resolve()
          })
          .on('error', (e) => {
            reject(e)
          })
      })
    } catch (e) {
      console.error(e)
    }
    const dl = ffmpeg(tempVidPath)
      .audioBitrate(128)
      .save(savePath)
      .on('progress', (p) => {
        if (p.percent - progress > 0.1) {
          progress = p.percent

          console.log(`${p.percent}% downloaded`)
          if (this.window) ipc.callRenderer(this.window.getBrowserWindow(), IpcEvents.MUSIC_PROGRESS, { raw: p, msg: `${p.percent}% downloaded`, dlInfo: this.dlInfo })
        }

        this.window.setProgressBar(0.5 + p.percent / 200)
      })
      .on('error', (err) => {
        console.error('Cannot process youtube download: ' + err.message)
        if (this.window)
          ipc.callRenderer(this.window.getBrowserWindow(), IpcEvents.MUSIC_ERROR, {
            err,
            path: savePath,
            dlInfo: this.dlInfo,
            title: this.dlInfo?.vidInfo.title,
          })
        this.window.setProgressBar(-1)
      })
      .on('end', () => {
        // if (!this.dlInfo) return
        console.log(`\nFinished downloading "${this.dlInfo.vidInfo.title}" by ${this.dlInfo.vidInfo.channel}, took ${(Date.now() - (this.dlInfo?.start || Date.now())) / 1000}s`)
        this.window.setProgressBar(-1)
        this.currentDownload = null
        rm(tempPath, { recursive: true, force: true, maxRetries: 5, retryDelay: 500 })
      })
    return { path: savePath, info, stream: dl }
  }

  public async getYoutubeVideoInfo(url: string) {
    if (!url || url.length < 1) return
    return (await this.ytdl.getVideoInfo([url, '-f', 'bestaudio'])) as VideoInfo
  }

  async getSongs() {
    return await this.db.songs.find({ relations: { mood: true } })
  }
  async getMoods() {
    return await this.db.moods.find()
  }

  getPreviewStream(url: string) {
    console.log('getPreviewStream', url)
    return this.ytdl.execStream([url])
  }
}
