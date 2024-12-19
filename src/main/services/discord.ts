import { PeepoMeta } from '@peepo/core'
import DiscordRPC from 'discord-rpc'
import { inject, injectable } from 'inversify'
import Config from './config'

// const scopes = ['rpc']

@injectable()
class Discord {
  private rpc!: DiscordRPC.Client
  private connected = false
  private isReady = false
  private baseStart!: number
  private pauseStart!: number
  private pausedTotal = 0
  private activity?: DiscordRPC.Presence

  constructor(@inject(Config) private config: Config) {}

  private async sendActivity() {
    try {
      await this.rpc.setActivity(this.activity)
      console.log('update discord activity')
    } catch (err) {
      console.error('error trying to set discord activity')
    }
  }

  async pause() {
    if (this.isReady && this.activity) {
      this.pauseStart = Date.now()

      this.activity.details += '\nPaused'
      this.activity.startTimestamp = this.pauseStart
      return this.sendActivity()
    }
  }

  async play() {
    if (this.isReady && this.activity) {
      this.pausedTotal += Date.now() - this.pauseStart
      if (this.activity) {
        this.activity.details = this.activity.details?.substring(0, this.activity.details?.length - 8)
        this.activity.startTimestamp = this.baseStart + this.pausedTotal
        return this.sendActivity()
      }
    }
  }

  async init(cb?: () => void) {
    DiscordRPC.register(this.config.discordClientId)
    this.rpc = new DiscordRPC.Client({ transport: 'ipc' })

    this.rpc.once('ready', () => {
      console.log('connected to discord')
      this.connected = true
      this.isReady = true
      cb && cb()
    })

    this.rpc.once('error', (e) => {
      console.error('error connecting to discord', e)
      this.connected = false
      this.isReady = false
    })

    try {
      await this.rpc.login({ clientId: this.config.discordClientId })
    } catch (err) {
      console.log('error trying to connect discord')
      this.isReady = false
    }
  }

  async trackChange(track: PeepoMeta) {
    const extractor = track.metadata.extractor
    this.baseStart = Date.now()
    this.pausedTotal = 0
    this.activity = {
      details: `${track.artist} - ${track.title}`,
      startTimestamp: this.baseStart,
      largeImageKey: 'logo-idle',
      buttons: extractor ? [{ label: `Open on ${extractor[0].toUpperCase() + extractor.substring(1)}`, url: track.metadata.webpage_url! }] : undefined,
      state: 'Listening to Beautiful Music',
    }
    if (!this.rpc) {
      return null
    } else if (!this.isReady) {
      return this.init(() => {
        this.sendActivity()
      })
    } else {
      this.sendActivity()
    }
  }

  async clear() {
    delete this.activity
    if (this.isReady) {
      console.log('clear discord activity')
      try {
        await this.rpc.clearActivity()
      } catch (err) {
        console.error('error trying to clear discord activity')
      }
    }
  }
}

export default Discord
