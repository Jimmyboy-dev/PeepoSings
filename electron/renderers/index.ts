import { ipcRenderer as ipc } from "electron-better-ipc";
import { contextBridge } from "electron";
import Store from "electron-store";

import $ from "jquery";
import { MusicStore, Song, StateStore } from "../../store";

declare global {
  interface Window { electron: typeof api; }
}

const store = new Store<StateStore>({ name: "state", defaults: { game: { selectedGame: "", games: [""] } } })



declare global {
  interface DocumentEventMap {
    "music-change": CustomEvent<Song[]>;
  }
}

ipc.on("download-progress", (event, data) => { })
ipc.on("download-end", (event, data) => { })
ipc.on("music-change", (event, songs: Song[]) => {
  document.dispatchEvent(new CustomEvent("music-change", { detail: songs }))
})


const api = {
  windowControl: (e: "minimize" | "maximize" | "close") => {
    ipc.send("windowCmd", e)
  },
  store: store,
  music: {
    getSongs: async () => { return await ipc.invoke("music-get", "songs") as Song[] },
    addSong: async (url: string): Promise<Song> => { return await ipc.invoke("music-add", url) },
    openInEditor: () => { ipc.invoke("music-open-in-editor") },
    getLastSong: async () => { return await ipc.invoke("music-get", "lastSong") as Song },
    setLastSong: async (song: Song): Promise<void> => { return await ipc.invoke("music-set", "lastSong", song) },
    getDataUrl: async (filePath: string): Promise<string> => { return await ipc.invoke("get-dataUrl", filePath) },
  }
}


// contextBridge.exposeInMainWorld(
//   'electron',
//   api
// )
window.electron = api