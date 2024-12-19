import { ipcRenderer as ipc } from 'electron-better-ipc'
// import Store from "electron-store";
// import LastFMTyped from 'lastfm-typed'
// import { app, contextBridge } from 'electron'
// import $ from "jquery";
import type { SearchResult, VideoSearchResult } from 'yt-search'
import type { IpcRendererEvent } from 'electron/renderer'
import type { DownloadInfo, ffmpegProgress, PeepoMeta, VideoInfo } from '@peepo/core'
import { IpcEvents } from '@peepo/core'
// import Store from 'electron-store'
// import createElectronStorage from 'redux-persist-electron-storage'
export type ElectronAPI = typeof api

// const electronStore = new Store({
//   name: 'store',
//   watch: true,
// })
// const electronStorage = createElectronStorage({ electronStore })

declare global {
  // interface DocumentEventMap {
  //   "music-change": CustomEvent<PeepoMeta[]>;
  //   "download-progress": CustomEvent<{ raw: unknown & { targetSize: number }, msg: `${number}kb downloaded`, dlInfo: unknown }>;
  //   "download-end": CustomEvent<{ path: string, dlInfo: unknown }>;
  // }
}

// const log = window.console.log

const api = {
  windowControl: (e: 'minimize' | 'maximize' | 'close') => {
    switch (e) {
      case 'minimize':
        ipc.callMain(IpcEvents.WINDOW_MINIMIZE)
        break
      case 'maximize':
        ipc.callMain(IpcEvents.WINDOW_MAXIMIZE)
        break
      case 'close':
        ipc.callMain(IpcEvents.WINDOW_CLOSE)
        break
    }
  },
  file: {
    startDrag: (filePath: string) => {
      ipc.callMain(IpcEvents.FILE_START_DRAG, filePath)
    },
  },
  music: {
    openLocation: async (path: string) => {
      ipc.callMain('open-location', path)
    },
    saveSong: async (song: PeepoMeta) => {
      ipc.callMain('music-save', song)
    },
    saveSongs: async (songs: PeepoMeta[]) => {
      ipc.callMain('music-save-all', songs)
    },
    removeSong: async (...args: [path: string, title: string]) => {
      return await ipc.callMain(IpcEvents.DB_REMOVE, ['song', { path: args[0] }])
    },
    getSongs: async () => {
      return (await ipc.callMain('music-get', 'songs')) as PeepoMeta[]
    },
    addSong: async (url: string): Promise<PeepoMeta> => {
      return await ipc.callMain(IpcEvents.MUSIC_ADD, url)
    },
    openInEditor: () => {
      ipc.callMain(IpcEvents.MUSIC_OPEN_EDITOR)
      // electronStore.openInEditor()
    },
    getLastSong: async () => {
      return (await ipc.callMain('music-get', 'lastSong')) as PeepoMeta
    },
    setLastSong: async (song: PeepoMeta): Promise<void> => {
      return await ipc.callMain('music-set', ['lastSong', song])
    },
    getVideoInfo: async (url: string): Promise<VideoInfo> => {
      return await ipc.callMain(IpcEvents.MUSIC_INFO, url)
    },
    searchSongs: async (query: string): Promise<VideoSearchResult[]> => {
      if (query.length <= 0) throw new Error('Query is empty')
      return (JSON.parse(await ipc.callMain(IpcEvents.MUSIC_SEARCH, query)) as SearchResult).videos
    },
  },
  listeners: {
    onMusicChange: (handler: (e: IpcRendererEvent, songs: PeepoMeta[]) => void) => ipc.on('music-change', handler),
    onDownloadProgress: (handler: (download: { raw: ffmpegProgress; msg: `${number}kb downloaded`; dlInfo: DownloadInfo }) => void) =>
      ipc.answerMain(IpcEvents.MUSIC_PROGRESS, (args: { raw: ffmpegProgress; msg: `${number}kb downloaded`; dlInfo: DownloadInfo }) => {
        handler(args)
        return true
      }),
    onDownloadEnd: (handler: (download: { path: string; dlInfo: DownloadInfo }) => void) =>
      ipc.answerMain(IpcEvents.MUSIC_FINISHED, (args: { path: string; dlInfo: DownloadInfo }) => {
        handler(args)
        return true
      }),
  },
  misc: {
    getVersion: async (): Promise<string> => {
      return await ipc.callMain('get-version')
    },
    openURL: (url: string): void => {
      ipc.callMain('open-url', url)
    },
    toggleAutoLaunch: async (): Promise<boolean> => {
      return await ipc.callMain('toggle-auto-launch')
    },
  },
  ipc: {
    async trayTooltip(song: PeepoMeta | null) {
      return (await ipc.callMain('set-current-song', song)) as boolean
    },
    async onSong(song: PeepoMeta | null) {
      await ipc.callMain(IpcEvents.SONG_CHANGE, song)
    },
  },
}

// contextBridge.exposeInMainWorld('electron', api)
window.electron = api
window.ipc = ipc
