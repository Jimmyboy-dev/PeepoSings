import { ipcRenderer as ipc } from "electron-better-ipc";
import { contextBridge } from "electron";
import Store from "electron-store";

import $ from "jquery";
import { StateStore } from "../../store";

declare global {
  interface Window { electron: typeof api; }
}

const store = new Store<StateStore>({ name: "state", defaults: { game: { selectedGame: "", games: [""] } } })

declare global {
  interface DocumentEventMap {

  }
}

ipc.on("download-progress", (event, data) => { })
ipc.on("download-end", (event, data) => { })


const api = {
  windowControl: (e: "minimize" | "maximize" | "close") => {
    ipc.send("windowCmd", e)
  },
  store: store,
}


// contextBridge.exposeInMainWorld(
//   'electron',
//   api
// )
window.electron = api