import { MoreVideoDetails, VideoDetails } from "ytdl-core";
import { Item, Result } from "ytsr";



/**
 * Untyped libs / helpers
 */
export type LinvoSchema<Schema> = {
  _id: string;
  find: any;
  findOne: any;
  insert: any;
  copy: any; // TODO better types?
  remove: any;
  save: any;
  serialize: any;
  update: any;
  ensureIndex: any;
  // bluebird-injected
  findAsync: any;
  findOneAsync: any;
  insertAsync: any;
  copyAsync: any;
  removeAsync: any;
  saveAsync: any;
  serializeAsync: any;
  updateAsync: any;
} & {
    [Property in keyof Schema]: Schema[Property];
  };

/**
 * Player related stuff
 */
export enum PlayerStatus {
  PLAY = 'play',
  PAUSE = 'pause',
  STOP = 'stop',
}

export enum Repeat {
  ALL = 'all',
  ONE = 'one',
  NONE = 'none',
}

export enum SortBy {
  ARTIST = 'artist',
  ALBUM = 'album',
  TITLE = 'title',
  DURATION = 'duration',
  GENRE = 'genre',
}

export enum SortOrder {
  ASC = 'asc',
  DSC = 'dsc',
}

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
  };
  theme: ThemeIds | '__system';
  audioVolume: number;
  audioPlaybackRate: number;
  audioOutputDevice: string;
  audioMuted: boolean;
  audioShuffle: boolean;
  audioRepeat: Repeat;
  defaultView: string;
  librarySort: {
    by: SortBy;
    order: SortOrder;
  };
  // musicFolders: string[],
  sleepBlocker: boolean;
  autoUpdateChecker: boolean;
  minimizeToTray: boolean;
  displayNotifications: boolean;
}

/**
 * Database schemes
 */
export type SongModel = LinvoSchema<Song>;
export type PlaylistModel = LinvoSchema<Playlist>;

declare global {

  interface Song {
    filePath: string;
    title: string;
    artist: string[];
    duration: number;
    album?: string;
    albumArt?: string;
    metadata: VideoDetails | Item | MakeAllOptional<MoreVideoDetails>;
    favorite?: boolean;
    in: number;
    out: number;
    moods: string[];
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
