/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Progress } from 'electron-dl'
import registerDownloader, { download } from 'electron-dl'
import { inject, injectable } from 'inversify'
import _ from 'lodash'
import * as Youtube from '@peeposings/shared/rest/Youtube'
import type { StreamQuery } from '@peeposings/shared/plugins/plugins.types'

import Store from '../store'
import Config from '../config'
import Window from '../window'
import type { DownloadItem } from 'electron'

interface DownloadParams {
  query: StreamQuery
  filename: string
  onStart: (item: DownloadItem) => void
  onProgress: (progress: Progress) => any
}

/**
 * Download file via youtube api with electron-dl
 * @see {@link https://github.com/sindresorhus/electron-dl}
 */
@injectable()
class Download {
  constructor(@inject(Window) private window: Window, @inject(Store) private store: Store, @inject(Config) private config: Config) {
    registerDownloader()
  }

  /**
   * Download a song using Youtube
   */
  async start({ query, filename, onStart, onProgress }: DownloadParams): Promise<any> {
    const track = await Youtube.trackSearchByString(query, undefined, undefined, false)

    return download(this.window.getBrowserWindow(), track.stream, {
      filename: `${filename}.${track.format}`,
      directory: this.store.getOption('downloads.dir'),
      onStarted: onStart,
      onProgress: _.throttle(onProgress, 1000),
    })
  }
}

export default Download
