import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { AppDispatch } from ".."
import type { PeepoSingConfig } from "../../../../../types/store"

const initialState: PeepoSingConfig = {
  outputDevice: "default",
  autoPlay: true,
  runOnStartup: false,
  scrobblerKeys: { apiKey: "", apiSecret: "" },
}

const config = createSlice({
  name: "config",
  initialState,
  reducers: {
    setOutputDevice(state, action: PayloadAction<string>) {
      state.outputDevice = action.payload
    },
    setAutoPlay(state, action: PayloadAction<boolean>) {
      state.autoPlay = action.payload
    },
    toggleRunOnStartupFinished(state, action: PayloadAction<boolean>) {
      state.runOnStartup = action.payload
    },
    setScrobblerKeys(state, action: PayloadAction<{ apiKey: string; apiSecret: string }>) {
      state.scrobblerKeys = action.payload
    },
  },
})

export const { setOutputDevice, setAutoPlay, setScrobblerKeys, toggleRunOnStartupFinished } = config.actions

export const toggleRunOnStartup = async (dispatch: AppDispatch) => {
  try {
    const newVal = (await window.electron.misc.toggleAutoLaunch()) as boolean
    dispatch(toggleRunOnStartupFinished(newVal))
  } catch (e) {
    console.error(e)
  }
}

export default config.reducer
