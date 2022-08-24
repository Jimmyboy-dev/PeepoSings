import { app, nativeImage, BrowserWindow, NativeImage, shell } from 'electron'
import installExtension, { REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'
import { inject, injectable } from 'inversify'
import path from 'path'
import { URL } from 'url'

import Config from './config'
import Store from './store'
import Platform from './platform'
import windowStateKeeper from 'electron-window-state'
import { IpcEvents } from '../../core/src'

export const ROOT_PATH = {
  // /dist
  dist: path.resolve(__dirname, '..'),
  // /dist or /public
  public: path.join(__dirname, app.isPackaged ? '..' : '../../../public'),
}

/**
 * Wrapper around electron BrowserWindow
 * @see {@link https://electronjs.org/docs/api/browser-window}
 */
@injectable()
class Window {
  private browserWindow: BrowserWindow
  private mainWindowState: ReturnType<typeof windowStateKeeper>
  private isReady: Promise<void>
  private resolve: () => void

  private thumbarButtons: Electron.ThumbarButton[]
  appIcon: NativeImage

  constructor(@inject(Config) private config: Config, @inject(Platform) private platform: Platform, @inject(Store) store: Store) {
    this.appIcon = nativeImage.createFromPath(path.join(__dirname, '../..', 'buildResources', process.platform === 'win32' ? 'icon.ico' : 'icon.png'))
    this.mainWindowState = windowStateKeeper({
      defaultWidth: 1000,
      defaultHeight: 800,
    })
    const preload = path.join(__dirname, '../preload/index.js')
    console.debug('initializing window with the following dirNames:')
    console.dir({
      dist: ROOT_PATH.dist,
      public: ROOT_PATH.public,
      preload,
    })
    this.browserWindow = new BrowserWindow({
      title: config.title,
      x: this.mainWindowState.x,
      y: this.mainWindowState.y,
      width: this.mainWindowState.width,
      height: this.mainWindowState.height,
      minWidth: 775,
      icon: this.appIcon,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        // webviewTag: true,
        // additionalArguments: [store.getOption('disableGPU') && '--disable-gpu'],
        preload,
      },
      frame: !store.getOption('framelessWindow') ?? false,
      show: false,
    })

    if (platform.isMac()) {
      app.dock.setIcon(this.appIcon)
    }

    if (platform.isWindows()) {
      this.thumbarButtons = [
        {
          tooltip: 'Previous Song',
          icon: this.config.getIcon('step-backward'),
          click: () => this.send(IpcEvents.MUSIC_BACK),
          flags: ['enabled'],
        },
        {
          tooltip: 'Play',
          icon: this.config.getIcon('play'),
          click: () => this.send(IpcEvents.MUSIC_PLAY),
          flags: ['enabled'],
        },
        {
          tooltip: 'Forward Song',
          icon: this.config.getIcon('step-forward'),
          click: () => this.send(IpcEvents.MUSIC_FORWARD),
          flags: ['enabled'],
        },
      ]
      this.browserWindow.flashFrame(true)
      this.browserWindow.once('focus', () => this.browserWindow.flashFrame(false))
    }

    this.isReady = new Promise((resolve) => {
      this.resolve = resolve
    })

    this.browserWindow.once('ready-to-show', () => {
      this.browserWindow.show()
      console.log('ready-to-show')

      if (this.config.isDev()) {
        this.browserWindow.webContents.openDevTools()
      }

      this.resolve()
    })
    this.browserWindow.webContents.setWindowOpenHandler(({ url }) => {
      if (url.startsWith('https:')) shell.openExternal(url)
      return { action: 'deny' }
    })

    this.mainWindowState.manage(this.browserWindow)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  send(event: string, ...param: any[]): void {
    // this.ipcLogger.logEvent({ direction: 'out', event, data: param[0] })

    this.browserWindow.webContents.send(event, ...param)
  }

  focus() {
    this.browserWindow.focus()
  }

  getBrowserWindow() {
    return this.browserWindow
  }

  load() {
    const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`,
      indexHtml = path.join(ROOT_PATH.dist, 'index.html')

    if (!this.config.isDev()) {
      console.debug('window loading url:', indexHtml)
      this.browserWindow.loadFile(indexHtml)
    } else {
      console.debug('window loading url:', url)
      this.browserWindow.loadURL(url)
    }
    if (process.platform === 'win32') this.browserWindow.setThumbarButtons(this.thumbarButtons)
    return this.isReady
  }

  minimize() {
    this.browserWindow.minimize()
  }

  maximize() {
    if (this.platform.isMac()) {
      this.browserWindow.isFullScreen() ? this.browserWindow.setFullScreen(false) : this.browserWindow.setFullScreen(true)
    } else {
      this.browserWindow.isMaximized() ? this.browserWindow.unmaximize() : this.browserWindow.maximize()
    }
  }

  restore() {
    if (this.browserWindow.isMinimized()) {
      this.browserWindow.restore()
    }
  }

  setTitle(title: string) {
    this.browserWindow.setTitle(title)
  }

  openDevTools() {
    if (this.browserWindow.webContents.isDevToolsOpened()) {
      this.browserWindow.webContents.closeDevTools()
    } else {
      this.browserWindow.webContents.openDevTools()
    }
  }
  async installDevTools() {
    try {
      // Install "react devtools"
      if (this.config.isDev()) {
        const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = (await import('electron-devtools-installer'))!
        installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
      }
    } catch (err) {
      console.warn('something fails while trying to install devtools')
    }
  }

  close() {
    this.browserWindow.close()
  }
}

export default Window
