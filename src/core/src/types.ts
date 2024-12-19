import { getSession } from 'lastfm-typed/dist/interfaces/authInterface'
import { VideoInfo } from './yt-dlp'

export interface MusicStore {
  songs: PeepoMeta[]
  lastSong: PeepoMeta | null
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
  advancedOptions: boolean
  scrobbler: {
    connected: boolean
    userInfo: ReturnType<import('lastfm-typed').default['user']['getInfo']>
    session: getSession | null
  }
  outputDevice: string | null

  hooks: {
    onSongChange: string[]
    onTimeChange: string[]
  }
}

export type TrackType = {
  local?: boolean
  album?: string
  artist?: { name: string } | string
  duration?: number | string
  position?: number
  playcount?: number | string
  title?: string
  name?: string
  thumbnail?: string
}

export interface DownloadInfo {
  start?: number
  vidInfo: VideoInfo
  savePath: string
}

// export interface SongJSON {
//   title: string
//   artist: string
//   duration: number
//   album?: string
//   albumArt?: string

//   favorite?: boolean
// }

export type ffmpegProgress = {
  frames: number
  currentFps: number
  currentKbps: number
  targetSize: number
  timemark: string
  percent: number
}

export type MoodJSON = {
  id?: number
  name: string
  color?: string
  icon: string
}

export type PeepoMeta = {
  id: number
  muid?: string
  artist: string
  title: string
  position?: number
  duration: number
  thumbnail: string
  path: string
  album?: string
  lastScanned?: number
  metadata: VideoInfo
  favorite?: boolean

  in: number
  out: number
  mood: MoodJSON[]
}

export type MakeAllOptional<T> = { [K in keyof T]?: T[K] extends object ? MakeAllOptional<T[K]> : T[K] }
