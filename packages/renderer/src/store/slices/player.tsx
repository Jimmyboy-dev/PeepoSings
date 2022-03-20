import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface PlayerState {
  shuffle: boolean
  repeat: boolean
  volume: number
  duration: number
  currentTime: number
  playing: boolean
  filter: {
    mood: string
    sort: {
      type: string
      order: 'asc' | 'desc'
    }
  }
}

const initialState: PlayerState = {
  shuffle: false,
  repeat: false,
  volume: 1,
  duration: 0,
  currentTime: 0,
  playing: false,
  filter: {
    mood: '',
    sort: {
      type: 'name',
      order: 'asc',
    },
  },
}

const player = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setShuffle(state) {
      state.shuffle = !state.shuffle
    },
    setRepeat(state) {
      state.repeat = !state.repeat
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload
    },
    setDuration(state, action: PayloadAction<number>) {
      state.duration = action.payload
    },
    setCurrentTime(state, action: PayloadAction<number>) {
      state.currentTime = action.payload
    },
    setPlaying(state, action?: PayloadAction<boolean | undefined>) {
      if (action?.payload !== undefined) state.playing = action.payload
      else state.playing = !state.playing
    },
  },
})

export const { setCurrentTime, setDuration, setPlaying, setShuffle, setRepeat, setVolume } = player.actions

export default player.reducer
