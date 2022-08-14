import LastFMTyped from 'lastfm-typed'
import { ipcMain } from 'electron-better-ipc'
import { getSession } from 'lastfm-typed/dist/interfaces/authInterface'
import { BrowserWindow, shell } from 'electron'
import { getInfo, search } from 'lastfm-typed/dist/interfaces/trackInterface'
import MetadataFilter from 'metadata-filter'

interface ScrobblerOptions {
  apiSecret?: string
  userAgent?: string
  secureConnection?: boolean
}

export class Scrobbler extends LastFMTyped {
  session: getSession | null = null
  token: string = ''
  apiKey: string
  apiSecret: string
  currentSong: SongJSON | null = null

  filter = MetadataFilter.createYouTubeFilter()
  constructor(apiKey: string, options?: ScrobblerOptions) {
    super(apiKey, options)
    this.apiKey = apiKey
    this.apiSecret = options?.apiSecret ?? ''
    ipcMain.answerRenderer('lastfm-login', this.login.bind(this))
    ipcMain.answerRenderer('lastfm-session', (session: getSession) => {
      this.session = session
    })
  }

  async onSong(song: SongJSON) {
    try {
      await this.scrobble(song)
    } catch (e) {
      console.error(e)
    }
  }

  async scrobble(song: SongJSON) {
    if (!this.session) {
      throw new Error('No session')
    }
    let artistIsTrue = false
    const trackName = this.filter.filterField('track', song.title)
    if (!trackName.includes('-')) {
      artistIsTrue = true
    }
    const artistName = song.artist.replace(' - Topic', '')
    const albumName = song.album
    const searchResults = (
      await this.track.search(trackName, {
        limit: 10,
        artist: artistIsTrue ? artistName : undefined,
      })
    ).trackMatches
    let track: (search['trackMatches'][number] | Partial<Omit<getInfo, 'album' | 'artist'>>) & { album?: string; duration?: number; artist: string; name: string } =
      searchResults.find((t) => artistName.includes(t.artist) || trackName.includes(t.artist)) ?? searchResults[0]
    if (!track) {
      throw new Error('No track found')
    }
    const trackFull = await this.track.getInfo({ mbid: track.mbid! }).catch((e) => {
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
    await this.track
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
    const curWindow = BrowserWindow.getFocusedWindow()!
    this.token = await this.auth.getToken()
    await shell.openExternal(`https://www.last.fm/api/auth?api_key=${this.apiKey}&token=${this.token}`)
    curWindow.once('focus', this.authCallback.bind(this))
  }

  async authCallback(token: string | null) {
    const session = await this.auth.getSession(this.token)
    this.session = session
    ipcMain.callFocusedRenderer('lastfm-session', session)
  }
}
