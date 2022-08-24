import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '.'
import { removeMood } from './moods'

// Define a type for the slice state
interface SongsState {
  song: number
  history: number[]
  mood: number | null
}

// Define the initial state using that type
const initialState: SongsState = { song: -1, history: [], mood: null }

export const currentSongSlice = createSlice({
  name: 'currentSong',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    nextSong(state) {
      state.song += 1
      state.history.push(state.song)
    },
    prevSong(state) {
      state.song = state.history.pop() || -1
    },

    setCurrentSong(state, action: PayloadAction<number>) {
      state.song = action.payload
      state.history.push(state.song)
    },
    setCurrentMood(state, action: PayloadAction<number | null>) {
      state.mood = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeMood, (state, action) => {
      if (state.mood === action.payload) {
        state.mood = null
        state.song = -1
      }
    })
  },
})

export const { nextSong, prevSong, setCurrentSong, setCurrentMood } = currentSongSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentSong = (state: RootState) => state.songs.filter((v) => (state.currentSong.mood ? v.mood.includes(state.currentSong.mood) : true))[state.currentSong.song]

export default currentSongSlice.reducer
