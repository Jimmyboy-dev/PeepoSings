import { app } from "electron";
import { ipcMain as ipc } from "electron-better-ipc";
import fs from "fs"
import path from "path";
import ytdl from 'ytdl-core';
import readline from 'readline';
import ffmpeg from "fluent-ffmpeg";
import { Readable } from "stream";


export class MusicManager {
  private static instance: MusicManager;
  musicPath: string;
  currentDownload: Readable
  dlInfo: { start: number, savePath: string, vidInfo: ytdl.videoInfo }
  private constructor() {
    if (MusicManager.instance) {
      throw new Error("Error: Instantiation failed: Use MusicManager.getInstance() instead of new.");
    }
    else {
      MusicManager.instance = this;
    }
  }
  public static getInstance() {
    if (!MusicManager.instance) {
      MusicManager.instance = new MusicManager();
    }
    return MusicManager.instance;
  }

  private readCurrentData() {
    const musicDir = app.getPath("music");
    this.musicPath = path.join(musicDir, "twitch-music-manager");
  }

  isVideo(url: string) {
    return ytdl.validateURL(url);
  }

  public async getYoutubeVideo(url: string) {
    if (!this.isVideo(url)) return;
    const info = await this.getYoutubeVideoInfo(url)
    const savePath = path.join(this.musicPath, info.videoDetails.title.trim().replace(" ", "_") + ".mp3")
    this.currentDownload = ytdl(url, { quality: "highestaudio" })
    this.dlInfo = { start: Date.now(), vidInfo: info, savePath }
    ffmpeg(this.currentDownload)
      .audioBitrate(128)
      .save(savePath)
      .on("progress", p => {
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${p.targetSize}kb downloaded`);
        ipc.emit("download-progress", { raw: p, msg: `${p.targetSize}kb downloaded`, dlInfo: this.dlInfo })
      })
      .on("end", () => {
        console.log(`\nFinished downloading "${this.dlInfo.vidInfo.videoDetails.title}" by ${this.dlInfo.vidInfo.videoDetails.author}, took ${(Date.now() - this.dlInfo.start) / 1000}s`);

        ipc.emit("download-end", { path: savePath, dlInfo: this.dlInfo })
      })


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