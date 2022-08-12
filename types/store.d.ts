import { getSession } from 'lastfm-typed/dist/interfaces/authInterface'
import type { MoreVideoDetails, VideoDetails } from 'ytdl-core'
import type ytdl from 'ytdl-core'
import type { Item } from 'ytsr'

export interface MusicStore {
  songs: SongJSON[]
  lastSong: SongJSON | null
}

export interface SettingsStore {
  config: PeepoSingConfig
}

export interface PeepoSingConfig {
  compactSongView: boolean
  runOnStartup: boolean
  autoPlay: boolean
  scrobblerKeys: {
    apiKey: string | null
    apiSecret: string | null
  }
  scrobbler: {
    connected: boolean
    userInfo: ReturnType<import('lastfm-typed').default['prototype']['user']['getInfo']>
    session: getSession | null
  }
  outputDevice: string | null
}

declare global {
  interface DownloadInfo {
    start?: number
    vidInfo: ytdl.videoInfo
    savePath: string
  }

  interface SongJSON {
    id: string
    filePath: string
    title: string
    artist: string
    duration: number
    album?: string
    albumArt?: string
    metadata: VideoDetails | Item | MakeAllOptional<MoreVideoDetails>
    favorite?: boolean
    in: number
    out: number
    mood: MoodJSON['id'][]
  }

  type ffmpegProgress = {
    frames: number
    currentFps: number
    currentKbps: number
    targetSize: number
    timemark: string
    percent: number
  }

  interface MoodJSON {
    id: string
    name: string
    color?: string
    icon: string
  }

  type MakeAllOptional<T> = { [K in keyof T]?: T[K] extends object ? MakeAllOptional<T[K]> : T[K] }
}
