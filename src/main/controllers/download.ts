import { IpcEvents } from '@peepo/core'
import { BrowserWindow } from 'electron'
import { inject } from 'inversify'
import { join } from 'path'
import yts from 'yt-search'
import Config from '../services/config'
import { MusicManager } from '../services/music-manager'
import { ipcController, ipcEvent } from '../utils/decorators'

@ipcController()
export class DownloadController {
  iconName: string

  constructor(@inject(MusicManager) private musicManager: MusicManager, @inject(Config) private config: Config) {
    this.iconName = join(config.buildResourcesPath, 'peepoG.png')
    console.log('DownloadController initialized')
  }

  @ipcEvent(IpcEvents.MUSIC_ADD)
  async addSong(url: string) {
    await this.musicManager.addSong(url)
  }

  @ipcEvent(IpcEvents.FILE_START_DRAG)
  async onDragStart(filePath: string, sender: BrowserWindow) {
    console.log('starting drag on file', filePath)
    if (!filePath) return
    sender.webContents.startDrag({
      file: filePath,
      icon: this.iconName,
    })
  }

  @ipcEvent(IpcEvents.MUSIC_INFO)
  async getSongInfo(url: string) {
    return await this.musicManager.getYoutubeVideoInfo(url)
  }

  @ipcEvent(IpcEvents.MUSIC_SEARCH)
  async search(query: string) {
    console.log('searching for', query)
    try {
      const results = await yts(query)
      return JSON.stringify(results)
    } catch (e) {
      console.error('Failed to search for music', e)
      return []
    }
  }
}
