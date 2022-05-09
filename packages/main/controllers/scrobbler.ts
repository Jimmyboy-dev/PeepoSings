import { IpcEvents } from '@peeposings/shared'
import type { IpcMessageEvent } from 'electron'
import { inject } from 'inversify'
import LastFMTyped from 'lastfm-typed'

import Config from '../modules/config'
import type Logger from '../modules/logger'
import { $mainLogger } from '../modules/logger'
import { ipcController, ipcEvent } from '../utils/decorators'

@ipcController()
class IpcScrobbler {
  lastfm: LastFMTyped
  constructor(@inject(Config) private config: Config, @inject($mainLogger) private logger: Logger) {
    this.lastfm = new LastFMTyped(config.acousticId.key, { apiSecret: config.lastfm.secret })
  }

  @ipcEvent(IpcEvents.SONG_CHANGE)
  onScrobble(evt: IpcMessageEvent, data: any) {
    this.logger.log(`Scrobbling ${data.title}`)

    return Promise.resolve()
  }

  @ipcEvent(IpcEvents.SONG_CHANGE)
  async login(evt: IpcMessageEvent, data: any) {
    this.logger.log('Logging in to Last.fm')
    this.config.acousticId
    return this.lastfm.auth.getMobileSession(data.username, data.password, data.token)
  }
}
export default IpcScrobbler
