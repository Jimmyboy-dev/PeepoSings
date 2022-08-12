import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice, nanoid } from "@reduxjs/toolkit"

interface MoodsState {
  [key: string]: MoodJSON
}

const initialState: MoodsState = {}

const moods = createSlice({
  name: "moods",
  initialState,
  reducers: {
    addMood: (state, action: PayloadAction<MoodJSON>) => {
      if (!action.payload.id) {
        action.payload.id = nanoid(8)
      }
      state[action.payload.id] = action.payload
    },
    setMood: (state, action: PayloadAction<MoodJSON>) => {
      state[action.payload.id] = action.payload
    },
    removeMood: (state, action: PayloadAction<string>) => {
      delete state[action.payload]
    },
  },
})

export const { addMood, setMood, removeMood } = moods.actions

export default moods.reducer
