import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ipcRenderer } from 'electron-better-ipc'
import { getSession } from 'lastfm-typed/dist/interfaces/authInterface'
import { RootState } from '.'
import type { AppDispatch } from '..'
import type { PeepoSingConfig } from '../../../../types/store'

export const connectToLastFM = createAsyncThunk<any, void | string>('config/connectToLastFM', async (userToken, api) => {
  ipcRenderer.callMain('lastfm-login')
  return new Promise((resolve, reject) => {
    ipcRenderer.answerMain('lastfm-session', (session: getSession | null) => {
      resolve(session)
    })
  })
})

const initialState: PeepoSingConfig = {
  outputDevice: 'default',
  autoPlay: true,
  runOnStartup: false,
  scrobblerKeys: { apiKey: '', apiSecret: '' },
  scrobbler: {
    connected: false,
    userInfo: {},
    session: null,
  },
  compactSongView: false,
}

const config = createSlice({
  name: 'config',
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
    toggleCompactSongView(state, action?: PayloadAction<boolean | null>) {
      state.compactSongView = action?.payload || !state.compactSongView
    },
    setScrobblerKeys(state, action: PayloadAction<{ apiKey: string; apiSecret: string }>) {
      state.scrobblerKeys = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(connectToLastFM.fulfilled, (state, action) => {
      if (!state.scrobbler) {
        state.scrobbler = {
          connected: !!action.payload,
          userInfo: {},
          session: action.payload,
        }
      } else {
        state.scrobbler.connected = !!action.payload
        state.scrobbler.session = action.payload
      }
    })
  },
})

export const { setOutputDevice, setAutoPlay, setScrobblerKeys, toggleRunOnStartupFinished, toggleCompactSongView } = config.actions

export const toggleRunOnStartup = async (dispatch: AppDispatch) => {
  try {
    const newVal = (await window.electron.misc.toggleAutoLaunch()) as boolean
    dispatch(toggleRunOnStartupFinished(newVal))
  } catch (e) {
    console.error(e)
  }
}

export default config.reducer
