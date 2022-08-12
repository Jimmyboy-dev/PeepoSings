import LastFMTyped from 'lastfm-typed'
import { ipcMain } from 'electron-better-ipc'
import { getSession } from 'lastfm-typed/dist/interfaces/authInterface'
import { BrowserWindow, shell } from 'electron'

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
    const trackName = song.title
    const artistName = song.artist
    const albumName = song.album
    const searchResults = (
      await this.track.search(trackName, {
        limit: 10,
      })
    ).trackMatches
    const track = searchResults.find((t) => artistName.includes(t.artist) || trackName.includes(t.artist)) ?? searchResults[0]
    if (!track) {
      throw new Error('No track found')
    }
    await this.track
      .updateNowPlaying(track.artist, track.name, this.session.key)
      .then(() => {
        console.log('Now playing', track.artist, track.name)
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
