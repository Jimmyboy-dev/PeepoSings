import type { BrowserWindow } from 'electron'
import { app } from 'electron'
import { autoUpdater } from 'electron-updater'

export default class AutoUpdater {
  constructor() {
    const log = require('electron-log')
    log.transports.file.level = 'debug'
    autoUpdater.logger = log
    autoUpdater.checkForUpdatesAndNotify()
  }

  public async manualCheckForUpdates(bWindow: BrowserWindow) {
    const update = await autoUpdater.checkForUpdates()
    if (update?.updateInfo.version !== app.getVersion()) {
      bWindow.webContents.send('update-available', update?.updateInfo)
    }
    return update?.updateInfo
  }
}
