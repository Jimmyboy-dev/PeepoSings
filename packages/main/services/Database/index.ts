import { app } from 'electron'
import { injectable } from 'inversify'
import { join } from 'path'
import { connect, Model } from 'trilogy'
import { MoodJSON, PeepoMeta } from '@peepo/core'
import { onModuleDestroy } from '../../utils/types'

@injectable()
export class Database implements onModuleDestroy {
  dbPath: string
  db: ReturnType<typeof connect>
  ready: Promise<void>
  songs: Model<PeepoMeta>
  moods: Model<MoodJSON>
  private resolve: () => void
  constructor() {
    this.dbPath = join(app.getPath('userData'), 'music.db')
    this.db = connect(this.dbPath)
    this.ready = new Promise((resolve) => {
      this.resolve = resolve
    })
    this.registerSchemas()
  }
  onModuleDestroy(): void | Promise<void> {
    return this.db.close()
  }

  private async registerSchemas() {
    this.songs = await this.db.model<PeepoMeta>('song', {
      title: String,
      path: { type: String, unique: true },
      artist: String,
      duration: Number,
      album: { type: String, nullable: true },
      favorite: { type: Boolean, defaultTo: false },
      in: Number,
      out: Number,
      metadata: 'json',
      mood: { type: Array, defaultTo: [] },
      id: 'increments',
      lastScanned: { type: Date, nullable: true },
      muid: { type: String, nullable: true },
      position: { type: Number, nullable: true },
      thumbnail: String,
    })
    this.moods = await this.db.model<MoodJSON>('mood', {
      id: 'increments',
      name: String,
      color: { type: String, defaultTo: '#77ee77' },
      icon: String,
    })
    this.resolve()
  }
}
