import { ipcRenderer as ipc, } from "electron-better-ipc";
// import Store from "electron-store";
import { contextBridge } from "electron";
// import $ from "jquery";
import { Result } from "ytsr";
import { IpcRendererEvent } from "electron/renderer";
import { videoInfo } from "ytdl-core";
import { PeepoSingConfig } from "../../../types/store";

export type ElectronAPI = typeof api;




declare global {
  // interface DocumentEventMap {
  //   "music-change": CustomEvent<SongJSON[]>;
  //   "download-progress": CustomEvent<{ raw: unknown & { targetSize: number }, msg: `${number}kb downloaded`, dlInfo: unknown }>;
  //   "download-end": CustomEvent<{ path: string, dlInfo: unknown }>;
  // }
}

type ChangeHandler<T> = (...args: T[]) => void | Promise<void>;

const changeHandlers: { [key: string]: ChangeHandler<any>[] } = {
  musicChange: [],
  configChange: [],
  downloadProgress: [],
  downloadEnd: [],
  togglePlay: []
}

ipc.answerMain("download-progress", (data) => {
  changeHandlers.downloadProgress.forEach(h => h(data))
})
ipc.answerMain("download-end", (data) => {
  changeHandlers.downloadEnd.forEach(h => h(data))
})
ipc.answerMain("music-change", (songs: SongJSON[]) => {
  changeHandlers.musicChange.forEach(h => h(songs))
})
ipc.answerMain("config-change", (config: PeepoSingConfig) => {
  changeHandlers.musicChange.forEach(h => h(config))
})
ipc.answerMain("toggle-play", () => changeHandlers.togglePlay.forEach(l => l()))


const api = {
  windowControl: (e: "minimize" | "maximize" | "close") => {
    ipc.send("windowCmd", e)
  },
  music: {
    openLocation: async (path: string) => {
      ipc.callMain("open-location", path)
    },
    saveSong: async (song: SongJSON) => {
      ipc.callMain("music-save", song)

    },
    removeSong: async (...args: [path: string, title: string]) => {
      return await ipc.callMain("music-remove", args)
    },
    getSongs: async () => { return await ipc.callMain("music-get", "songs") as SongJSON[] },
    addSong: async (url: string): Promise<SongJSON> => { return await ipc.callMain("music-add", url) },
    openInEditor: () => { ipc.callMain("music-open-in-editor") },
    getLastSong: async () => { return await ipc.callMain("music-get", "lastSong") as SongJSON },
    setLastSong: async (song: SongJSON): Promise<void> => { return await ipc.callMain("music-set", ["lastSong", song]) },
    getVideoInfo: async (url: string): Promise<videoInfo> => { return await ipc.callMain("video-info", url) },
    searchSongs: async (query: string): Promise<Result> => {
      if (query.length <= 0) throw new Error("Query is empty")
      return await ipc.callMain("music-search", query) as Result
    },
  },
  listeners: {
    onMusicChange: (handler: ChangeHandler<SongJSON[]>) => {
      changeHandlers.musicChange.push(handler)
      return () => {
        changeHandlers.musicChange.splice(changeHandlers.musicChange.indexOf(handler), 1)
      }
    },
    onDownloadProgress: (handler: ChangeHandler<{
      raw: ffmpegProgress;
      msg: `${number}kb downloaded`;
      dlInfo: { start: number, savePath: string, vidInfo: videoInfo }
    }>) => {
      changeHandlers.musicChange.push(handler)
      return () => {
        changeHandlers.musicChange.splice(changeHandlers.musicChange.indexOf(handler), 1)
      }
    },
    onDownloadEnd: (handler: ChangeHandler<{
      path: string;
      dlInfo: { start: number, savePath: string, vidInfo: videoInfo }
    }>) => {
      changeHandlers.musicChange.push(handler)
      return () => {
        changeHandlers.musicChange.splice(changeHandlers.musicChange.indexOf(handler), 1)
      }
    },
    onConfigChange: (handler: ChangeHandler<PeepoSingConfig>) => {
      changeHandlers.configChange.push(handler)
      return () => {
        changeHandlers.configChange.splice(changeHandlers.configChange.indexOf(handler), 1)
      }
    },
    togglePlay: (handler: ChangeHandler<void>) => {
      changeHandlers.togglePlay.push(handler)
      return () => {
        changeHandlers.togglePlay.splice(changeHandlers.togglePlay.indexOf(handler), 1)
      }
    }
  },
  config: {
    get: async <T extends keyof PeepoSingConfig>(path?: T): Promise<PeepoSingConfig | PeepoSingConfig[T]> => {
      if (!path) return await ipc.callMain("config-get") as PeepoSingConfig
      else
        return await ipc.callMain("config-get", path) as PeepoSingConfig[T]
    },
    set: async (key: string, value: unknown) => { return await ipc.callMain("config-set", [key, value]) },
  },
  misc: {
    openURL: (url: string) => {
      ipc.callMain("open-url", url)
    }
  }
}

contextBridge.exposeInMainWorld(
  'electron',
  api
)
// window.electron = api