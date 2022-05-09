import crypto from 'crypto'
import { app } from 'electron'
import fs from 'fs'
import Jimp from 'jimp/es'
import { nanoid as v4 } from 'nanoid'
import path from 'path'
import { AfterInsert, AfterLoad, AfterRemove, BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import url, { URL } from 'url'
import { promisify } from 'util'

import LocalFolder from './LocalFolder'

@Entity()
class LocalTrack {
  static THUMBNAILS_DIR = path.join(app.getPath('userData'), 'thumbnails')

  @PrimaryColumn()
  uuid!: string

  @Column({ nullable: true })
  album?: string

  @Column()
  artist!: string

  @Column()
  duration?: number

  @Column({ nullable: true })
  thumbnail?: string

  @Column()
  name?: string

  @Column({ unique: true })
  path!: string

  @Column({ nullable: true })
  position?: number

  @Column({ nullable: true })
  year?: string

  @Column({ nullable: true })
  lastScanned?: number

  @ManyToOne(() => LocalFolder, (folder) => folder.path)
  folder!: LocalFolder

  imageData?: Buffer
  streams?: {
    id: string
    title?: string
    duration?: number
    thumbnail?: string
    source: string
    stream: string
  }[]
  local?: boolean
  thumb?: string

  get thumbnailPath() {
    return this.thumbnail ? this.thumbnail.replace('file://', '') : null
  }

  private async existCover(coverPath: string): Promise<string | undefined> {
    try {
      const { isFile } = await promisify(fs.stat)(coverPath)
      if (isFile()) return coverPath
    } catch (err) {
      return undefined
    }
  }

  private hashThumbFilename() {
    return `${crypto
      .createHash('md5')
      .update(path.basename(this.album || this.path))
      .digest('hex')}.webp`
  }

  @AfterInsert()
  @AfterLoad()
  mapper() {
    this.local = true
    this.streams = [
      {
        id: v4(),
        title: this.name,
        duration: this.duration,
        thumbnail: this.thumbnail,
        source: 'Local',
        stream: new URL(this.path, 'file://').href,
      },
    ]

    this.thumb = this.thumbnail
  }

  @BeforeInsert()
  @BeforeUpdate()
  async createThumbail() {
    if (this.imageData) {
      const thumbPath = path.resolve(LocalTrack.THUMBNAILS_DIR, this.hashThumbFilename())
      const existingThumb = await this.existCover(thumbPath)

      if (existingThumb) {
        this.thumbnail = existingThumb
      } else {
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;(await Jimp.read(this.imageData)).resize(192, 192).write(thumbPath)
      }

      delete this.imageData
      this.thumbnail = url.format({
        pathname: thumbPath,
        protocol: 'file:',
        slashes: true,
      })
    }
  }

  @AfterRemove()
  async removeThumbnail() {
    if (this.thumbnailPath) {
      try {
        await promisify(fs.access)(this.thumbnailPath, fs.constants.F_OK | fs.constants.W_OK)
        await promisify(fs.unlink)(this.thumbnailPath)
      } catch (err) {
        // do nothing
      }
    }
  }
}

export default LocalTrack
