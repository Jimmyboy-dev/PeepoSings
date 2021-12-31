import { MoreVideoDetails, VideoDetails } from "ytdl-core";
import { Item, Result } from "ytsr";
import { Song } from "./src/store";
import { Mood } from "./src/store";

export interface MusicStore {
  songs: SongJSON[]
  lastSong: SongJSON | null
}

export interface SettingsStore {
  config: PeepoSingConfig
}

export interface PeepoSingConfig {
  runOnStartup: boolean;
  autoPlay: boolean;
  scrobblerKeys: {
    apiKey: string | null;
    apiSecret: string | null;
  }
}

declare global {

  interface SongJSON {
    filePath: string;
    title: string;
    artist: string;
    duration: number;
    album?: string;
    albumArt?: string;
    metadata: VideoDetails | Item | MakeAllOptional<MoreVideoDetails>;
    favorite?: boolean;
    mood?: MoodJSON
  }

  type ffmpegProgress = {
    frames: number,
    currentFps: number,
    currentKbps: number,
    targetSize: number,
    timemark: string,
    percent: number,
  }

  interface MoodJSON {
    name: string;
  }

  type MakeAllOptional<T> = { [K in keyof T]?: T[K] extends object ? MakeAllOptional<T[K]> : T[K] }

}
