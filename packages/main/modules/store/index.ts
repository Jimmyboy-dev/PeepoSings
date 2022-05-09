import { settingsConfig } from "@peeposings/shared";
import ElectronStore from "electron-store";
import { inject, injectable } from "inversify";
import _ from "lodash";

import Config from "../config";
import Logger, { $mainLogger } from "../logger";

@injectable()
class Store extends ElectronStore {
  constructor(@inject($mainLogger) private logger: Logger, @inject(Config) private config: Config) {
    super({
      name: 'peepo-store',
    })
    this.logger.log(`Initialized settings store at ${this.path}`)
  }

  getOption(key: string): any {
    const settings: any = this.get('settings') || {}
    let value = settings[key]

    if (typeof value === 'undefined') {
      value = (_.find(settingsConfig, { name: key }) as any).default
    }

    return value
  }

  setOption(key: string, value: any): void {
    const settings = this.get('settings') || {}

    this.set('settings', Object.assign({}, settings, { [`${key}`]: value }))
  }

  async setAvailableHttpPort(startPort: number, endPort: number) {
    const { default: getPort, portNumbers } = await import('get-port')
    const availablePort = await getPort({ port: portNumbers(startPort, endPort) })

    this.setOption('api.port', availablePort)
  }
}
export default Store
