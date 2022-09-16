import { inject, injectable } from 'inversify'
import { IpcEvents, MoodJSON, PeepoMeta } from '@peepo/core'
import { Database } from '../services/Database'
import { MusicManager } from '../services/music-manager'
import { ipcEvent } from '../utils/decorators'
import { FindOptionsWhere, In } from 'typeorm'
import { Song } from '../services/Database/entities/Song'
import { Mood } from '../services/Database/entities/Mood'

type UpdateCriteria = ['song', FindOptionsWhere<Song>, Partial<Song>] | ['mood', FindOptionsWhere<Mood>, Partial<MoodJSON>]
type FindCriteria = ['song', FindOptionsWhere<Song>] | ['mood', FindOptionsWhere<Mood>]

@injectable()
export class DatabaseControl {
  constructor(@inject(Database) private db: Database, @inject(MusicManager) private musicManager: MusicManager) {}

  @ipcEvent(IpcEvents.DB_UPDATE)
  async updateDb([model, criteria, data]: UpdateCriteria) {
    const repoName = `${model}s` as 'songs' | 'moods'
    const repo = this.db[repoName] as typeof repoName extends 'songs' ? typeof this.db.songs : typeof this.db.moods
    let entity = await repo.findOneBy(criteria)
    entity = repo.merge(entity, data)
    return await repo.save(entity)
  }

  @ipcEvent(IpcEvents.DB_REMOVE)
  async removeDb([model, criteria]: FindCriteria) {
    if (model === 'song') {
      const result = await this.db.songs.findOneBy(criteria)
      if (!result) return
      const song = this.musicManager.removeSong(result.path)
      return song
    }
    let result = model === 'mood' ? await this.db.moods.delete(criteria) : await this.db.songs.delete(criteria)
    return result
  }

  @ipcEvent(IpcEvents.MOOD_ADD)
  async addMood(data: Omit<MoodJSON, 'id'>) {
    const mood = this.db.moods.create(data)
    return await this.db.moods.save(mood)
  }

  @ipcEvent(IpcEvents.MUSIC_MOOD)
  async addSongToMood(data: { song: number; mood: number | number[] }) {
    let song = await this.db.songs.findOne({
      where: { id: data.song },
      relations: {
        mood: true,
      },
    })
    let moodToAdd: Mood | Mood[]
    if (!song) return
    if (Array.isArray(data.mood)) {
      moodToAdd = await this.db.moods.find({ where: { id: In(data.mood) } })
      moodToAdd = moodToAdd.filter((m) => song.mood.findIndex((sM) => sM.id === m.id) === -1)
      song.mood.push(...moodToAdd)
    } else {
      moodToAdd = await this.db.moods.findOneBy({ id: data.mood })
      song.mood.push(moodToAdd)
    }
    return await this.db.songs.save(song)
  }
}
