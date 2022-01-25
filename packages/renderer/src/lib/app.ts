import linvodb from 'linvodb3';
import { app, getCurrentWindow } from '@electron/remote';
import leveljs from 'level-js';
import teeny from 'teeny-conf';
import Promise from 'bluebird';
import { PlaylistModel, SongModel } from "../../../shared/types/peepo-sings";
import path from "path";

export const browserWindows = {
  main: getCurrentWindow(),
};

export const pathUserData = app.getPath('userData');
export const pathSrc = __dirname;


/*
|--------------------------------------------------------------------------
| Config
|--------------------------------------------------------------------------
*/

export const config = new teeny(path.join(pathUserData, 'config.json'));

/*
|--------------------------------------------------------------------------
| Database
|--------------------------------------------------------------------------
*/

linvodb.defaults.store = { db: leveljs }; // Comment out to use LevelDB instead of level-js
// Set dbPath - this should be done explicitly and will be the dir where each model's store is saved
linvodb.dbPath = pathUserData;

const Song: SongModel = new linvodb('song');
Song.ensureIndex({ fieldName: 'filePath', unique: true });

const Playlist: PlaylistModel = new linvodb('playlist');
Playlist.ensureIndex({ fieldName: 'importPath', unique: true, sparse: true });

export const db = {
  Song,
  Playlist,
};

Promise.promisifyAll(Object.getPrototypeOf(db.Song.find()));
Promise.promisifyAll(Object.getPrototypeOf(db.Song.findOne()));
Promise.promisifyAll(db.Song);
Promise.promisifyAll(db.Playlist);

/*
|--------------------------------------------------------------------------
| Other exports
|--------------------------------------------------------------------------
*/

export const version = app.getVersion();