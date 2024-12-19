import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { MoodJSON } from '@peepo/core'
import { Song } from './Song'

@Entity()
export class Mood implements MoodJSON {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ default: '#77ee77', length: 7 })
  color: string

  @Column({ default: 'fas:music-note' })
  icon: string

  @Column({ default: false })
  order: number

  @ManyToMany(() => Song, (song) => song.mood)
  songs: Song[]
}
