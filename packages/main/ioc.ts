import { ipcMain } from 'electron'
import type { Class } from 'type-fest'
import DownloadCtrl from './controllers/download'
import LocalLibraryCtrl from './controllers/local-library'

import LoggerCtrl from './controllers/logger'
import PlayerCtrl from './controllers/player'
import AcousticId from './modules/acoustic-id'
import Config from './modules/config'
import Discord from './modules/discord'
import Download from './modules/downloads'
import $ipc from './modules/ipc'
import LocalLibrary from './modules/local-library'
import LocalLibraryDb from './modules/local-library/db'
import Logger, { $httpApiLogger, $ipcLogger, $mainLogger, $systemApiLogger } from './modules/logger'
import Platform from './modules/platform'
import Store from './modules/store'
import TrayMenu from './modules/tray'
import Window from './modules/window'
import type { ServiceProvider } from './utils/types'

const services: ServiceProvider[] = [
  { useClass: AcousticId },
  { useClass: Config },
  { useClass: Discord },
  { useClass: Download },
  // { useClass: HttpApi },
  { useClass: LocalLibrary },
  { useClass: LocalLibraryDb },
  { useClass: Store },
  { useClass: Window },
  { useClass: Platform },
  // { useClass: SystemApi },
  { useClass: TrayMenu },

  { provide: $ipc, useValue: ipcMain },
  { provide: $mainLogger, useValue: new Logger() },
  { provide: $ipcLogger, useValue: new Logger('ipc api') },
  { provide: $httpApiLogger, useValue: new Logger('http api') },
  { provide: $systemApiLogger, useValue: new Logger('system api') },
]
// DownloadCtrl, LoggerCtrl, SettingsCtrl
const controllers: Class<unknown, any[]>[] = [LoggerCtrl, PlayerCtrl, DownloadCtrl, LocalLibraryCtrl]

export { services, controllers }
