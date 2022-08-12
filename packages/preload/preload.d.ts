/// <reference types="vite-plugin-electron/electron-env" />
import type { ElectronAPI } from './index'
import type { ipcRenderer } from 'electron-better-ipc'
declare global {
  interface Window {
    electron: ElectronAPI
    ipc: typeof ipcRenderer
  }
}
