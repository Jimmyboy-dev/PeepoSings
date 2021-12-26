export interface StateStore {
  game: {
    selectedGame: string;
    games: string[]
  }
}

export interface MusicStore {
  songs: Song[]
  lastSong: Song
}

export interface Song {
  filePath: string;
  title: string;
  artist: string;
  duration: number;
  album?: string;
  albumArt?: string;
  metadata?: any;
}