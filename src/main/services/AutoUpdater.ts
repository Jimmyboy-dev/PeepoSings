import type { BrowserWindow } from 'electron'
import { app } from 'electron'
import { autoUpdater } from 'electron-updater'
import { injectable } from 'inversify'
import log from 'electron-log'

@injectable()
export default class AutoUpdater {
  constructor() {
    log.transports.file.level = 'debug'
    autoUpdater.logger = log
  }
  async onModuleInit() {
    if (!process.env.PROD) {
      autoUpdater.autoDownload = false
    }
    autoUpdater.fullChangelog = true
    const result = await autoUpdater.checkForUpdatesAndNotify({
      body: "It'll install in the background and update automatically when you restart the app.\n\nCheck the changelog for more info at https://github.com/Jimmyboy-dev/PeepoSings/releases/latest",
      title: `New Update Available for Peepo Sings!`,
    })
    log.info(result.updateInfo.releaseName, result.updateInfo.version)
  }
  public async manualCheckForUpdates(bWindow: BrowserWindow) {
    const update = await autoUpdater.checkForUpdates()

    if (update?.updateInfo.version !== app.getVersion()) {
      bWindow.webContents.send('update-available', update?.updateInfo)
    }
    return update?.updateInfo
  }
}
