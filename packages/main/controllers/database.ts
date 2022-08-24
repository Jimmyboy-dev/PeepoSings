import { inject, injectable } from 'inversify'
import { Criteria } from 'trilogy'
import { IpcEvents, MoodJSON, PeepoMeta } from '@peepo/core'
import { Database } from '../services/Database'
import { MusicManager } from '../services/music-manager'
import { ipcEvent } from '../utils/decorators'

@injectable()
export class DatabaseControl {
  constructor(@inject(Database) private db: Database, @inject(MusicManager) private musicManager: MusicManager) {}

  @ipcEvent(IpcEvents.DB_UPDATE)
  updateDb([model, criteria, data]: ['song' | 'mood', Criteria<PeepoMeta | MoodJSON>, Partial<PeepoMeta | MoodJSON>]) {
    this.db.db.update(model, criteria, data)
  }

  @ipcEvent(IpcEvents.DB_REMOVE)
  async removeDb([model, criteria]: ['song' | 'mood', Criteria<PeepoMeta | MoodJSON>]) {
    let result = await this.db.db.remove(model, criteria)
    if (model === 'song') {
      const song = this.musicManager.removeSong(result[0].path)
      return song
    }
    return result
  }

  @ipcEvent(IpcEvents.MOOD_ADD)
  async addMood(data: Omit<MoodJSON, 'id'>) {
    return await this.db.moods.create(data)
  }
  @ipcEvent(IpcEvents.MUSIC_MOOD)
  async addSongToMood(data: { song: string; mood: number | number[] }) {
    let moods = (await this.db.songs.findOne({ id: data.song })).mood
    if (data.mood instanceof Array) {
      moods = data.mood
    } else moods = [...moods, data.mood]
    return await this.db.songs.update({ id: data.song }, { mood: moods })
  }
}
