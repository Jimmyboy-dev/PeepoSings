import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { createSlice, nanoid } from '@reduxjs/toolkit'
import { IpcEvents, MoodJSON } from '@peepo/core'
import { fetchSongs } from './songs'

export const addMood = createAsyncThunk('moods/add-mood', async (mood: MoodJSON) => {
  const finalizedMood = (await ipc.callMain(IpcEvents.MOOD_ADD, mood)) as MoodJSON
  if (!finalizedMood) throw new Error('Failed to add mood')

  return finalizedMood
})

export const setMood = createAsyncThunk('moods/set-mood', async (mood: MoodJSON) => {
  const finalizedMood = (await ipc.callMain(IpcEvents.DB_UPDATE, ['mood', { id: mood.id }, mood])) as MoodJSON
  if (!finalizedMood) throw new Error('Failed to add mood')

  return finalizedMood
})

type MoodsState = MoodJSON[]

const initialState: MoodsState = []

const moods = createSlice({
  name: 'moods',
  initialState,
  reducers: {
    removeMood: (state, action: PayloadAction<number>) => {
      ipc.callMain(IpcEvents.DB_REMOVE, ['mood', { id: action.payload }, action.payload])
      state.splice(
        state.findIndex((m) => m.id === action.payload),
        1
      )
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchSongs.fulfilled, (state, action) => {
      if (!action.payload.moods) return
      for (const mood of action.payload.moods) {
        if (state.find((m) => m.id === mood.id)) continue
        state.push(mood)
      }
    })
    builder.addCase(addMood.fulfilled, (state, action) => {
      const index = state.findIndex((m) => m.id === action.payload.id)
      if (index === -1) state.push(action.payload)
    })
    builder.addCase(setMood.fulfilled, (state, action) => {
      if (!action.payload) return
      const index = state.findIndex((m) => m.id === action.payload.id)
      state[index] = action.payload
    })
  },
})

export const { removeMood } = moods.actions

export default moods.reducer
