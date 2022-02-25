import { app } from "electron"
import { ipcMain as ipc } from "electron-better-ipc"
import fs from "fs"
import path from "path"
import ytdl from "ytdl-core"
import ffmpeg from "fluent-ffmpeg"
import type { Readable } from "stream"
import sanitize from "sanitize-filename"





export class MusicManager {

  private static instance: MusicManager
  musicPath: string
  currentDownload?: Readable
  dlInfo?: DownloadInfo

  private constructor() {
    if (MusicManager.instance) {
      throw new Error("Error: Instantiation failed: Use MusicManager.getInstance() instead of new.")
    }
    else {
      const musicDir = app.getPath("music")
      this.musicPath = path.join(musicDir, "twitch-music-manager")
      this.readCurrentData()
      MusicManager.instance = this
    }
  }


  public static getInstance() {
    if (!MusicManager.instance) {
      MusicManager.instance = new MusicManager()
    }
    return MusicManager.instance
  }

  removeSong(path: string) {

    try {
      if (fs.existsSync(path)) {
        fs.rmSync(path, { maxRetries: 5 })
      }
    } catch (e) {
      console.error(e)
    }
  }

  async addSong(url: string): Promise<Omit<SongJSON, "id" | "mood">> {
    const info = await this.getYoutubeVideoInfo(url)
    const path = await this.getYoutubeVideo(url).catch(e => {
      console.log(e)
      return null
    })
    if (!path) return Promise.reject("Failed to download video")
    const song: Omit<SongJSON, "id" | "mood"> = {
      title: info.videoDetails.title,
      filePath: path,
      artist: info.videoDetails.author.name,
      duration: parseInt(info.videoDetails.lengthSeconds),
      in: 0,
      out: parseInt(info.videoDetails.lengthSeconds),
      albumArt: info.videoDetails.thumbnails[0].url,
      metadata: info.videoDetails,
    }
    return song
  }

  private readCurrentData() {

    if (!fs.existsSync(this.musicPath)) {
      fs.mkdirSync(this.musicPath, { recursive: true })
    }

    // const songsFound: SongJSON[] = []
    // fs.readdirSync(this.musicPath).forEach(file => {
    // const filePath = path.join(this.musicPath, file)
    // const foundSong = songs.find(song => song.filePath === filePath)
    // if (foundSong === undefined) {
    //   fs.rmSync(filePath);
    // }
    // else {
    //   songsFound.push(foundSong);
    // }

    // })

    // this.store.set("songs", songs);
  }

  isVideo(url: string) {
    return ytdl.validateURL(url)
  }

  public async getYoutubeVideo(url: string) {
    if (!this.isVideo(url)) return
    const info = await this.getYoutubeVideoInfo(url)
    const savePath = path.join(this.musicPath, sanitize(info.videoDetails.title.trim().replace(/[/|\\]/g, ""), { replacement: "" }) + ".mp3")
    this.currentDownload = ytdl(url, { quality: "highestaudio" })
    this.dlInfo = { start: Date.now(), vidInfo: info, savePath }
    ffmpeg(this.currentDownload)
      .audioBitrate(128)
      .save(savePath)
      .on("progress", p => {

        console.log(`${p.targetSize}kb downloaded`)
        ipc.callFocusedRenderer("download-progress", { raw: p, msg: `${p.targetSize}kb downloaded`, dlInfo: this.dlInfo })
      })
      .on("end", () => {
        if (!this.dlInfo) return
        console.log(`\nFinished downloading "${this.dlInfo.vidInfo.videoDetails.title}" by ${this.dlInfo.vidInfo.videoDetails.author}, took ${(Date.now() - (this.dlInfo?.start || Date.now())) / 1000}s`)

        ipc.callFocusedRenderer("download-end", { path: savePath, dlInfo: this.dlInfo })

      })
    return savePath


  }

  public async getYoutubeVideoInfo(url: string) {
    return await ytdl.getBasicInfo(url)

  }
}

