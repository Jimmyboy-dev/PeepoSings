import path, { join } from 'path';
import { URL, fileURLToPath } from 'url';
import { initialize as remoteInitialize, enable as remoteEnable } from '@electron/remote/main';
// import './security-restrictions';
import isDev from "electron-is-dev"
import * as dotenv from "dotenv"
dotenv.config()

import { app, BrowserWindow, Tray, Menu, session, protocol, ProtocolRequest, nativeImage, shell } from "electron"
import { ipcMain as ipc } from "electron-better-ipc"
import contextMenu from "electron-context-menu"
import windowStateKeeper from "electron-window-state"
import serve from "electron-serve"
import { MusicManager } from "./MusicManager"
import AutoLaunch from "auto-launch"
import ytsr from "ytsr"
import { rm } from "fs"

import * as modulesManager from "./lib/modulesManager"
import ConfigModule from "./modules/config";
import AppModule from "./modules/app";
var autoLauncher: AutoLaunch

remoteInitialize();

const isSingleInstance = app.requestSingleInstanceLock();
const isDevelopment = import.meta.env.MODE === 'development' || isDev;

if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}

const disposeCTXMenu = contextMenu({
  showSaveImageAs: true,
  append: (menu) => [{ label: "Refresh", click: () => BrowserWindow.getFocusedWindow()?.reload() }],
})

let mainWindow: BrowserWindow | null = null;


const appIcon = nativeImage.createFromPath(join(__dirname, "../../..", "build", process.platform === "win32" ? "icon.ico" : "icon.png"))

// const store = new Store<SettingsStore>({ name: "settings", watch: true, defaults: { config: { autoPlay: false, runOnStartup: false, scrobblerKeys: { apiKey: null, apiSecret: null }, outputDevice: null } } })

// const musicStore = new Store<MusicStore>({ name: "music", defaults: { songs: [], lastSong: null }, watch: true })

// musicStore.onDidChange("songs", (songs) => {
//   ipc.sendToRenderers("music-change", songs)
// })

// store.onDidAnyChange((val) => {
//   ipc.sendToRenderers("config-change", val.config)
// })

// Quit when all windows are closed
app.on('window-all-closed', () => {
  app.quit();
});

const loadURL = serve({ directory: "dist" })

let musicManager: MusicManager;

let tray: Tray | undefined

// Install "react devtools"
if (isDevelopment) {
  app.whenReady()
    .then(() => import('electron-devtools-installer'))
    .then(({ default: installExtension, REACT_DEVELOPER_TOOLS }) => installExtension(REACT_DEVELOPER_TOOLS, {
      loadExtensionOptions: {
        allowFileAccess: true,
      },
    }))
    .catch(e => console.error('Failed install extension:', e));
}




function initTray() {

  tray = new Tray(appIcon)

  const contextMenu = Menu.buildFromTemplate([
    { label: "Play/Pause", click: () => ipc.sendToRenderers("toggle-play") },
    { label: "Show/Hide", click: () => mainWindow && (mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()) },
    { label: "Quit", click: () => app.quit() },
  ])

  tray.setToolTip("Peepo Sings")
  tray.setContextMenu(contextMenu)
}

const createWindow = async () => {
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800,
  })

  mainWindow = new BrowserWindow({
    show: false, // Use 'ready-to-show' event to show window
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 350,
    minHeight: 550,
    frame: false,
    icon: appIcon,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      autoplayPolicy: 'no-user-gesture-required',
      nativeWindowOpen: false,
      preload: join(__dirname, '../../preload/dist/index.cjs'),
    },
  });

  mainWindowState.manage(mainWindow)
  /**
   * If you install `show: true` then it can cause issues when trying to close the window.
   * Use `show: false` and listener events `ready-to-show` to fix these issues.
   *
   * @see https://github.com/electron/electron/issues/25012
   */
  mainWindow.on('ready-to-show', () => {
    mainWindow?.show();

    if (isDevelopment) {
      mainWindow?.webContents.openDevTools();
    }
  });

  mainWindow.on('closed', () => {
    // Dereference the window object
    mainWindow = null;
  });

  mainWindow.webContents.setWindowOpenHandler(() => {
    return { action: 'deny' };
  });

  const appRoot = path.join(__dirname, '../');

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */
  const pageUrl = isDevelopment && import.meta.env.VITE_DEV_SERVER_URL !== undefined
    ? import.meta.env.VITE_DEV_SERVER_URL
    : new URL('/renderer/dist/index.html', 'file://' + appRoot).toString();


  await mainWindow.loadURL(pageUrl);
};


// store.onDidAnyChange((conf) => {
//   if (mainWindow) {
//     mainWindow.webContents.send("config-update", conf)
//   }
// })

