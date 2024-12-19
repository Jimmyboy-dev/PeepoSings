import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { ipcRenderer } from 'electron-better-ipc'
import { getSession } from 'lastfm-typed/dist/interfaces/authInterface'
// import { RootState } from '.'
import type { AppDispatch } from '..'
import { IpcEvents, PeepoSingConfig } from '@peepo/core'
import { fetchSongs } from './songs'

export const connectToLastFM = createAsyncThunk<any, void | string>('config/connectToLastFM', async (userToken, api) => {
  ipc.callMain('lastfm-login')
  return new Promise((resolve, reject) => {
    const unlisten = ipc.answerMain('lastfm-session', (session: getSession | null) => {
      resolve(session)
      unlisten()
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
    userInfo: undefined,
    session: null,
  },
  compactSongView: false,
  advancedOptions: false,
  hooks: {
    onSongChange: [],
    onTimeChange: [],
  },
}

const config = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setOutputDevice(state, action: PayloadAction<string>) {
      state.outputDevice = action.payload
      ipc.callMain(IpcEvents.SET_OPTION, ['outputDevice', action.payload])
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
    toggleAdvancedOptions(state, action?: PayloadAction<boolean | null>) {
      ipc.callMain(IpcEvents.SET_OPTION_SENSITIVE, ['advancedOptions', action?.payload || !state.advancedOptions])
      state.advancedOptions = action?.payload || !state.advancedOptions
    },
  },
  extraReducers: (builder) => {
    builder.addCase(connectToLastFM.fulfilled, (state, action) => {
      if (!state.scrobbler) {
        state.scrobbler = {
          connected: !!action.payload,
          // userInfo: undefined,
          session: action.payload,
        }
      } else {
        state.scrobbler.connected = !!action.payload
        state.scrobbler.session = action.payload
      }
    })
    builder.addCase(fetchSongs.fulfilled, (state, action) => {
      // if (!action.payload.moods) return

      const stateKeys = Object.keys(state)
      console.log('Received config keys:')
      console.dir(action.payload)

      for (const setting of stateKeys) {
        switch (setting) {
          case 'outputDevice':
            state.outputDevice = action.payload.settings.outputDevice
            break
          case 'autoPlay':
            break
          case 'runOnStartup':
            state.runOnStartup = action.payload.settings.runOnStartup
            break
          case 'compactSongView':
            break
          case 'scrobbler':
            state.scrobbler.session = action.payload.settings.lastfm?.session
            state.scrobbler.connected = !!action.payload.settings.lastfm?.session
            break
          case 'advancedOptions':
            state.advancedOptions = action.payload.settings.advancedOptions
            break
          case 'hooks':
            state.hooks = action.payload.settings.hooks
            break
        }
      }
    })
  },
})

export const { setOutputDevice, setAutoPlay, setScrobblerKeys, toggleRunOnStartupFinished, toggleCompactSongView, toggleAdvancedOptions } = config.actions

export const toggleRunOnStartup = async (dispatch: AppDispatch) => {
  try {
    const newVal = (await window.electron.misc.toggleAutoLaunch()) as boolean
    dispatch(toggleRunOnStartupFinished(newVal))
  } catch (e) {
    console.error(e)
  }
}

export default config.reducer
