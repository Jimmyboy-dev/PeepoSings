import type { MoreVideoDetails, VideoDetails } from 'ytdl-core'
import type ytdl from 'ytdl-core'
import type { Item } from 'ytsr'

declare global {
  interface DownloadInfo {
    start?: number
    vidInfo: ytdl.videoInfo
    savePath: string
  }

  interface SongJSON {
    imageData: Buffer | undefined
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
    icon?: string
  }

  type MakeAllOptional<T> = { [K in keyof T]?: T[K] extends object ? MakeAllOptional<T[K]> : T[K] }
}
