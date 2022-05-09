import { differenceInCalendarDays } from 'date-fns'
import { app } from 'electron'
import fs from 'fs'
import { inject, injectable } from 'inversify'
import path from 'path'
import glob from 'glob'
import type { Repository } from 'typeorm'
import { DataSource } from 'typeorm'
import { promisify } from 'util'

import Config from '../config'
import type Logger from '../logger'
import { $mainLogger } from '../logger'
import Store from '../store'
import LocalFolder from './models/LocalFolder'
import LocalTrack from './models/LocalTrack'
import _ from 'lodash'
import type { PeepoMeta } from '@peeposings/shared'

@injectable()
class LocalLibraryDb {
  private db!: DataSource
  private trackRepository!: Repository<LocalTrack>
  private folderRepository!: Repository<LocalFolder>

  constructor(@inject($mainLogger) private logger: Logger, @inject(Config) private config: Config, @inject(Store) private store: Store) {}

  async connect() {
    try {
      const database = path.join(app.getPath('userData'), this.config.sqliteDbName)
      this.db = new DataSource({
        type: 'better-sqlite3',
        database,
        entities: [LocalFolder, LocalTrack],
        synchronize: this.config.isDev(),
        logging: false,
      })

      this.folderRepository = this.db.getRepository<LocalFolder>(LocalFolder)
      this.trackRepository = this.db.getRepository<LocalTrack>(LocalTrack)

      this.logger.log(`Sqlite database created at ${database}`)
    } catch (err) {
      this.logger.error('Sqlite database creation failed')
      this.logger.error((err as Error).stack)
    }
  }

  async getLocalFolders(): Promise<LocalFolder[]> {
    return this.folderRepository.find()
  }

  async getOneFolder(path: string): Promise<LocalFolder | null> {
    return this.folderRepository.findOne({ where: { path } })
  }

  async removeLocalFolder(folder: string): Promise<LocalTrack[]> {
    const localFolder = await this.folderRepository.findOne({ where: { path: folder }, relations: ['tracks'] })

    if (localFolder) {
      await this.db.transaction(async (manager) => {
        await Promise.all(localFolder.tracks.map((track) => manager.remove(track)))
        await manager.remove(localFolder)
      })
    }

    return this.getTracks()
  }

  async getTracks(): Promise<LocalTrack[]> {
    return this.trackRepository.find()
  }

  async addFolder(folder: string) {
    const localFolders = await this.getLocalFolders()
    const folderPaths = localFolders.map(({ path }) => path)

    if (folderPaths.includes(folder)) {
      return localFolders.find(({ path }) => folder === path) as LocalFolder
    }

    if (this.isParentOfFolder(folder, folderPaths)) {
      await Promise.all(folderPaths.filter((file) => file.startsWith(folder)).map((path) => this.folderRepository.delete({ path })))
    }

    const newFolder = new LocalFolder()
    newFolder.path = folder

    return this.folderRepository.save(newFolder)
  }

  async updateTracks(formattedMetas: PeepoMeta[]): Promise<Partial<LocalTrack>[]> {
    try {
      try {
        const metas = await Promise.all(
          formattedMetas.map(async (track: PeepoMeta) => {
            const existingTrack = await this.trackRepository.findOne({ where: { path: track.path } })
            const newTrack = this.trackRepository.create(track)
            newTrack.imageData = track.imageData

            if (!existingTrack) {
              return this.trackRepository.save(newTrack)
            } else {
              newTrack.uuid = existingTrack.uuid
              return this.trackRepository.save(newTrack)
            }
          })
        )

        return metas
      } catch (err: any) {
        this.logger.error(err.stack)
        return this.trackRepository.find()
      }
    } catch (err) {
      this.logger.error(err)
      return []
    }
  }

  private isParentOfFolder(filePath: string, foldersPath: string[]): boolean {
    return !foldersPath.reduce<boolean>((acc, folder) => {
      return acc && !filePath.includes(folder)
    }, true)
  }

  async getTracksFromPath(filePaths: string[]): Promise<LocalTrack[]> {
    const tracks = await Promise.all(filePaths.map((filePath) => this.trackRepository.find({ where: { path: filePath } })))

    return tracks.flat()
  }

  // async cleanUnusedThumbnail() {
  //   const lastClean = this.store.getLastThumbCleanDate()
  //   const now = new Date()

  //   if (lastClean && differenceInCalendarDays(lastClean, now) >= this.config.thumbCleanInterval) {
  //     const tracksThumbPaths = await this.trackRepository.find({ select: ['thumbnail'] }).then((tracks) => _.uniq(tracks.map(({ thumbnailPath }) => thumbnailPath)))

  //     const thumbnailPaths = await promisify(glob)(`${LocalTrack.THUMBNAILS_DIR}/*.webp`)

  //     await Promise.all(thumbnailPaths.filter((thumb) => !tracksThumbPaths.includes(thumb)).map((thumb) => promisify(fs.unlink)(thumb)))

  //     this.store.setLastThumbCleanDate(now)
  //   }
  // }

  async close(): Promise<void> {
    return this.db.destroy()
  }
}
export default LocalLibraryDb
