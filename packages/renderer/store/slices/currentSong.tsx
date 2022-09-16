import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '.'
import { removeMood } from './moods'
import { setRepeat, setShuffle } from './player'

// Define a type for the slice state
interface SongsState {
  song: number
  queue: number[]
  userDefinedQueue: number[]
  history: number[]
  mood: number
}

// Define the initial state using that type
const initialState: SongsState = { song: -1, history: [], userDefinedQueue: [], queue: [], mood: -1 }

export const currentSongSlice = createSlice({
  name: 'currentSong',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    nextSong(state) {
      if (state.song !== -1) state.history.push(state.song)
      state.song = state.userDefinedQueue.shift() || state.queue.shift() || -1
      if (state.history.length > 25) state.history.shift()
    },
    prevSong(state) {
      state.queue.unshift(state.song)
      state.song = state.history.pop() || -1
    },
    addUpNext(state, action: PayloadAction<number>) {
      state.userDefinedQueue.push(action.payload)
    },
    queueSong(state, action: PayloadAction<number | number[]>) {
      state.queue.push(...[action.payload].flat())
    },
    clearQueue(state) {
      state.queue = []
    },
    setCurrentSong(state, action: PayloadAction<number>) {
      if (state.song !== -1) state.history.push(state.song)

      state.song = action.payload
      const index = state.queue.findIndex((val) => val === action.payload)
      if (index !== -1) state.queue.splice(index, 1)
    },
    setCurrentMood(state, action: PayloadAction<number>) {
      if (!action.payload) return
      state.mood = action.payload
      state.queue = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeMood, (state, action) => {
      if (state.mood === action.payload) {
        state.mood = -1
        state.song = -1
      }
    })
  },
})

export const { nextSong, prevSong, setCurrentSong, setCurrentMood, addUpNext, queueSong, clearQueue } = currentSongSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentSong = (state: RootState) => state.songs.find((v) => state.currentSong.song === v.id)

export default currentSongSlice.reducer
