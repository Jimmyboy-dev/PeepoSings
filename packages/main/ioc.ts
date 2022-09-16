import { ipcMain } from 'electron-better-ipc'
import { DatabaseControl } from './controllers/database'
import { DownloadController } from './controllers/download'
import { LoggerCtrl } from './controllers/logger'
import IpcPlayer from './controllers/player'
import SettingsIpcCtrl from './controllers/settings'
import AutoUpdater from './services/AutoUpdater'
import Config from './services/config'
import { Database } from './services/Database'
import Discord from './services/discord'
// import Download from './services/download'
import $ipc from './services/ipc'
import { MusicManager } from './services/music-manager'
import Platform from './services/platform'
import { PluginService } from './services/plugins'
import Scrobbler from './services/scrobbler'
import Store from './services/store'
import TrayMenu from './services/trayMenu'
import Window from './services/window'
import { ServiceProvider } from './utils/container'
import { Class } from './utils/types'

const services: ServiceProvider[] = [
  { useClass: Config },
  { useClass: Database },
  { useClass: Discord },
  { useClass: TrayMenu },
  { useClass: MusicManager },
  { useClass: Platform },
  { useClass: Scrobbler },
  { useClass: Store },
  { useClass: Window },
  { useClass: AutoUpdater },
  { useClass: PluginService },
  { provide: $ipc, useValue: ipcMain },
]

const controllers: Class[] = [DatabaseControl, DownloadController, IpcPlayer, SettingsIpcCtrl, LoggerCtrl]

export { services, controllers }
