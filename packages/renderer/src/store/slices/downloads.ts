import { createAction, createSlice, nanoid } from '@reduxjs/toolkit'
import _ from 'lodash'
import type { Track } from '@peeposings/shared'
import { getOption, store } from '@peeposings/shared'
import { Download as DownloadActionTypes } from './actions'
import { safeAddUuid } from '../helpers'

export const readDownloads = createAction(DownloadActionTypes.READ_DOWNLOADS, () => {
  const downloads: any = store.get('downloads')
  return {
    payload: downloads,
  }
})

export const addToDownloads = createAction(DownloadActionTypes.ADD_TO_DOWNLOADS, (prov, track: Track) => {
  const clonedTrack: TrackItem = safeAddUuid(getTrackItem(track))
  return {
    payload: track,
  }
})

type DownloadsState = DownloadInfo[]

const initialState: DownloadsState = []

const downloads = createSlice({
  name: 'downloads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(readDownloads, (state, action) => {
      state = action.payload
    })
  },
})
