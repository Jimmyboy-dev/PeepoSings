import 'reflect-metadata'
import 'source-map-support/register'
import AutoLaunch from 'auto-launch'
import { app, BrowserWindow, crashReporter, nativeTheme, shell } from 'electron'
import { ipcMain as ipc } from 'electron-better-ipc'
import contextMenu from 'electron-context-menu'
import isDev from 'electron-is-dev'
import logger from 'electron-log'
import Store from 'electron-store'
import { release } from 'os'
import { resolve } from 'path'
import ytsr from 'ytsr'

import { controllers, services } from './ioc'
import Config from './modules/config'
import Discord from './modules/discord'
import { MusicManager } from './modules/MusicManager'
import TrayMenu from './modules/tray'
import Window from './modules/window'
import Container from './utils/container'

process.features.debug = isDev

app.on('quit', (e, code) => {
  process.exit(code)
})

import type { ProtocolRequest } from 'electron'
import type AutoUpdater from './modules/AutoUpdater'
const appId = 'com.devJimmyboy.PeepoSings'
let autoLauncher: AutoLaunch

console.log(app.getPath('crashDumps'))
crashReporter.start({ submitURL: '', uploadToServer: false })

app.commandLine.appendSwitch('enable-webgl')
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required')
// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName() || appId)

let container: Container

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
} else {
  app.on('second-instance', async (event, commandLine) => {
    const window = container.get<Window>(Window)
    const config = container.get<Config>(Config)

    // Someone tried to run a second instance, we should focus our window.
    if (window) {
      window.restore()
      window.focus()
    }
  })
}

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('peepo', process.execPath, [resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('peepo')
}

const isDevelopment = import.meta.env.MODE === 'development' || isDev

let updater: AutoUpdater | null = null

const disposeCTXMenu = contextMenu({
  showSaveImageAs: true,
  append: (_menu) => [{ label: 'Refresh', click: () => BrowserWindow.getFocusedWindow()?.reload() }],
})

Store.initRenderer()

// const loadURL = serve({ directory: "dist" })

let musicManager: MusicManager

ipc.on('windowCmd', (e, msg) => {
  const win = container.get(Window)
  if (win) {
    if (msg === 'minimize') win.minimize()
    else if (msg === 'maximize') win.maximize()
    else if (msg === 'close') win.close()
  }
})

app.on('window-all-closed', async () => {
  try {
    logger.log('All windows closed, quitting')

    const win = container.get(Window)
    const discord = container.get<Discord>(Discord)

    if (win) win.close()
    await discord.clear()
  } catch (e) {
  } finally {
    if (process.platform !== 'darwin') app.quit()
  }
})

app
  .whenReady()
  .then(async () => {
    try {
      nativeTheme.themeSource = 'system'

      container = new Container({ controllers, services })
      const config = container.get(Config)
      const trayMenu = container.get(TrayMenu)
      const window = container.get(Window)
      // const discord = container.get(Discord)

      autoLauncher = new AutoLaunch({
        name: 'Peepo Sings',
        path: process.execPath || app.getPath('exe'),
      })

      if (config.isDev()) {
        await Promise.all([window.installDevTools()])
      }
      container.listen()
      await window.load()
      // window.registerKeybinds(true)
      musicManager = MusicManager.getInstance(window.getBrowserWindow())
      trayMenu.init()
      // discord
      //   .init()
      //   .then(() => logger.log('Discord ready!'))
      //   .catch((e) => logger.error(e))
    } catch (e) {
      console.error(e)
    }
  })
  .catch((e) => console.error('Failed create window:', e))

// Auto-updates
if (import.meta.env.PROD) {
  app
    .whenReady()
    .then(() => import('./modules/AutoUpdater'))
    .then(({ default: AutoUpdater }) => {
      updater = new AutoUpdater()
    })
    .catch((e) => console.error('Failed check updates:', e))
}

// Listeners
const listeners: { [key: string]: () => void } = {}
app.on('will-quit', disposeCTXMenu)

listeners.openLocation = ipc.answerRenderer('open-location', async (url: string) => {
  shell.showItemInFolder(url)
  return true
})

listeners.musicAdd = ipc.answerRenderer('music-add', async (url: string) => {
  const song = musicManager.addSong(url)
  return await song
})

listeners.musicRemove = ipc.answerRenderer('music-remove', async (path: string) => {
  const song = musicManager.removeSong(path)
  return song
})

listeners.videoInfo = ipc.answerRenderer('video-info', async (url: string) => {
  return await musicManager.getYoutubeVideoInfo(url)
})

listeners.musicSearch = ipc.answerRenderer('music-search', async (query: string) => {
  return await ytsr(query, { limit: 10 }).catch(console.error)
})

listeners.checkForUpdates = ipc.answerRenderer('check-for-updates', async () => {
  const win = container.get(Window)
  if (updater && win) {
    return await updater.manualCheckForUpdates(win.getBrowserWindow())
  } else return false
})

listeners.getVersion = ipc.answerRenderer('get-version', () => {
  return app.getVersion()
})

listeners.toggleAutoLaunch = ipc.answerRenderer('toggle-auto-launch', async () => {
  const enabled = await autoLauncher.isEnabled()
  if (enabled) {
    await autoLauncher.disable()
    console.log('Disabled auto-launch')
  } else {
    await autoLauncher.enable()
    console.log('Enabled auto-launch')
  }
  return !enabled
})

listeners.openURL = ipc.answerRenderer('open-url', (url: string) => {
  if (url.startsWith('http')) shell.openExternal(url)
})

listeners.toggleKeybinds = ipc.answerRenderer('toggle-keybinds', (url: boolean) => {
  container.get(Window).registerKeybinds(url)
})

// listeners.setCurrentSong = ipc.answerRenderer('set-current-song', (song: SongJSON | null) => {
//   if (song) tray?.setToolTip(`🎵 ${song.title} - ${song.artist}`)
//   else tray?.setToolTip(`🎵 ${app.getName()} - No Song Playing`)
//   return true
// })
