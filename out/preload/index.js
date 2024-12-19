"use strict";
const electronBetterIpc = require("electron-better-ipc");
var IpcEvents = /* @__PURE__ */ ((IpcEvents2) => {
  IpcEvents2["STARTED"] = "started";
  IpcEvents2["PLAY"] = "play";
  IpcEvents2["PAUSE"] = "pause";
  IpcEvents2["STOP"] = "stop";
  IpcEvents2["PLAYPAUSE"] = "playpause";
  IpcEvents2["NEXT"] = "next";
  IpcEvents2["PREVIOUS"] = "previous";
  IpcEvents2["VOLUME"] = "volume";
  IpcEvents2["MUTE"] = "mute";
  IpcEvents2["SEEK"] = "seek";
  IpcEvents2["PLAYING_STATUS"] = "playing-status";
  IpcEvents2["SONG_CHANGE"] = "song-change";
  IpcEvents2["WINDOW_MINIMIZE"] = "minimize";
  IpcEvents2["WINDOW_MAXIMIZE"] = "maximize";
  IpcEvents2["WINDOW_CLOSE"] = "close";
  IpcEvents2["WINDOW_OPEN_DEVTOOLS"] = "open-devtools";
  IpcEvents2["MUSIC_ADD"] = "music-add";
  IpcEvents2["MUSIC_ERROR"] = "music-error";
  IpcEvents2["MUSIC_PROGRESS"] = "music-progress";
  IpcEvents2["MUSIC_FINISHED"] = "music-finished";
  IpcEvents2["MUSIC_INFO"] = "music-info";
  IpcEvents2["MUSIC_SEARCH"] = "music-search";
  IpcEvents2["MUSIC_PREVIEW"] = "music-preview";
  IpcEvents2["LOCALFOLDER_REMOVE"] = "remove-localfolder";
  IpcEvents2["LOCALFOLDERS_REFRESH"] = "refresh-localfolders";
  IpcEvents2["LOCALFOLDERS_GET"] = "get-localfolders";
  IpcEvents2["LOCALFOLDERS_SET"] = "set-localfolders";
  IpcEvents2["LOCAL_METAS"] = "get-metas";
  IpcEvents2["QUEUE_CLEAR"] = "clear-queue";
  IpcEvents2["QUEUE"] = "queue";
  IpcEvents2["QUEUE_ADD"] = "queue-add";
  IpcEvents2["QUEUE_DROP"] = "queue_drop";
  IpcEvents2["LOCAL_FILES"] = "local-files";
  IpcEvents2["LOCAL_FILES_PROGRESS"] = "local-files-progress";
  IpcEvents2["LOCAL_FILES_ERROR"] = "local-files-error";
  IpcEvents2["WINDOW_CMD"] = "window-cmd";
  IpcEvents2["RENDERER_LOG"] = "renderer-log";
  IpcEvents2["FILE_START_DRAG"] = "file-start-drag";
  IpcEvents2["GET_OPTION"] = "get-option";
  IpcEvents2["SET_OPTION"] = "set-option";
  IpcEvents2["SET_OPTION_SENSITIVE"] = "set-option-sensitive";
  IpcEvents2["LASTFM_LOGIN"] = "lastfm-login";
  IpcEvents2["LASTFM_SESSION"] = "lastfm-session";
  IpcEvents2["INITIAL_INFO"] = "initial-info";
  IpcEvents2["MUSIC_OPEN_EDITOR"] = "music-open-editor";
  IpcEvents2["DB_UPDATE"] = "db-update";
  IpcEvents2["DB_REMOVE"] = "db-remove";
  IpcEvents2["MUSIC_BACK"] = "music-back";
  IpcEvents2["MUSIC_PLAY"] = "music-play";
  IpcEvents2["MUSIC_FORWARD"] = "music-forward";
  IpcEvents2["MUSIC_MOOD"] = "music-mood";
  IpcEvents2["MOOD_ADD"] = "mood-add";
  IpcEvents2["MANUAL_UPDATE"] = "manual-update";
  return IpcEvents2;
})(IpcEvents || {});
const api = {
  windowControl: (e) => {
    switch (e) {
      case "minimize":
        electronBetterIpc.ipcRenderer.callMain(IpcEvents.WINDOW_MINIMIZE);
        break;
      case "maximize":
        electronBetterIpc.ipcRenderer.callMain(IpcEvents.WINDOW_MAXIMIZE);
        break;
      case "close":
        electronBetterIpc.ipcRenderer.callMain(IpcEvents.WINDOW_CLOSE);
        break;
    }
  },
  file: {
    startDrag: (filePath) => {
      electronBetterIpc.ipcRenderer.callMain(IpcEvents.FILE_START_DRAG, filePath);
    }
  },
  music: {
    openLocation: async (path) => {
      electronBetterIpc.ipcRenderer.callMain("open-location", path);
    },
    saveSong: async (song) => {
      electronBetterIpc.ipcRenderer.callMain("music-save", song);
    },
    saveSongs: async (songs) => {
      electronBetterIpc.ipcRenderer.callMain("music-save-all", songs);
    },
    removeSong: async (...args) => {
      return await electronBetterIpc.ipcRenderer.callMain(IpcEvents.DB_REMOVE, ["song", { path: args[0] }]);
    },
    getSongs: async () => {
      return await electronBetterIpc.ipcRenderer.callMain("music-get", "songs");
    },
    addSong: async (url) => {
      return await electronBetterIpc.ipcRenderer.callMain(IpcEvents.MUSIC_ADD, url);
    },
    openInEditor: () => {
      electronBetterIpc.ipcRenderer.callMain(IpcEvents.MUSIC_OPEN_EDITOR);
    },
    getLastSong: async () => {
      return await electronBetterIpc.ipcRenderer.callMain("music-get", "lastSong");
    },
    setLastSong: async (song) => {
      return await electronBetterIpc.ipcRenderer.callMain("music-set", ["lastSong", song]);
    },
    getVideoInfo: async (url) => {
      return await electronBetterIpc.ipcRenderer.callMain(IpcEvents.MUSIC_INFO, url);
    },
    searchSongs: async (query) => {
      if (query.length <= 0) throw new Error("Query is empty");
      return (await electronBetterIpc.ipcRenderer.callMain(IpcEvents.MUSIC_SEARCH, query)).videos;
    }
  },
  listeners: {
    onMusicChange: (handler) => electronBetterIpc.ipcRenderer.on("music-change", handler),
    onDownloadProgress: (handler) => electronBetterIpc.ipcRenderer.answerMain(IpcEvents.MUSIC_PROGRESS, (args) => {
      handler(args);
      return true;
    }),
    onDownloadEnd: (handler) => electronBetterIpc.ipcRenderer.answerMain(IpcEvents.MUSIC_FINISHED, (args) => {
      handler(args);
      return true;
    })
  },
  misc: {
    getVersion: async () => {
      return await electronBetterIpc.ipcRenderer.callMain("get-version");
    },
    openURL: (url) => {
      electronBetterIpc.ipcRenderer.callMain("open-url", url);
    },
    toggleAutoLaunch: async () => {
      return await electronBetterIpc.ipcRenderer.callMain("toggle-auto-launch");
    }
  },
  ipc: {
    async trayTooltip(song) {
      return await electronBetterIpc.ipcRenderer.callMain("set-current-song", song);
    },
    async onSong(song) {
      await electronBetterIpc.ipcRenderer.callMain(IpcEvents.SONG_CHANGE, song);
    }
  }
};
window.electron = api;
window.ipc = electronBetterIpc.ipcRenderer;
