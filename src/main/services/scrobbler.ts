import LastFMTyped from 'lastfm-typed/dist/index'
import { ipcMain } from 'electron-better-ipc'
import { getSession } from 'lastfm-typed/dist/interfaces/authInterface'
import { shell } from 'electron'
import { getInfo, search } from 'lastfm-typed/dist/interfaces/trackInterface'
import MetadataFilter from 'metadata-filter'
import { IpcEvents, PeepoMeta } from '@peepo/core'
import { inject, injectable } from 'inversify'
import axios, { Axios, AxiosInstance, AxiosRequestTransformer } from 'axios'
import pako from 'pako'
import Config from './config'
import Window from './window'
import Store from './store'
import fpcalcAsync from 'fpcalc-async'
// import path from 'path'
import { FpcalcResult } from 'fpcalc'
import { existsSync } from 'fs'

// interface ScrobblerOptions {
//   apiSecret?: string
//   userAgent?: string
//   secureConnection?: boolean
// }

@injectable()
export default class Scrobbler {
  session: getSession | null = null
  lastfm: AxiosInstance
  token: string = ''
  apiKey: string
  apiSecret: string
  currentSong: PeepoMeta | null = null
  fpcalc = fpcalcAsync
  fpcalcExists = false
  filter = MetadataFilter.createYouTubeFilter()
  constructor(@inject(Config) private config: Config, @inject(Window) private window: Window, @inject(Store) private store: Store) {
    const apiKey = import.meta.env.MAIN_VITE_LAST_FM_KEY
    const apiSecret = import.meta.env.MAIN_VITE_LAST_FM_SHARED_SECRET
    // super(apiKey, { apiSecret, userAgent: 'Peepo Sings' })
    this.apiKey = apiKey
    this.apiSecret = apiSecret ?? ''
    this.session = this.store.getOption('lastfm.session') ?? null
    this.fpcalcExists = existsSync(this.config.fpcalcPath)
    this.lastfm = axios.create({
      baseURL: 'https://ws.audioscrobbler.com/2.0/',
      params: {
        api_key: this.apiKey,
        format: 'json',
      },
      // transformRequest: [
      //   (data, headers) => {
      //     if (data instanceof FormData) {
      //       return data
      //     }
      //     const params = new URLSearchParams(data)
      //     return params
      //   },
      // ],
      // transformResponse: [
      //   (data, headers) => {
      //     if (headers['content-encoding'] === 'gzip') {
      //       return pako.inflate(data, { to: 'string' })
      //     }
      //     return data
      //   },
      // ],
    })
  }

  async trackChange(song: PeepoMeta) {
    try {
      await this.scrobble(song)
    } catch (e) {
      console.error(e)
    }
  }

  async scrobble(song: PeepoMeta) {
    if (!this.fpcalcExists) {
      console.log('fpcalc not found')
      return null
    }
    let artistIsTrue = false
    const trackName = this.filter.filterField('track', song.title)
    if (!trackName.includes('-') || song.artist.includes(' - Topic')) {
      artistIsTrue = true
    }
    const artistName = song.artist.replace(' - Topic', '')
    const albumName = song.album

    const fingerprint = await this.getFingerprint(song.path)
    const metadata = await this.getMetadata(fingerprint).catch((e) => {
      console.error(e)
      return null
    })

    console.log(metadata)

    let searchResults
    if (!metadata) {
      searchResults = await this.lastfm.get('', {
        params: {
          method: 'track.search',
          track: trackName,
          limit: 15,
          artist: artistIsTrue ? artistName : undefined,
        },
      })
    } else {
      searchResults = await this.lastfm.get('', {
        params: {
          method: 'track.getInfo',
          mbid: metadata.results[0].id,
        },
      })
    }

    console.log(searchResults.data)
    // const searchResults = (
    //   await this.track.search(trackName, {
    //     limit: 15,
    //     artist: artistIsTrue ? artistName : undefined,
    //   })
    // ).trackMatches
    // let track: (search['trackMatches'][number] | Partial<Omit<getInfo, 'album' | 'artist'>>) & { album?: string; duration?: number; artist: string; name: string } =
    //   searchResults.find((t) => artistName.includes(t.artist) || trackName.includes(t.artist)) ?? searchResults[0]
    // if (!track) {
    //   throw new Error('No track found')
    // }
    // const trackFull = await this.track.getInfo({ mbid: track.mbid! }).catch((e) => {
    //   console.error(e)
    //   return null
    // })
    // track = trackFull
    //   ? {
    //       ...trackFull,
    //       artist: trackFull.artist.name,
    //       album: trackFull.album?.title ?? undefined,
    //       duration: trackFull.duration ?? undefined,
    //     }
    //   : track
    // await this.track
    //   .updateNowPlaying(track.artist, track.name, this.session.key, {
    //     album: track.album,
    //     mbid: track.mbid,
    //     duration: track.duration ?? undefined,
    //   })
    //   .then(() => {
    //     console.log('Now playing', track.artist, ':', track.name)
    //   })
    //   .catch((e) => {
    //     console.error(e)
    //   })
  }

