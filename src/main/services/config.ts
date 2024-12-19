// import dotenv from 'dotenv'
import { injectable, inject } from 'inversify'
import path from 'path'
import _ from 'lodash'

// import pkg from '../../../package.json'
import { app, nativeImage } from 'electron'
import { readdirSync } from 'fs'
import chalk from 'chalk'

// import { Env } from '../../utils/env';
// import Logger, { $mainLogger } from '../logger';

@injectable()
class Config {
  acousticId: {
    key: string
    url: string
  }
  isConnected: boolean = false
  youtubeUrl: string
  youtubeSearch: string
  title: string
  appid: string
  supportedFormats: string[]
  // env: Env;
  icon: string
  icons!: { [key: string]: { path: string; img: Electron.NativeImage } }
  buildResourcesPath: string
  macIcon: string
  discordClientId: string
  // discordClientSecret: string
  // defaultInvidiousUrl: string
  thumbCleanInterval: number
  sqliteDbName: string
  fpcalcPath: string

  constructor() {
    this.title = 'Peepo Sings'
    this.appid = 'peeposings'
    this.youtubeUrl = 'https://www.youtube.com/watch'
    this.youtubeSearch = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&type=video&maxResults=50&q='
    this.supportedFormats = _.uniq(fileAssociations.map(({ ext }) => ext))

    const buildResourcesPath = path.resolve(__dirname, this.isProd() ? '../../resources/' : '../../resources/')
    console.log('buildResourcesPath:', chalk.green(buildResourcesPath))
    this.buildResourcesPath = buildResourcesPath
    const platform = process.platform === 'darwin' ? 'macos' : process.platform === 'win32' ? 'windows' : 'linux'
    this.fpcalcPath = path.join(buildResourcesPath, `bin${!this.isProd() ? `/${platform}` : ''}`, `fpcalc${platform === 'windows' ? '.exe' : ''}`)
    // if (this.isProd()) {
    //   this.fpcalcPath = this.fpcalcPath.replace('app.asar', 'app.asar.unpacked')
    // }
    console.log('fpcalcPath:', this.fpcalcPath)
    this.icon = path.resolve(buildResourcesPath, 'icon.ico')
    this.macIcon = path.resolve(buildResourcesPath, 'icon.png')
    this.mapIcons()

    this.thumbCleanInterval = 30
    this.sqliteDbName = 'peepo-db.sqlite'

    console.log('Env variables loaded')

    this.acousticId = {
      key: import.meta.env.MAIN_VITE_ACOUSTID_KEY,
      url: 'https://api.acoustid.org/v2/lookup',
    }

    this.discordClientId = import.meta.env.MAIN_VITE_DISCORD_CLIENT_ID
    // this.discordClientSecret = process.env.VITE_DISCORD_CLIENT_SECRET as string
    // this.defaultInvidiousUrl = process.env.INVIDIOUS_URL;
  }

  private mapIcons() {
    const iconPath = path.resolve(this.buildResourcesPath, './icons')
    const icons = readdirSync(iconPath)
    console.log('icons:', icons.join())
    this.icons = icons.reduce((acc, icon) => {
      acc[icon.split('.')[0]] = {
        path: path.resolve(iconPath, icon),
        img: nativeImage.createFromPath(path.join(this.buildResourcesPath, 'icons', icon)),
      }
      return acc
    }, {})
  }

  isDev(): boolean {
    return !!import.meta.env.DEV || process.env.NODE_ENV === 'development'
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
    const icon = this.icons[string]
    if (!icon) {
      console.log('Icon not found', string)
      console.log(chalk.greenBright('Available icons:'), Object.keys(this.icons))
    } else {
      console.log('Icon found:', icon.img.getSize())
    }
    return icon
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
