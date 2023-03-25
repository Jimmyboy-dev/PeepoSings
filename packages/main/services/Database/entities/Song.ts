import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import type { PeepoMeta, VideoInfo } from '@peepo/core'
import { Mood } from './Mood'

@Entity()
export class Song implements PeepoMeta {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true, unique: true })
  muid?: string

  @Column({ default: 0, type: 'integer' })
  position?: number

  @Column()
  title: string

  @Column({ unique: true })
  path: string

  @Column()
  artist: string

  @Column()
  duration: number

  @Column({ nullable: true })
  album?: string

  @Column()
  thumbnail: string

  @Column({ nullable: true })
  lastScanned?: number

  @Column({ default: false })
  favorite: boolean;

  @Column({ default: 0 })
  in: number

  @Column({ default: false })
  available: boolean

  @Column()
  out: number

  @Column('simple-json')
  metadata: VideoInfo

  @ManyToMany(() => Mood, (mood) => mood.songs)
  @JoinTable()
  mood: Mood[]
}
