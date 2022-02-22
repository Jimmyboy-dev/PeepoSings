import { join } from "path"
import { URL, fileURLToPath } from "url"
// import './security-restrictions';
import isDev from "electron-is-dev"
import * as dotenv from "dotenv"
dotenv.config()

import type { ProtocolRequest } from "electron"
import { app, BrowserWindow, Tray, Menu, session, protocol, nativeImage, shell } from "electron"
import { ipcMain as ipc } from "electron-better-ipc"
import contextMenu from "electron-context-menu"
import windowStateKeeper from "electron-window-state"
import Store from "electron-store"
// import serve from "electron-serve"
import { MusicManager } from "./modules/MusicManager"
import AutoLaunch from "auto-launch"
import ytsr from "ytsr"
import type AutoUpdater from "./modules/AutoUpdater"

let autoLauncher: AutoLaunch

const isSingleInstance = app.requestSingleInstanceLock()
const isDevelopment = import.meta.env.MODE === "development" || isDev

let updater: AutoUpdater = null

if (!isSingleInstance) {
  app.quit()
  process.exit(0)
}

const disposeCTXMenu = contextMenu({
  showSaveImageAs: true,
  append: (_menu) => [{ label: "Refresh", click: () => BrowserWindow.getFocusedWindow()?.reload() }],
})

const appIcon = nativeImage.createFromPath(join(__dirname, "../../..", "build", process.platform === "win32" ? "icon.ico" : "icon.png"))

Store.initRenderer()



// const loadURL = serve({ directory: "dist" })

let musicManager: MusicManager

let tray: Tray | undefined

// Install "react devtools"
if (isDevelopment) {
  app.whenReady()
    .then(() => import("electron-devtools-installer"))
    .then(({ default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS }) => installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS]))
    .catch(e => console.error("Failed install extension:", e))
}



let mainWindow: BrowserWindow

function initTray() {

  tray = new Tray(appIcon)

  const contextMenu = Menu.buildFromTemplate([
    { label: "Play/Pause", click: () => ipc.sendToRenderers("toggle-play") },
    { label: "Show/Hide", click: () => mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show() },
    { label: "Quit", click: () => app.quit() },
  ])

  tray.setToolTip("Peepo Sings")
  tray.setContextMenu(contextMenu)
}

const createWindow = async () => {
  if (mainWindow)
    mainWindow.close()
  const mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800,
  })

  mainWindow = new BrowserWindow({
    show: false, // Use 'ready-to-show' event to show window
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 775,
    frame: false,
    icon: appIcon,
    webPreferences: {
      nativeWindowOpen: true,
      preload: join(__dirname, "../../preload/dist/index.cjs"),
      nodeIntegration: true,
    },
  })

  mainWindowState.manage(mainWindow)
  /**
   * If you install `show: true` then it can cause issues when trying to close the window.
   * Use `show: false` and listener events `ready-to-show` to fix these issues.
   *
   * @see https://github.com/electron/electron/issues/25012
   */
  mainWindow.on("ready-to-show", () => {
    mainWindow?.show()

    if (isDevelopment) {
      mainWindow?.webContents.openDevTools()
    }
  })

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */
  const pageUrl = isDevelopment && import.meta.env.VITE_DEV_SERVER_URL !== undefined
    ? import.meta.env.VITE_DEV_SERVER_URL
    : new URL("../renderer/dist/index.html", "file://" + __dirname).toString()


  await mainWindow.loadURL(pageUrl)
}


ipc.on("windowCmd", (e, msg) => {
  if (msg === "minimize") mainWindow.minimize()
  else if (msg === "maximize" && !mainWindow.isMaximized()) mainWindow.maximize()
  else if (msg === "maximize" && mainWindow.isMaximized()) mainWindow.unmaximize()
  else if (msg === "close") mainWindow.close()
})

ipc.on("trayTooltip", (e, tip: string) => {
  if (tray) tray.setToolTip(tip)
})

app.on("second-instance", () => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})


app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


app.whenReady().then(() => {
  autoLauncher = new AutoLaunch({
    name: "Peepo Sings",
    path: process.execPath || app.getPath("exe"),
  })
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Access-Control-Allow-Origin": "https://* http://localhost:* file://*",
      },
    })
  })
  protocol.interceptFileProtocol("resource", async (req: ProtocolRequest, callback: (filePath: string) => void) => {
    const url = fileURLToPath(req.url.replace("resource", "file"))
    callback(url)
  })
  musicManager = MusicManager.getInstance()

  initTray()

})
  .then(createWindow)
  .catch((e) => console.error("Failed create window:", e))


// Auto-updates
if (import.meta.env.PROD) {
  app.whenReady()
    .then(() => import("./modules/AutoUpdater"))
    .then(({ default: AutoUpdater }) => { updater = new AutoUpdater() })
    .catch((e) => console.error("Failed check updates:", e))
}


// Listeners
const listeners: { [key: string]: () => void } = {}
app.on("will-quit", disposeCTXMenu)

listeners.openLocation = ipc.answerRenderer("open-location", async (url: string) => {
  shell.showItemInFolder(url)
  return true
})


listeners.musicAdd = ipc.answerRenderer("music-add", async (url: string) => {
  const song = musicManager.addSong(url)
  return await song
})

listeners.musicRemove = ipc.answerRenderer("music-remove", async (path: string) => {
  const song = musicManager.removeSong(path)
  return song
})


listeners.videoInfo = ipc.answerRenderer("video-info", async (url: string) => {
  return await musicManager.getYoutubeVideoInfo(url)
})

listeners.musicSearch = ipc.answerRenderer("music-search", async (query: string) => {
  return await ytsr(query, { limit: 10 }).catch(console.error)
})

listeners.checkForUpdates = ipc.answerRenderer("check-for-updates", async () => {
  if (updater) {
    return await updater.manualCheckForUpdates(mainWindow)
  }
  else return false
})

listeners.getVersion = ipc.answerRenderer("get-version", () => {
  return app.getVersion()
})


listeners.toggleAutoLaunch = ipc.answerRenderer("toggle-auto-launch", async () => {
  const enabled = await autoLauncher.isEnabled()
  if (enabled) {
    await autoLauncher.disable()
    console.log("Disabled auto-launch")

  }
  else {
    await autoLauncher.enable()
    console.log("Enabled auto-launch")
  }
  return !enabled
})

listeners.openURL = ipc.answerRenderer("open-url", (url: string) => {
  if (url.startsWith("http"))
    shell.openExternal(url)
})