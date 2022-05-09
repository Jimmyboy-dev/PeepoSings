import type { PeepoMeta } from '@peeposings/shared'
import { IpcEvents } from '@peeposings/shared'

import type { IpcMessageEvent, DownloadItem } from 'electron'
import { inject } from 'inversify'

import { ipcController, ipcEvent } from '../utils/decorators'
import { getTrackArtist, getTrackTitle } from '../utils/tracks'
import Download from '../modules/downloads'
import type Logger from '../modules/logger'
import { $mainLogger } from '../modules/logger'
import Window from '../modules/window'

interface DownloadRef {
  uuid: string
  ref: DownloadItem
}

@ipcController()
class DownloadIpcCtrl {
  private downloadItems: DownloadRef[] = []
  constructor(@inject(Download) private download: Download, @inject($mainLogger) private logger: Logger, @inject(Window) private window: Window) {}

  /**
   * Start a download using the download service
   */
  @ipcEvent(IpcEvents.DOWNLOAD_START)
  async onStartDownload(event: IpcMessageEvent, data: PeepoMeta) {
    try {
      const { uuid } = data
      const downloadRef = this.downloadItems.find((item) => item.uuid === uuid)
      if (downloadRef) {
        if (downloadRef.ref.canResume()) {
          downloadRef.ref.resume()
          return
        }
        this.downloadItems = this.downloadItems.filter((item) => item.uuid === uuid)
      }
      const artistName = getTrackArtist(data)
      const title = getTrackTitle(data)

      const filename = `${artistName} - ${title}`

      this.logger.log(`Start Download: ${artistName} - ${title}`)

      await this.download.start({
        query: {
          artist: artistName!,
          track: title!,
        },
        filename,
        onStart: (item) => {
          this.downloadItems = this.downloadItems.filter((item) => item.uuid !== uuid)
          this.downloadItems.push({ uuid, ref: item })
        },
        onProgress: (progress) => {
          if (progress.transferredBytes === progress.totalBytes) {
            this.window.send(IpcEvents.DOWNLOAD_FINISHED, uuid)
            this.downloadItems = this.downloadItems.filter((item) => item.uuid !== uuid)
          }
          this.window.send(IpcEvents.DOWNLOAD_PROGRESS, {
            uuid,
            progress: progress.percent,
          })
        },
      })
      this.logger.log(`Download success: ${artistName} - ${title}`)
    } catch (error) {
      this.window.send(IpcEvents.DOWNLOAD_ERROR, { uuid: data.uuid, error })
      throw error
    }
  }

  @ipcEvent(IpcEvents.DOWNLOAD_REMOVED)
  async onDownloadRemoved(event: IpcMessageEvent, data: PeepoMeta) {
    try {
      const { uuid } = data
      this.downloadItems = this.downloadItems.filter((item) => item.uuid === uuid)
    } catch (error) {
      this.window.send(IpcEvents.DOWNLOAD_ERROR, { uuid: data.uuid, error })
      throw error
    }
  }

  @ipcEvent(IpcEvents.DOWNLOAD_PAUSE)
  async onPauseDownload(event: IpcMessageEvent, data: PeepoMeta) {
    try {
      const { uuid } = data
      const downloadRef = this.downloadItems.find((item) => item.uuid === uuid)
      if (downloadRef) {
        downloadRef.ref.pause()
      }
    } catch (error) {
      this.window.send(IpcEvents.DOWNLOAD_ERROR, { uuid: data.uuid, error })
      throw error
    }
  }
}

export default DownloadIpcCtrl