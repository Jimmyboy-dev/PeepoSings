import { ipcMain } from 'electron-better-ipc'
import { DatabaseControl } from './controllers/database.js'
import { DownloadController } from './controllers/download.js'
import { LoggerCtrl } from './controllers/logger.js'
import IpcPlayer from './controllers/player.js'
import SettingsIpcCtrl from './controllers/settings.js'
import AutoUpdater from './services/AutoUpdater.js'
import Config from './services/config.js'
import { Database } from './services/Database/index.js'
import Discord from './services/discord.js'
// import Download from './services/download'
import $ipc from './services/ipc.js'
import { MusicManager } from './services/music-manager.js'
import Platform from './services/platform.js'
import { PluginService } from './services/plugins.js'
import Scrobbler from './services/scrobbler.js'
import Store from './services/store.js'
import TrayMenu from './services/trayMenu.js'
import Window from './services/window.js'
import { ServiceProvider } from './utils/container.js'
import { Class } from './utils/types.js'

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
