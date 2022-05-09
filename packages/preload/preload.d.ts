import { ipcRenderer } from "electron-better-ipc";
import * as logger from "electron-log";

import type { ElectronAPI } from './index'
declare global {
  interface Window {
    electron: ElectronAPI
    ipc: typeof ipcRenderer
    removeLoading: () => void
    logger: typeof logger
    store: { electronStorage: ElectronAPI['electronStorage'] }
  }
}