ipc.on("windowCmd", (e, msg) => {
  if (!mainWindow) return
  if (msg === "minimize") mainWindow.minimize()
  else if (msg === "maximize" && !mainWindow.isMaximized()) mainWindow.maximize()
  else if (msg === "maximize" && mainWindow.isMaximized()) mainWindow.unmaximize()
  else if (msg === "close") mainWindow.close()
})

ipc.on("trayTooltip", (e, tip: string) => {
  if (tray) tray.setToolTip(tip)
})

app.on('second-instance', () => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


app.whenReady().then(() => {
  autoLauncher = new AutoLaunch({
    name: "Peepo Sings",
  })
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Access-Control-Allow-Origin": "https://* http://localhost:* file://*",
      }
    })
  })
  protocol.interceptFileProtocol('resource', async (req: ProtocolRequest, callback: (filePath: string) => void) => {
    const url = fileURLToPath(req.url.replace("resource", "file"))
    callback(url);
  });
  // musicManager = MusicManager.getInstance(musicStore)

  initTray()

})
  .then(createWindow)
  .then(async () => {
    const configModule = new ConfigModule();
    await modulesManager.init(configModule);
    // Let's list the list of modules we will use for Museeks
    modulesManager.init(
      new AppModule(mainWindow as BrowserWindow, configModule),
      // new PowerModule(mainWindow),
      // new ApplicationMenuModule(mainWindow),
      // new TrayModule(mainWindow),
      // new ThumbarModule(mainWindow),
      // new DockMenuModule(mainWindow),
      // new SleepBlockerModule(mainWindow),
      // new DialogsModule(mainWindow),
      // new NativeThemeModule(mainWindow, configModule),
      // new DevtoolsModule(mainWindow)
    ).catch(console.error);
    if (mainWindow)
      // @deprecated Remove all usage of remote in the app
      remoteEnable(mainWindow.webContents);
  })
  .catch((e) => console.error('Failed create window:', e));


// Auto-updates
if (import.meta.env.PROD) {
  app.whenReady()
    .then(() => import('electron-updater'))
    .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
    .catch((e) => console.error('Failed check updates:', e));
}



// Listeners
const listeners: { [key: string]: () => void } = {}
app.on("will-quit", disposeCTXMenu)

listeners.openLocation = ipc.answerRenderer("open-location", async (url: string) => {
  shell.showItemInFolder(url)
  return true
})

// listeners.musicUpdate = ipc.answerRenderer("music-save", (json: SongJSON) => {
//   let songs = musicStore.get("songs")
//   let song = songs.find(s => s.filePath === json.filePath)
//   if (song) {
//     song.title = json.title
//     song.artist = json.artist
//     song.album = json.album
//     song.duration = json.duration
//     song.albumArt = json.albumArt
//     song.favorite = json.favorite
//     song.filePath = json.filePath
//     song.metadata = json.metadata
//     song.in = json.in;
//     song.out = json.out;
//     song.mood = json.mood
//     musicStore.set("songs", songs)
//     return true
//   }
//   else
//     return false
// })

// listeners.musicRemove = ipc.answerRenderer("music-remove", ([path, title]: [string, string]) => {
//   musicManager.removeSong(path, title);
//   const songs = musicStore.get("songs")
//   songs.forEach((song, index) => {
//     if (song.title === title || song.filePath === path) {
//       musicStore.set("songs", songs.splice(index, 1))
//     }
//   })
//   rm(path, (err) => {
//     console.error(err);
//   })
// })

// listeners.musicGet = ipc.answerRenderer("music-get", (key: string, window) => {
//   return musicStore.get(key)
// })

// listeners.musicAdd = ipc.answerRenderer("music-add", async (url: string) => {
//   const song = await musicManager.addSong(url)
//   var songs = musicStore.get("songs")
//   if (!songs && song === null) return new Error("Error adding Song");
//   musicManager.store.set(`songs`, songs.concat([song]))
//   return song
// })

// listeners.musicSet = ipc.answerRenderer("music-set", ([key, value]: [string, SongJSON]) => {
//   return musicStore.set(key, value)
// })

// listeners.videoInfo = ipc.answerRenderer("video-info", async (url: string) => {
//   return await musicManager.getYoutubeVideoInfo(url)
// })

// listeners.musicOpenInEditor = ipc.answerRenderer("music-open-in-editor", () => {
//   return musicStore.openInEditor()
// })

// listeners.musicSearch = ipc.answerRenderer("music-search", async (query: string) => {
//   return await ytsr(query, { limit: 10 }).catch(console.error)
// })

// listeners.configGet = ipc.answerRenderer("config-get", (path?: string) => {
//   if (!path)
//     return store.get("config")
//   else
//     return store.get(`config.${path}`)
// })

// listeners.configSet = ipc.answerRenderer("config-set", async ([key, value]: [string, string]) => {
//   store.set(key, value)
// })

listeners.openURL = ipc.answerRenderer("open-url", (url: string) => {
  if (url.startsWith("http"))
    shell.openExternal(url)
})