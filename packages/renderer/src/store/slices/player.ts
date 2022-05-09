import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import Sound, { PluginState } from 'react-hifi'
import { getOption } from '@peeposings/shared'
interface PlayerState {
  playbackStatus: typeof Sound.status[keyof typeof Sound.status]
  playbackStreamLoading: boolean
  volume: number
  playbackProgress: number
  seek: number
  muted: boolean
}

const initialState: PlayerState = {
  playbackStatus: Sound.status.PAUSED,
  playbackStreamLoading: false,
  playbackProgress: 0,
  seek: 0,
  volume: getOption('volume'),
  muted: false,
}

const player = createSlice({
  name: 'player',
  initialState,
  reducers: {
    startPlayback(state) {
      state.playbackStatus = Sound.status.PLAYING
    },
    pausePlayback(state) {
      state.playbackStatus = Sound.status.PAUSED
    },
    updatePlaybackProgress(state, action: PayloadAction<{ progress: number; seek: number }>) {
      state.playbackProgress = action.payload.progress
      state.seek = action.payload.seek
    },
    updateSeek(state, action: PayloadAction<number>) {
      state.seek = action.payload
    },
    updateVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload
    },
    mute(state) {
      state.muted = true
    },
    unmute(state) {
      state.muted = false
    },
    updatePlaybackStreamLoading(state, action: PayloadAction<boolean>) {
      state.playbackStreamLoading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (str) => str.match(/(NEXT_SONG|PREVIOUS_SONG|SELECT_SONG)/),
      (state) => {
        state.playbackProgress = 0
        state.seek = 0
      }
    )
  },
})

export const { mute, pausePlayback, startPlayback, unmute, updatePlaybackProgress, updatePlaybackStreamLoading, updateSeek, updateVolume } = player.actions

export default player.reducer
