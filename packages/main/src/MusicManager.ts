import { app } from "electron";
import { ipcMain as ipc } from "electron-better-ipc";
import fs from "fs"
import { toDataURL } from "fitool"
import path from "path";
import ytdl from 'ytdl-core';
import readline from 'readline';
import ffmpeg from "fluent-ffmpeg";
import { Readable } from "stream";
import Store, { Schema } from "electron-store";
import { MusicStore } from "../../../types/store";
import { URL } from "url";
import { Blob } from "buffer";
import sanitize from "sanitize-filename"





export class MusicManager {

  private static instance: MusicManager;
  store: Store<MusicStore>;
  musicPath: string;
  currentDownload?: Readable
  dlInfo?: { start: number, savePath: string, vidInfo: ytdl.videoInfo }

  private constructor(store: Store<MusicStore>) {
    if (MusicManager.instance) {
      throw new Error("Error: Instantiation failed: Use MusicManager.getInstance() instead of new.");
    }
    else {
      this.store = store;
      const musicDir = app.getPath("music");
      this.musicPath = path.join(musicDir, "twitch-music-manager");
      this.readCurrentData();
      MusicManager.instance = this;
    }
  }


  public static getInstance(store?: Store<MusicStore>) {
    if (!MusicManager.instance && store) {
      MusicManager.instance = new MusicManager(store);
    }
    return MusicManager.instance;
  }


  setMusicDb(db: Store<MusicStore>) {
    this.store = db
  }

  removeSong(path: string, title: string) {
    if (!this.store) return;
    var songs = this.store.get("songs");
    if (songs) {
      let songToFind = songs.find(song => song.title === title)
      let i: number;
      if (songToFind) {
        i = songs.indexOf(songToFind);
      }
      else {
        i = -1
      }
      if (i !== -1) {
        this.store.set("songs", songs.splice(i, 1));
      }
    } else {
      this.store.set("songs", []);
    }
    if (fs.existsSync(path))
      fs.rmSync(path, { maxRetries: 5 })
  }

  async addSong(url: string): Promise<SongJSON> {
    const info = await this.getYoutubeVideoInfo(url)
    const path = await this.getYoutubeVideo(url).catch(e => {
      console.log(e);
      return null
    })
    if (!path) return Promise.reject("Failed to download video");
    const song: SongJSON = {
      title: info.videoDetails.title,
      filePath: path,
      artist: info.videoDetails.author.name,
      duration: parseInt(info.videoDetails.lengthSeconds),
      albumArt: info.videoDetails.thumbnails[0].url,
      metadata: info.videoDetails
    }
    return song;
  }

  private readCurrentData() {

    if (!fs.existsSync(this.musicPath)) {
      fs.mkdirSync(this.musicPath, { recursive: true });
    }
    const songs = this.store.get("songs")
    const songsFound: SongJSON[] = []
    songs.forEach((song, i) => {
      if (!fs.existsSync(song.filePath)) {
        songs.splice(i, 1);
      }
    })
    fs.readdirSync(this.musicPath).forEach(file => {
      const filePath = path.join(this.musicPath, file)
      const foundSong = songs.find(song => song.filePath === filePath)
      if (foundSong === undefined) {
        fs.rmSync(filePath);
      }
      else {
        songsFound.push(foundSong);
      }

    })

    this.store.set("songs", songs);
  }

  isVideo(url: string) {
    return ytdl.validateURL(url);
  }

  public async getYoutubeVideo(url: string) {
    if (!this.isVideo(url)) return;
    const info = await this.getYoutubeVideoInfo(url)
    const savePath = path.join(this.musicPath, sanitize(info.videoDetails.title.trim().replace(/[\/|\\]/g, ""), { replacement: "" }) + ".mp3")
    this.currentDownload = ytdl(url, { quality: "highestaudio" })
    this.dlInfo = { start: Date.now(), vidInfo: info, savePath }
    ffmpeg(this.currentDownload)
      .audioBitrate(128)
      .save(savePath)
      .on("progress", p => {

        console.log(`${p.targetSize}kb downloaded`);
        ipc.sendToRenderers("download-progress", { raw: p, msg: `${p.targetSize}kb downloaded`, dlInfo: this.dlInfo })
      })
      .on("end", () => {
        if (!this.dlInfo) return
        console.log(`\nFinished downloading "${this.dlInfo.vidInfo.videoDetails.title}" by ${this.dlInfo.vidInfo.videoDetails.author}, took ${(Date.now() - this.dlInfo.start) / 1000}s`);

        ipc.sendToRenderers("download-end", { path: savePath, dlInfo: this.dlInfo })
      })
    return savePath;


  }

  public async getYoutubeVideoInfo(url: string) {
    return await ytdl.getBasicInfo(url);

  }
}

export interface MusicDB {
  [moods: string]: SavedSong[]
  uncategorized: SavedSong[]
}

export interface SavedSong {

}