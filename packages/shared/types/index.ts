/* eslint-disable @typescript-eslint/no-explicit-any */
export enum PlaybackStatus {
  PAUSED = 'PAUSED',
  PLAYING = 'PLAYING',
  STOPPED = 'STOPPED',
}

export interface PeepoStatus {
  playbackStatus: PlaybackStatus
  volume: number
  shuffleQueue: boolean
  loopAfterQueueEnd: boolean
}

export interface PeepoMeta {
  uuid: string
  artist: string
  streams?: Array<{ duration: number }>
  name?: string
  position?: number
  duration?: number
  thumbnail?: string
  path?: string
  album?: string
  folder?: any
  lastScanned?: number

  imageData?: Buffer
}

export interface PeepoPlaylist {
  name: string
  tracks: PeepoMeta[]
}

export type PartialExcept<T, TRequired extends keyof T> = Partial<T> & Pick<T, TRequired>

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

export const isArtistObject = (artist: TrackType['artist']): artist is { name: string } => typeof artist === 'object' && 'name' in artist