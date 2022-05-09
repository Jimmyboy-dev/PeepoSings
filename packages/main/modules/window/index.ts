import { IpcEvents } from "@peeposings/shared";
import { app, BrowserWindow, globalShortcut, nativeImage, session } from "electron";
import windowStateKeeper, { State } from "electron-window-state";
import { inject, injectable } from "inversify";
import path, { normalize } from "path";
import url from "url";

import Config from "../config";
import Logger, { $ipcLogger, $mainLogger } from "../logger";
import Platform from "../platform";

// const icon = nativeImage.createFromPath(path.join(__dirname, '../../../../buildResources/icon.png'))

const urlMapper: Record<'production' | 'development' | 'test', string> = {
  development: new URL('http://localhost:3000/').href,
  production: new URL(path.join(__dirname, 'index.html'), 'file://').href,
  test: '',
}

/**
 * Wrapper around electron BrowserWindow
 * @see {@link https://electronjs.org/docs/api/browser-window}
 */
@injectable()
class Window {
  private windowStateKeeper: State
  private _window: BrowserWindow
  private thumbarButtons: Electron.ThumbarButton[]
  private partition = 'persist:main'
  private isReady: Promise<void>
  private resolve?: () => void

  constructor(@inject(Config) private config: Config, @inject($mainLogger) private logger: Logger, @inject($ipcLogger) private ipcLogger: Logger, @inject(Platform) private platform: Platform) {
    const ses = session.fromPartition(this.partition)
    ses.protocol.registerFileProtocol('resource', (request, callback) => {
      const url = decodeURI(request.url.replace('resource://', ''))
      const path = normalize(url)
      this.logger.log(`accessing resource: ${path}`)
      callback({ path })
    })

    const icon = nativeImage.createFromPath(config.icon)
    this.windowStateKeeper = windowStateKeeper({
      defaultWidth: 1000,
      defaultHeight: 800,
    })

    this._window = new BrowserWindow({
      show: false, // Use 'ready-to-show' event to show window
      x: this.windowStateKeeper.x,
      y: this.windowStateKeeper.y,
      width: this.windowStateKeeper.width,
      height: this.windowStateKeeper.height,
      minWidth: 775,
      frame: false,
      icon,
      webPreferences: {
        session: ses,
        nodeIntegration: true,
        // contextIsolation: false,
        // webSecurity: false,
        preload: path.join(__dirname, '../preload/index.cjs'),
      },
    })

    this.thumbarButtons = [
      {
        tooltip: 'play',
        click() {
          logger.log('Play')
        },
        icon: nativeImage.createFromPath(path.join(config.iconPath, 'play-solid.png')),
      },
    ]

    if (platform.isMac()) {
      app.dock.setIcon(icon)
    }

    if (platform.isWindows()) {
      this._window.flashFrame(true)
      this._window.once('focus', () => this._window.flashFrame(false))
    }

    this.isReady = new Promise((resolve) => {
      this.resolve = resolve
    })

    this._window.once('ready-to-show', () => {
      this._window.show()

      if (import.meta.env.DEV) {
        this._window.webContents.openDevTools()
      }
      if (this.resolve) this.resolve()
      this.windowStateKeeper.manage(this._window)
      this.updateThumbarButtons()
    })
  }

  send(event: string, ...param: any[]): void {
    this.ipcLogger.logEvent({ direction: 'out', event, data: param[0] })

    this._window.webContents.send(event, ...param)
  }

  focus() {
    this._window.focus()
  }

  registerKeybinds(enabled: boolean) {
    const alreadyEnabled = globalShortcut.isRegistered(this.config.keybinds.playPause)
    if (enabled && !alreadyEnabled) {
      const registered = globalShortcut.register(this.config.keybinds.playPause, () => {
        this.send(IpcEvents.PLAYPAUSE)
      })
      this.logger.log(`registered keybind '${this.config.keybinds.playPause}' ${registered ? 'successful' : 'failed'}`)
    } else if (!enabled && alreadyEnabled) {
      globalShortcut.unregister(this.config.keybinds.playPause)
      this.logger.log(`unregistered keybind '${this.config.keybinds.playPause}'`)
    }
  }

  getBrowserWindow() {
    return this._window
  }

  load() {
    if (app.isPackaged) {
      this._window.loadFile(path.resolve(__dirname, '../renderer/index.html'))
    } else {
      const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`

      this._window.loadURL(url)
    }
    return this.isReady
  }

  minimize() {
    this._window.minimize()
  }

  maximize() {
    if (this.platform.isMac()) {
      this._window.isFullScreen() ? this._window.setFullScreen(false) : this._window.setFullScreen(true)
    } else {
      this._window.isMaximized() ? this._window.unmaximize() : this._window.maximize()
    }
  }

  restore() {
    if (this._window.isMinimized()) {
      this._window.restore()
    }
  }

  setTitle(title: string) {
    this._window.setTitle(title)
  }

  setProgressBar(progress: number) {
    if (progress < 0) this._window.setProgressBar(-1)
    else if (progress > 1) this._window.setProgressBar(2)
    else this._window.setProgressBar(progress)
  }

  updateThumbarButtons() {
    this._window.setThumbarButtons(this.thumbarButtons)
  }

  openDevTools() {
    if (this._window.webContents.isDevToolsOpened()) {
      this._window.webContents.closeDevTools()
    } else {
      this._window.webContents.openDevTools()
    }
  }

  async installDevTools() {
    const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = await import('electron-devtools-installer')
    try {
      await Promise.all([installExtension(REACT_DEVELOPER_TOOLS), installExtension(REDUX_DEVTOOLS)])
      this.logger.log('devtools installed')
    } catch (err) {
      this.logger.warn('something fails while trying to install devtools')
    }
  }

  close() {
    this._window.close()
  }
}

export default Window
