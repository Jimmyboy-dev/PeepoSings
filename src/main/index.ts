import 'reflect-metadata'
import 'source-map-support/register'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import isDev from 'electron-is-dev'
import * as dotenv from 'dotenv'

dotenv.config({ path: resolve(process.cwd(), './.env.local') })
import { controllers, services } from './ioc'
import registerUnhandled from 'electron-unhandled'
registerUnhandled({})

import type { ProtocolRequest } from 'electron'
import { nativeTheme, net } from 'electron'
import { app, BrowserWindow, Tray, Menu, session, protocol, nativeImage, shell } from 'electron'
import { ipcMain as ipc } from 'electron-better-ipc'
import contextMenu from 'electron-context-menu'
import Store from './services/store.js'
// import onExit from 'signal-exit'
// import serve from "electron-serve"

import { MusicManager } from './services/music-manager.js'
import AutoLaunch from 'auto-launch'
import type AutoUpdater from './services/AutoUpdater.js'
import { release } from 'os'
import Discord from './services/discord.js'
import Scrobbler from './services/scrobbler.js'
import Container from './utils/container.js'
import Config from './services/config.js'
import Window from './services/window.js'
import { IpcEvents } from '@peepo/core'
import TrayMenu from './services/trayMenu.js'

const appId = 'com.devJimmyboy.PeepoSings'
let autoLauncher: AutoLaunch

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required')
// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

let container: Container

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(appId)
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
  process.exit(0)
} else {
  app.on('second-instance', async (event, commandLine, workingDirectory) => {
    const window = container.get<Window>(Window)
    const config = container.get<Config>(Config)

    // Someone tried to run a second instance, we should focus our window.
    if (window) {
      window.restore()
      window.focus()
      if (commandLine[1] && config.isFileSupported(commandLine[1])) {
        // localLibrary.playStartupFile(commandLine[1])
      }
    }
  })
}

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('peepo', process.execPath, [resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('peepo')
}

let updater: AutoUpdater | null = null

const disposeCTXMenu = contextMenu({
  showSaveImageAs: true,
  append: (_menu) => [{ label: 'Refresh', click: () => BrowserWindow.getFocusedWindow()?.reload() }],
})

// let tray: Tray | undefined

// function initTray() {
//   tray = new Tray(appIcon)

//   const contextMenu = Menu.buildFromTemplate([
//     { label: 'Play/Pause', click: () => ipc.sendToRenderers('toggle-play') },
//     { label: 'Show/Hide', click: () => win && (win.isVisible() ? win.hide() : win.show()) },
//     { label: 'Quit', click: () => app.quit() },
//   ])

//   tray.setToolTip('Peepo Sings')
//   tray.setContextMenu(contextMenu)
// }

// ipc.on(IpcEvents.WINDOW_CMD, (e, msg) => {
//   const win = container.get(Window)
//   if (win) {
//     if (msg === 'minimize') win.minimize()
//     else if (msg === 'maximize') win.maximize()
//     else if (msg === 'close') win.close()
//   }
// })

app.on('open-url', (event, url) => {
  const pUrl = new URL(url)
  const query = pUrl.searchParams
  const path = pUrl.hostname
  switch (path) {
    case 'lastfm-redirect':
      container.get(Scrobbler)?.authCallback()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    process.exit(0)
  }
})

app.whenReady().then(async () => {
  try {
    container = new Container({ controllers, services })
    const config = container.get<Config>(Config)
    const store = container.get<Store>(Store)
    const discord = container.get<Discord>(Discord)
    const trayMenu = container.get<TrayMenu>(TrayMenu)
    // const touchbarMenu = container.get<TouchbarMenu>(TouchbarMenu);
    const window = container.get<Window>(Window)
    if (config.isDev()) {
      await Promise.all([window.installDevTools()])
    }
    container.listen()
    await window.load()
    trayMenu.init()
    if (store.getOption('discordRichPresence')) {
      discord.init()
    }
    nativeTheme.themeSource = 'dark'
    protocol.handle('resource', async (req) => {
      console.log('accessing', req.url)
      const url = fileURLToPath(req.url.replace('resource', 'file'))
      return net.fetch('file' + url.substring(9))
    })
    if (config.isProd())
      autoLauncher = new AutoLaunch({
        name: 'Peepo Sings',
        path: process.execPath || app.getPath('exe'),
      })
    // if (autoLauncher.isEnabled() && config.isDev()) {
    //   autoLauncher.disable()
    // }
  } catch (e) {
    console.error('Failed to start app:', e)
    app.quit()
  }

  /*session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          "Access-Control-Allow-Origin": "https://* http://localhost:* file://*",
        },
      })
    })*/
})

// Auto-updates

// Listeners
const listeners: { [key: string]: () => void } = {}
app.on('will-quit', async () => {
  disposeCTXMenu()
  await container.close()
})

listeners.openLocation = ipc.answerRenderer('open-location', async (url: string) => {
  shell.showItemInFolder(url)
  return true
})

listeners.getVersion = ipc.answerRenderer('get-version', () => {
  return app.getVersion()
})

listeners.toggleAutoLaunch = ipc.answerRenderer('toggle-auto-launch', async () => {
  const store = container.get<Store>(Store)
  if (process.env.DEV) return false
  const enabled = await autoLauncher.isEnabled()
  if (enabled) {
    await autoLauncher.disable()
    console.log('Disabled auto-launch')
  } else {
    await autoLauncher.enable()
    console.log('Enabled auto-launch')
  }
  store.setOption('runOnStartup', !enabled)
  return !enabled
})

listeners.openURL = ipc.answerRenderer('open-url', (url: string) => {
  if (url.startsWith('http')) shell.openExternal(url)
})

// listeners.setCurrentSong = ipc.answerRenderer('set-current-song', (song: PeepoMeta | null) => {
//   if (song) tray?.setToolTip(`🎵 ${song.title} - ${song.artist}`)
//   else tray?.setToolTip(`🎵 ${app.getName()} - No Song Playing`)
//   return true
// })
