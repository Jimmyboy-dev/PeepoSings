import { SchemaRaw } from 'trilogy'
import { MoodJSON } from '../../../../core/src'
import { song } from './Song'

export const mood: SchemaRaw<MoodJSON> = {
  id: Number,

  name: String,

  color: { type: String, defaultTo: '#77ee77' },

  icon: String,
}
