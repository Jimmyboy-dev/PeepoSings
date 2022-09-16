import { app } from 'electron'
import { injectable } from 'inversify'
import { join } from 'path'
import { MoodJSON, PeepoMeta } from '@peepo/core'
import { onModuleDestroy } from '../../utils/types'
import { DataSource, Repository } from 'typeorm'
import { Song } from './entities/Song'
import { Mood } from './entities/Mood'
// import { MigrationInterface } from 'typeorm'

// let migrations: MigrationInterface[] = []
// // @ts-ignore
// import.meta.glob('./migrations/*.ts').then((migration: Record<string, () => Promise<MigrationInterface>>) => {
//   for (const mig in migration) {
//     migration[mig]().then((mig) => {
//       migrations.concat(Object.values(mig))
//     })
//   }
//   migrations = migrations.flat()
// })

@injectable()
export class Database extends DataSource implements onModuleDestroy {
  dbPath: string
  constructor() {
    const dbPath = join(app.getPath('userData'), 'music.db')
    super({
      type: 'better-sqlite3',
      database: dbPath,
      entities: [Song, Mood],
      migrations: ['./migrations/*.ts', './migrations/*.js'],
      migrationsRun: true,
      migrationsTableName: 'peepo_migrations',
    })
    this.dbPath = dbPath

    this.registerSchemas()
  }
  onModuleDestroy(): void | Promise<void> {
    return this.destroy()
  }

  private async registerSchemas() {
    await this.initialize()
  }

  get songs() {
    return this.getRepository(Song)
  }
  get moods() {
    return this.getRepository(Mood)
  }
}
