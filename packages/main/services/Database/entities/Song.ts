import { SchemaRaw } from 'trilogy'
import { PeepoMeta } from '@peepo/core'
import { mood } from './Mood'

export const song = {
  id: 'increments' as 'increments',

  title: String,

  path: String,

  artist: String,

  duration: Number,

  album: String,

  thumbnail: String,

  favorite: Boolean,

  in: Number,
  out: Number,
  metadata: 'json' as 'json',

  mood: { type: Array },
}
