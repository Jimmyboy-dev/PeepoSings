import { inject, injectable } from 'inversify'
import path from 'path'

import type Logger from '../logger'
import { $mainLogger } from '../logger'
import Platform from '../platform'

const MANDATORY_ENV = ['DISCORD_CLIENT_ID', 'LAST_FM_KEY']

@injectable()
class Config {
  keybinds: {
    playPause: string
  }
  acousticId: {
    key: string
    url: string
  }
  lastfm: {
    key: string
    secret: string
  }
  youtubeUrl: string
  youtubeSearch: string
  title: string
  env: 'development' | 'production' | 'test'
  appid: string
  icon: string
  macIcon: string
  discordClientId: string
  thumbCleanInterval: number
  iconPath: string
  sqliteDbName: string
  isConnected: any
  supportedFormats: any

  constructor(@inject($mainLogger) logger: Logger, @inject(Platform) platform: Platform) {
    this.env = (import.meta.env.MODE as any) || 'development'
    this.title = 'Peepo Sings'
    this.appid = 'com.devjimmyboy.peeposings'
    this.youtubeUrl = 'https://www.youtube.com/watch'
    this.youtubeSearch = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&type=video&maxResults=50&q='
    // this.supportedFormats = _.uniq(pkg.build.fileAssociations.map(({ ext }) => ext));
    this.keybinds = { playPause: 'CmdOrCtrl+CapsLock+Space' }

    this.iconPath = path.resolve(__dirname, this.isProd() ? '../../buildResources' : '../../buildResources')

    this.icon = path.resolve(this.iconPath, platform.isWindows() ? 'icon.ico' : 'icon.png')
    this.macIcon = path.resolve(this.iconPath, 'icon_apple.png')

    this.thumbCleanInterval = 30
    this.sqliteDbName = 'peepo-sings-db.sqlite'

    logger.log(this.env, 'Env variables loaded')

    this.validateEnv()

    this.acousticId = {
      key: import.meta.env['VITE_LAST_FM_KEY'],
      // secret: import.meta.env['VITE_LAST_FM_SHARED_SECRET'],
      url: 'https://api.acoustid.org/v2/lookup',
    }
    this.lastfm = {
      key: process.env['LAST_FM_KEY']!,
      secret: import.meta.env['VITE_LAST_FM_SHARED_SECRET'],
    }
    logger.log(import.meta.env['VITE_LAST_FM_KEY'], '- AcousticId Creds')

    this.discordClientId = import.meta.env['VITE_DISCORD_CLIENT_ID']
  }

  private validateEnv(): void {
    MANDATORY_ENV.forEach((ENV) => {
      if (!import.meta.env[`VITE_${ENV}`]) {
        throw new Error(`missing mandatory env variable ${ENV}`)
      }
    })
  }

  isDev(): boolean {
    return this.env === 'development'
  }

  isProd(): boolean {
    return this.env === 'production'
  }

  // isFileSupported(filePath: string): boolean {
  //   return this.supportedFormats.includes(path.extname(filePath).split('.')[1])
  // }

  setConnectivity(isConnected: boolean) {
    this.isConnected = isConnected
  }
}

export default Config
