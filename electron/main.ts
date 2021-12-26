import isDev from "electron-is-dev"
import * as dotenv from "dotenv"
dotenv.config()
import { app, BrowserWindow, Tray, Menu, session, protocol, ProtocolRequest } from "electron/main"
import { ipcMain as ipc } from "electron-better-ipc"
import contextMenu from "electron-context-menu"
import windowStateKeeper from "electron-window-state"
import Store, { Schema } from "electron-store"
import serve from "electron-serve"
import path from "path"
import { MusicStore, Song, StateStore } from "../store"
import { MusicManager } from "./MusicManager"
import { nativeImage } from "electron/common"

const disposeCTXMenu = contextMenu({
  showSaveImageAs: true,
  append: (menu) => [{ label: "Refresh", click: () => BrowserWindow.getFocusedWindow()?.reload() }],
})

import updateApp = require('update-electron-app')
import { fileURLToPath } from "url"
updateApp()

Store.initRenderer()
const musicStore = new Store<MusicStore>({ name: "music", defaults: { songs: [], lastSong: null }, watch: true })

musicStore.onDidChange("songs", (songs) => {
  if (mainWindow) {
    mainWindow.webContents.send("music-change", songs)
  }
})

const loadURL = serve({ directory: "dist" })

let musicManager: MusicManager;

let tray: Tray | undefined
const appIcon = nativeImage.createFromPath(path.join(__dirname, "..", "assets", process.platform === "win32" ? "icon.ico" : "icon.png"))

function initTray() {

  tray = new Tray(appIcon)

  const contextMenu = Menu.buildFromTemplate([
    { label: "Show/Hide", click: () => mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show() },
    { label: "Quit", click: () => app.quit() },
  ])

  tray.setToolTip("Moody Beats")
  tray.setContextMenu(contextMenu)
}

// Actual Electron Calls
let mainWindow: BrowserWindow

const createWindow = () => {
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800,
  })

  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    frame: false,
    icon: appIcon,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "renderers", "index.js"),
      contextIsolation: false,
      // webSecurity: !isDev
    },
  })


  mainWindowState.manage(mainWindow)

  if (isDev) {
    console.log("Running in development")
    mainWindow.loadURL("http://localhost:3000")
    mainWindow.on("ready-to-show", () => mainWindow.show())
  } else loadURL(mainWindow)
}

app.whenReady().then(() => {
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

  musicManager = MusicManager.getInstance()
  musicManager.setMusicDb(musicStore)

  initTray()
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })


})

app.on("will-quit", disposeCTXMenu)

ipc.handle("music-get", (e, key) => {
  return musicStore.get(key)
})

ipc.handle("get-dataUrl", async (e, filePath: string) => {
  return await musicManager.getDataUrl(filePath)
})

ipc.handle("music-set", (e, key: string, value: Song) => {
  return musicStore.set(key, value)
})

ipc.handle("music-open-in-editor", (e, key) => {
  return musicStore.openInEditor()
})

ipc.on("windowCmd", (e, msg) => {
  if (msg === "minimize") mainWindow.minimize()
  else if (msg === "maximize" && !mainWindow.isMaximized()) mainWindow.maximize()
  else if (msg === "maximize" && mainWindow.isMaximized()) mainWindow.unmaximize()
  else if (msg === "close") mainWindow.close()
})

// ipc.answerRenderer('store-get', (key: string) => {
//   return store.get(key)
// })

// ipc.on('store-set', (e, key: string, value: any) => {
//   store.set(key, value)
// })

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})