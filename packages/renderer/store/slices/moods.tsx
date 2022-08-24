import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { createSlice, nanoid } from '@reduxjs/toolkit'
import { IpcEvents, MoodJSON } from '@peepo/core'
import { fetchSongs } from './songs'

export const addMood = createAsyncThunk('moods/add-mood', async (mood: MoodJSON) => {
  const finalizedMood = (await ipc.callMain(IpcEvents.MOOD_ADD, mood)) as MoodJSON
  if (!finalizedMood) throw new Error('Failed to add mood')

  return finalizedMood
})

interface MoodsState {
  [key: string]: MoodJSON
}

const initialState: MoodsState = {}

const moods = createSlice({
  name: 'moods',
  initialState,
  reducers: {
    setMood: (state, action: PayloadAction<MoodJSON>) => {
      ipc.callMain(IpcEvents.DB_UPDATE, ['mood', { id: action.payload.id }, action.payload])
      state[action.payload.id] = action.payload
    },
    removeMood: (state, action: PayloadAction<number>) => {
      ipc.callMain(IpcEvents.DB_REMOVE, ['mood', { id: action.payload }, action.payload])
      delete state[action.payload]
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchSongs.fulfilled, (state, action) => {
      if (!action.payload.moods) return
      for (const mood of action.payload.moods) {
        state[mood.id] = mood
      }
    })
    builder.addCase(addMood.fulfilled, (state, action) => {
      state[action.payload.id] = action.payload
    })
  },
})

export const { setMood, removeMood } = moods.actions

export default moods.reducer
