import { combineReducers } from '@reduxjs/toolkit'
import config from './config'
import currentSong from './currentSong'
import player from './player'
import songs from './songs'
import moods from './moods'

const rootReducer = combineReducers({
  songs,
  moods,
  currentSong,
  player,
  config,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
