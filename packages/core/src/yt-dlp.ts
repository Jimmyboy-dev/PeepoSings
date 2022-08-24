declare module 'yt-dlp-wrap' {
  export class YTDlpWrap {
    getVideoInfo(args: string | string[]): Promise<VideoInfo>
  }
}

export interface VideoInfo {
  id?: string
  title?: string
  formats?: Format[]
  thumbnails?: Thumbnail[]
  thumbnail?: string
  description?: string
  uploader?: string
  uploader_id?: string
  uploader_url?: string
  channel_id?: string
  channel_url?: string
  duration?: number
  view_count?: number
  average_rating?: null
  age_limit?: number
  webpage_url?: string
  categories?: string[]
  tags?: string[]
  playable_in_embed?: boolean
  is_live?: boolean
  was_live?: boolean
  live_status?: string
  release_timestamp?: null
  album?: string
  artist?: string
  track?: string
  release_date?: null
  release_year?: null
  comment_count?: null
  chapters?: null
  like_count?: number
  channel?: string
  channel_follower_count?: number
  upload_date?: string
  creator?: string
  alt_title?: string
  availability?: string
  original_url?: string
  webpage_url_basename?: string
  webpage_url_domain?: string
  extractor?: string
  extractor_key?: string
  playlist?: null
  playlist_index?: null
  display_id?: string
  fulltitle?: string
  duration_string?: string
  requested_subtitles?: null
  _has_drm?: null
  requested_formats?: Format[]
  format?: string
  format_id?: string
  ext?: Ext
  protocol?: string
  language?: null
  format_note?: string
  filesize_approx?: number
  tbr?: number
  width?: number
  height?: number
  resolution?: string
  fps?: number
  dynamic_range?: DynamicRange
  vcodec?: string
  vbr?: number
  stretched_ratio?: null
  acodec?: Acodec
  abr?: number
  asr?: number
  epoch?: number
  _filename?: string
  filename?: string
  urls?: string
  _type?: string
}

export enum Acodec {
  Mp4A402 = 'mp4a.40.2',
  Mp4A405 = 'mp4a.40.5',
  None = 'none',
  Opus = 'opus',
}

export enum DynamicRange {
  SDR = 'SDR',
}

export enum Ext {
  M4A = 'm4a',
  None = 'none',
  Webm = 'webm',
}

export interface Format {
  format_id?: string
  format_note?: string
  ext?: string
  protocol?: Protocol
  acodec?: Acodec
  vcodec?: string
  url?: string
  width?: number | null
  height?: number | null
  fragments?: Fragment[]
  audio_ext?: Ext
  video_ext?: Videoext
  format?: string
  resolution?: string
  http_headers?: HttpHeaders
  asr?: number | null
  filesize?: number | null
  source_preference?: number
  fps?: number | null
  quality?: number
  has_drm?: boolean
  tbr?: number
  language?: string
  language_preference?: number
  preference?: number | null
  dynamic_range?: DynamicRange | null
  abr?: number
  downloader_options?: DownloaderOptions
  container?: Container
  vbr?: number
  filesize_approx?: number
}

export enum Container {
  M4ADash = 'm4a_dash',
  Mp4Dash = 'mp4_dash',
  WebmDash = 'webm_dash',
}

export interface DownloaderOptions {
  http_chunk_size?: number
}

export interface Fragment {
  url?: string
  duration?: number
}

export interface HttpHeaders {
  'User-Agent'?: string
  Accept?: Accept
  'Accept-Language'?: AcceptLanguage
  'Sec-Fetch-Mode'?: SecFetchMode
}

export enum Accept {
  TexthtmlApplicationxhtmlxmlApplicationxmlQ09Q08 = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
}

export enum AcceptLanguage {
  EnUsEnQ05 = 'en-us,en;q=0.5',
}

export enum SecFetchMode {
  Navigate = 'navigate',
}

export enum Protocol {
  Https = 'https',
  Mhtml = 'mhtml',
}

export enum Videoext {
  Mp4 = 'mp4',
  None = 'none',
  The3Gp = '3gp',
  Webm = 'webm',
}

export interface Thumbnail {
  url?: string
  preference?: number
  id?: string
  height?: number
  width?: number
  resolution?: string
}
