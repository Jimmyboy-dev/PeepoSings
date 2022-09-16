import { app } from 'electron'
import { injectable } from 'inversify'
import { PluginManager } from 'live-plugin-manager'
import path from 'path'

@injectable()
export class PluginService extends PluginManager {
  constructor() {
    super({
      pluginsPath: path.resolve(app.getPath('userData'), 'plugins'),
    })
  }
}
