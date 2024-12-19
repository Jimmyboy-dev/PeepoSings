import { IpcEvents } from '@peepo/core'
import type { PeepoMeta } from '@peepo/core'
import { IpcMessageEvent } from 'electron'
import { inject } from 'inversify'

import Window from '../services/window.js'
import { ipcEvent, ipcController } from '../utils/decorators.js'
import Discord from '../services/discord.js'
import Scrobbler from '../services/scrobbler.js'
import TrayMenu from '../services/trayMenu.js'

@ipcController()
class IpcPlayer {
  constructor(@inject(Discord) private discord: Discord, @inject(TrayMenu) private trayMenu: TrayMenu, @inject(Scrobbler) private scrobbler: Scrobbler, @inject(Window) private window: Window) {}

  @ipcEvent(IpcEvents.PLAY)
  onPlay() {
    // this.trayMenu.update({ isPlaying: true })
    this.window.togglePlayPause(false, true)
    return this.discord.play()
  }

  @ipcEvent(IpcEvents.PAUSE)
  onPause() {
    this.window.togglePlayPause(true, true)
    // this.trayMenu.update({ isPlaying: false })
    return this.discord.pause()
  }

  @ipcEvent(IpcEvents.VOLUME)
  onVolume(data: number) {}

  // @ipcEvent(IpcEvents.LOOP)
  // onLoop(evt: IpcMessageEvent, data: boolean) {}

  // @ipcEvent(IpcEvents.SHUFFLE)
  // onShuffle(evt: IpcMessageEvent, data: boolean) {}

  // @ipcEvent(IpcEvents.TRACK_ADD)
  // onAddTrack(evt: IpcMessageEvent, track: PeepoMeta) {}

  // @ipcEvent(IpcEvents.TRACK_REMOVE)
  // onRemoveTrack(evt: IpcMessageEvent, { uuid }: PeepoMeta) {}

  @ipcEvent(IpcEvents.QUEUE_CLEAR)
  async onClearTrackList() {
    try {
      await this.discord.clear()
      // this.trayMenu.update({ isPlaying: false, track: null })
    } catch (e) {
      console.error('Main process failed to react to IPC clear queue event')
    }
  }

  @ipcEvent(IpcEvents.SONG_CHANGE)
  onSongChange(arg: PeepoMeta | null) {
    if (!arg) {
      this.window.setTitle(`Peepo Sings`)
      this.discord.clear()
      this.trayMenu.update({ isPlaying: false, track: undefined })

      return
    }

    this.window.setTitle(`${arg.artist} - ${arg.title} - Peepo Sings`)
    this.discord.trackChange(arg)
    // this.scrobbler.trackChange(arg)
    this.trayMenu.update({ track: arg })
  }
}

export default IpcPlayer