  async login() {
    // const curWindow = this.window.getBrowserWindow()
    // this.token = await this.auth.getToken()
    // await shell.openExternal(`https://www.last.fm/api/auth?api_key=${this.apiKey}&token=${this.token}`)
    // curWindow.once('focus', this.authCallback.bind(this))
  }

  async authCallback() {
    // const session = await this.auth.getSession(this.token)
    // this.session = session
    // this.store.setOption('lastfm.session', session)
    // ipcMain.callFocusedRenderer(IpcEvents.LASTFM_SESSION, session)
  }

  async getMetadata(fingerprint: FpcalcResult<string>) {
    const metaUrl = `https://api.acoustid.org/v2/lookup`
    // console.log()
    const body = {
      client: this.config.acousticId.key,
      meta: 'recordings+releasegroups+compress',
      duration: fingerprint.duration,
      fingerprint: fingerprint.fingerprint,
    }
    const res = await axios.get<{ status: string; results: AcoustidResult[] }>(metaUrl, {
      params: body,
      headers: {
        'User-Agent': 'Peepo Sings',
      },
      paramsSerializer: (params) => {
        return Object.entries(params)
          .map(([key, value]) => `${key}=${value}`)
          .join('&')
      },
      // transformRequest: [...(axios.defaults.transformRequest ? [axios.defaults.transformRequest] : [])]
      //   .concat(function (data, headers) {
      //     // compress strings if over 1KB
      //     if (typeof data === 'string' && data.length > 1024) {
      //       headers['Content-Encoding'] = 'gzip'
      //       return pako.gzip(data)
      //     } else {
      //       // delete is slow apparently, faster to set to undefined
      //       headers['Content-Encoding'] = undefined
      //       return data
      //     }
      //   } as AxiosRequestTransformer)
      //   .flat(),
    })

    if (res.status !== 200) throw new Error('AcousticID returned non 200 status code')
    else if (res.data.status !== 'ok') throw new Error('AcousticID returned non ok status')
    else if (res.data.results.length === 0) {
      console.log('AcousticID returned no results')
      return null
    }
    console.log(res.data)
    let result = res.data.results[0]

    if (result.score < 0.8) {
      console.log('AcousticID returned low score')
      return null
    }

    // const withMeta = await axios.get<{ status: string; results: AcoustidResult[] }>(metaUrl, {
    //   params: {
    //     client: this.config.acousticId.key,
    //     meta: 'releasegroups+recordings',
    //     trackid: result.id,
    //   },
    //   headers: {
    //     'User-Agent': 'Peepo Sings',
    //   },
    // })
    // result = withMeta.data.results[0]
    // console.log(withMeta.request, withMeta.config.params, withMeta.data)
    if (!result.recordings || result.recordings.length === 0) throw new Error('No recordings found')
    const recording = result.recordings[result.recordings.length - 1]
    const artists = recording.artists.map((a) => a.name).join(', ')
    const title = recording.title

    console.log(title, artists, recording.releasegroups[0].title, recording.releasegroups[0].type)

    return res.data
  }

  async getFingerprint(file: string) {
    const result = await this.fpcalc(file, { command: this.config.fpcalcPath })
    // console.log(`<FpCalc.exe> Scanned ${file} with results: `, result)
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
