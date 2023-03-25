import LastFMTyped from 'lastfm-typed'
import { ipcMain } from 'electron-better-ipc'
import { getSession } from 'lastfm-typed/dist/interfaces/authInterface'
import { BrowserWindow, shell } from 'electron'
import { getInfo, search } from 'lastfm-typed/dist/interfaces/trackInterface'
import * as MetadataFilter from 'metadata-filter'
import { IpcEvents, PeepoMeta } from '@peepo/core'
import { inject, injectable } from 'inversify'
import axios from 'axios'
import pako from 'pako'
import Config from './config'
import Window from './window'
import Store from './store'
import fpcalcAsync from 'fpcalc-async'
import path from 'path'
import { FpcalcResult } from 'fpcalc'

interface ScrobblerOptions {
  apiSecret?: string
  userAgent?: string
  secureConnection?: boolean
}

@injectable()
export default class Scrobbler {
  lastfm: LastFMTyped
  session: getSession | null = null
  token: string = ''
  apiKey: string
  apiSecret: string
  currentSong: PeepoMeta | null = null
  fpcalc = fpcalcAsync
  filter = MetadataFilter.createYouTubeFilter()
  constructor(@inject(Config) private config: Config, @inject(Window) private window: Window, @inject(Store) private store: Store) {
    const apiKey = process.env.VITE_LAST_FM_KEY
    const apiSecret = process.env.VITE_LAST_FM_SHARED_SECRET
    this.lastfm = new LastFMTyped(apiKey, { apiSecret, userAgent: 'Peepo Sings' })
    this.apiKey = apiKey
    this.apiSecret = apiSecret ?? ''
    this.session = this.store.getOption('lastfm.session') ?? null
  }

  async trackChange(song: PeepoMeta) {
    try {
      await this.scrobble(song)
    } catch (e) {
      console.error(e)
    }
  }

  async scrobble(song: PeepoMeta) {
    if (!this.session) {
      throw new Error('No session')
    }
    let artistIsTrue = false
    const trackName = this.filter.filterField('track', song.title)
    if (!trackName.includes('-') || song.artist.includes(' - Topic')) {
      artistIsTrue = true
    }
    const artistName = song.artist.replace(' - Topic', '')
    const albumName = song.album
    const searchResults = (
      await this.lastfm.track.search(trackName, {
        limit: 10,
        artist: artistIsTrue ? artistName : undefined,
      })
    ).trackMatches
    let track: (search['trackMatches'][number] | Partial<Omit<getInfo, 'album' | 'artist'>>) & { album?: string; duration?: number; artist: string; name: string } =
      searchResults.find((t) => artistName.includes(t.artist) || trackName.includes(t.artist)) ?? searchResults[0]
    if (!track) {
      throw new Error('No track found')
    }
    const trackFull = await this.lastfm.track.getInfo({ mbid: track.mbid! }).catch((e) => {
      console.error(e)
      return null
    })
    track = trackFull
      ? {
          ...trackFull,
          artist: trackFull.artist.name,
          album: trackFull.album?.title ?? undefined,
          duration: trackFull.duration ?? undefined,
        }
      : track
    await this.lastfm.track
      .updateNowPlaying(track.artist, track.name, this.session.key, {
        album: track.album,
        mbid: track.mbid,
        duration: track.duration ?? undefined,
      })
      .then(() => {
        console.log('Now playing', track.artist, ':', track.name)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  async login() {
    const curWindow = this.window.getBrowserWindow()
    this.token = await this.lastfm.auth.getToken()
    await shell.openExternal(`https://www.last.fm/api/auth?api_key=${this.apiKey}&token=${this.token}`)
    curWindow.once('focus', this.authCallback.bind(this))
  }

  async authCallback() {
    const session = await this.lastfm.auth.getSession(this.token)
    this.session = session
    this.store.setOption('lastfm.session', session)
    ipcMain.callFocusedRenderer(IpcEvents.LASTFM_SESSION, session)
  }

  async getMetadata(fingerprint: FpcalcResult<string>) {
    const metaUrl = `https://api.acoustid.org/v2/lookup`
    const body = {
      client: this.config.acousticId.key,
      meta: 'recordings+releasegroups+compress',
      duration: fingerprint.duration,
      fingerprint: fingerprint.fingerprint,
    }
    const res = await axios.post<{ status: string; results: AcoustidResult[] }>(metaUrl, body, {
      headers: {
        'User-Agent': 'Peepo Sings',
      },
      transformRequest: [...(Array.isArray(axios.defaults.transformRequest) ? axios.defaults.transformRequest : [axios.defaults.transformRequest])].concat(function (data, headers) {
        // compress strings if over 1KB
        if (typeof data === 'string' && data.length > 1024) {
          headers['Content-Encoding'] = 'gzip'
          return pako.gzip(data)
        } else {
          // delete is slow apparently, faster to set to undefined
          headers['Content-Encoding'] = undefined
          return data
        }
      }),
    })
  }

  async getFingerprint(file: string) {
    const result = await this.fpcalc(file, { command: this.config.fpcalcPath })
    return result
  }
}

interface AcoustidResult {
  score: number
  id: string
  recordings: {
    duration: number
    id: string
    title: string
    releasegroups: {
      id: string
      title: string
      type: string
    }[]
    artists: {
      id: string
      name: string
    }[]
  }[]
}
