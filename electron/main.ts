import isDev from "electron-is-dev"
import * as dotenv from "dotenv"
dotenv.config()
import { app, BrowserWindow, Tray, Menu, nativeImage } from "electron"
import { ipcMain as ipc } from "electron-better-ipc"
import contextMenu from "electron-context-menu"
import windowStateKeeper from "electron-window-state"
import Store, { Schema } from "electron-store"
import serve from "electron-serve"
import path from "path"
import { StateStore } from "../store"

const disposeCTXMenu = contextMenu({
  showSaveImageAs: true,
  append: (menu) => [{ label: "Refresh", click: () => BrowserWindow.getFocusedWindow()?.reload() }],
})

Store.initRenderer()

const loadURL = serve({ directory: "dist" })

// const clientId = "YOUR_CLIENT_ID"
// const redirectUri = "http://foo.bar/login"

// const authProvider = new ElectronAuthProvider(
//   {
//     clientId,
//     redirectUri,
//   },
//   {}
// )
// authProvider.allowUserChange()

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
    webPreferences: {
      preload: path.join(__dirname, "renderers", "index.js"),
      contextIsolation: false,
    },
  })

  mainWindowState.manage(mainWindow)

  if (isDev) {
    console.log("Running in development")
    mainWindow.loadURL("http://localhost:3000")
  } else loadURL(mainWindow)
}

app.whenReady().then(() => {
  initTray()
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on("will-quit", disposeCTXMenu)

ipc.on("getAuth", (e, msg) => {
  // e.sender.send("auth", authProvider)
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