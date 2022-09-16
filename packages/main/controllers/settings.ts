import { IpcEvents } from '@peepo/core'
import { BrowserWindow, IpcMessageEvent } from 'electron'
import { inject } from 'inversify'
import type { getSession } from 'lastfm-typed/dist/interfaces/authInterface'
import AutoUpdater from '../services/AutoUpdater'

import Config from '../services/config'
import { MusicManager } from '../services/music-manager'
import Scrobbler from '../services/scrobbler'
import Store from '../services/store'
import Window from '../services/window'
import { ipcEvent, ipcController } from '../utils/decorators'

@ipcController()
class SettingsIpcCtrl {
  constructor(
    @inject(Config) private config: Config,
    @inject(Store) private store: Store,
    @inject(Scrobbler) private scrobbler: Scrobbler,
    @inject(Window) private window: Window,
    @inject(MusicManager) private music: MusicManager,
    private updater: AutoUpdater
  ) {}

  @ipcEvent(IpcEvents.STARTED, { once: true })
  onStart() {
    const settings: { [key: string]: any } = this.store.get('settings')
    for (const setting in settings) {
      if (setting.startsWith('restart-')) {
        this.store.setOption(setting.replace('restart-', ''), settings[setting])
      }
    }
  }

  @ipcEvent(IpcEvents.INITIAL_INFO)
  async onInitialData() {
    const songs = await this.music.getSongs()
    const moods = await this.music.getMoods()
    return { settings: this.store.getAll(), songs, moods }
  }

  @ipcEvent(IpcEvents.GET_OPTION)
  onStoreGet(key: string) {
    return this.store.getOption(key)
  }

  @ipcEvent(IpcEvents.SET_OPTION)
  async onStoreSet([key, val]: [string, any]) {
    this.store.setOption(key, val)
  }

  @ipcEvent(IpcEvents.SET_OPTION_SENSITIVE)
  async onStoreSetSensitive([key, val]: [string, any]) {
    this.store.setOption(`restart-${key}`, val)
  }

  @ipcEvent(IpcEvents.WINDOW_CLOSE)
  async onClose() {
    this.window.close()
  }

  @ipcEvent(IpcEvents.WINDOW_MINIMIZE)
  onMinimize() {
    this.window.minimize()
  }

  @ipcEvent(IpcEvents.WINDOW_MAXIMIZE)
  onMaximize() {
    this.window.maximize()
  }

  @ipcEvent(IpcEvents.WINDOW_OPEN_DEVTOOLS)
  openDevtools() {
    this.window.openDevTools()
  }

  @ipcEvent(IpcEvents.LASTFM_LOGIN)
  lastfmLogin() {
    this.scrobbler.login()
  }

  @ipcEvent(IpcEvents.LASTFM_SESSION)
  lastfmSession(session: getSession) {
    this.store.setOption('lastfm.session', session.key)
    this.scrobbler.session = session
  }

  @ipcEvent(IpcEvents.MUSIC_OPEN_EDITOR)
  onOpenEditor() {
    this.store.openInEditor()
  }

  @ipcEvent(IpcEvents.MANUAL_UPDATE)
  async manualUpdate(arg, window: BrowserWindow) {
    return await this.updater.manualCheckForUpdates(window)
  }
}

export default SettingsIpcCtrl
