/* eslint-disable @typescript-eslint/no-explicit-any */
import { settingsConfig } from '../utils/settings'
import ElectronStore from 'electron-store'
import { inject, injectable } from 'inversify'
import _ from 'lodash'

import Config from './config'

/**
 * Wrapper around electron-store
 * @see {@link https://github.com/sindresorhus/electron-store}
 */
@injectable()
class Store extends ElectronStore {
  constructor(@inject(Config) private config: Config) {
    super({ name: 'settings' })

    if (!this.getOption('invidious.url')) {
      this.setOption('invidious.url', this.config.defaultInvidiousUrl)
    }

    if (!this.getLastThumbCleanDate()) {
      this.setLastThumbCleanDate(new Date())
    }

    console.log(`Initialized settings store at ${this.path}`)
  }

  getOption(key: string): any {
    const value = this.get(`settings.${key}`) || {}

    return value
  }

  setOption(key: string, value: any): void {
    try {
      if (!value) {
        this.delete(`settings.${key}`)
      } else this.set(`settings.${key}`, value)
    } catch (e) {
      console.error(e)
    }
  }

  getAll() {
    const settings = this.get('settings') || {}
    return settings
  }

  async setAvailableHttpPort(startPort: number, endPort: number) {
    const { default: getPort, portNumbers } = await import('get-port')
    const availablePort = await getPort({ port: portNumbers(startPort, endPort) })

    this.setOption('api.port', availablePort)
  }

  getLastThumbCleanDate(): Date | undefined {
    const time = this.get('last-thumb-clean-date') as number

    if (time) {
      return new Date(time)
    }
  }

  setLastThumbCleanDate(date: Date): void {
    this.set('last-thumb-clean-date', date.getTime())
  }
}

export default Store
