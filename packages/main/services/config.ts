import dotenv from 'dotenv'
import { injectable, inject } from 'inversify'
import path from 'path'
import _ from 'lodash'

import pkg from '../../../package.json'
import { app, nativeImage } from 'electron'
import { readdirSync } from 'fs'
// import { Env } from '../../utils/env';
// import Logger, { $mainLogger } from '../logger';

@injectable()
class Config {
  acousticId: {
    key: string
    url: string
  }
  isConnected: boolean
  youtubeUrl: string
  youtubeSearch: string
  title: string
  appid: string
  supportedFormats: string[]
  // env: Env;
  icon: string
  icons: { [key: string]: Electron.NativeImage }
  iconPath: string
  macIcon: string
  discordClientId: string
  // discordClientSecret: string
  defaultInvidiousUrl: string
  thumbCleanInterval: number
  sqliteDbName: string

  constructor() {
    this.title = 'Peepo Sings'
    this.appid = 'peeposings'
    this.youtubeUrl = 'https://www.youtube.com/watch'
    this.youtubeSearch = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&type=video&maxResults=50&q='
    this.supportedFormats = _.uniq(fileAssociations.map(({ ext }) => ext))

    const iconPath = path.resolve(__dirname, this.isProd() ? '../../buildResources/' : '../../buildResources/')

    this.iconPath = iconPath

    this.icon = path.resolve(iconPath, 'icon.ico')
    this.macIcon = path.resolve(iconPath, 'icon.png')
    this.mapIcons()

    this.thumbCleanInterval = 30
    this.sqliteDbName = 'nuclear-local-db.sqlite'

    dotenv.config({
      path: path.resolve(__dirname, '.env'),
    })

    console.log('Env variables loaded')

    // this.acousticId = {
    //   key: process.env.ACOUSTIC_ID_KEY,
    //   url: 'https://api.acoustid.org/v2/lookup',
    // }

    this.discordClientId = import.meta.env.VITE_DISCORD_CLIENT_ID
    // this.discordClientSecret = import.meta.env.VITE_DISCORD_CLIENT_SECRET as string
    // this.defaultInvidiousUrl = import.meta.env.INVIDIOUS_URL;
  }

  private mapIcons() {
    const icons = readdirSync(path.join(this.iconPath, 'icons'))
    this.icons = icons.reduce((acc, icon) => {
      acc[icon.split('.')[0]] = nativeImage.createFromPath(path.join(this.iconPath, 'icons', icon))
      return acc
    }, {})
  }

  isDev(): boolean {
    return import.meta.env.DEV
  }

  isProd(): boolean {
    return app.isPackaged
  }

  isFileSupported(filePath: string): boolean {
    return this.supportedFormats.includes(path.extname(filePath).split('.')[1])
  }

  setConnectivity(isConnected: boolean) {
    this.isConnected = isConnected
  }
  getIcon(string: string) {
    return this.icons[string]
  }
}

export default Config

const fileAssociations = [
  {
    ext: 'mp3',
    mimeType: 'audio/mp3',
  },
  {
    ext: 'mp3',
    mimeType: 'audio/mpeg',
  },
  {
    ext: 'ogg',
    mimeType: 'audio/ogg',
  },
  {
    ext: 'opus',
    mimeType: 'audio/ogg',
  },
  {
    ext: 'aac',
    mimeType: 'audio/aac',
  },
  {
    ext: 'flac',
    mimeType: 'audio/flac',
  },
  {
    ext: 'wav',
    mimeType: 'audio/x-wav',
  },
  {
    ext: 'm4a',
    mimeType: 'audio/m4a',
  },
  {
    ext: 'weba',
    mimeType: 'audio/weba',
  },
  {
    ext: 'mp4',
    mimeType: 'audio/mp4',
  },
  {
    ext: 'webm',
    mimeType: 'audio/webm',
  },
]
