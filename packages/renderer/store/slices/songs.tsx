import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { createSlice, nanoid } from '@reduxjs/toolkit'
import type { RootState } from '.'
import { IpcEvents, MoodJSON, PeepoMeta } from '@peepo/core'
import { removeMood } from './moods'

export const fetchSongs = createAsyncThunk('songs/fetch', async (songs, api) => {
  return (await ipc.callMain(IpcEvents.INITIAL_INFO)) as {
    songs: PeepoMeta[]
    moods?: MoodJSON[]
    settings: any
  }
})

// Define a type for the slice state
type SongsState = PeepoMeta[]

// Define the initial state using that type
const initialState: SongsState = []

export const musicSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    addSong(state, action: PayloadAction<Partial<PeepoMeta>>) {
      const { album, thumbnail, artist, duration, favorite, path, id, in: sIn, metadata, mood, out, title, lastScanned, muid, position } = action.payload
      const song: Partial<PeepoMeta> = {
        id: id,
        out: out || duration,
        in: sIn || 0,
        title: title || '',
        album: album || '',
        artist: artist || '',
        thumbnail: thumbnail || '',
        path: path || '',
        metadata: metadata || {},
        mood: mood || [],
        duration: duration || 0,
        favorite: favorite || false,
        lastScanned,
        position: position || state.length,
        muid: muid || nanoid(),
      }

      state.push(song as PeepoMeta)
    },
    removeSong(state, action: PayloadAction<PeepoMeta>) {
      state.splice(
        state.findIndex((s) => s.id === action.payload.id),
        1
      )
    },
    setSongs(state, action: PayloadAction<PeepoMeta[]>) {
      const songs = action.payload
      return songs
    },
    setSongMood(state, action: PayloadAction<{ songId: string; moodId: MoodJSON['id'] | MoodJSON['id'][] }>) {
      const songIndex = state.findIndex((val) => val.id === action.payload.songId)
      if (songIndex === -1) return
      if (action.payload.moodId instanceof Array) {
        state[songIndex].mood = action.payload.moodId
      } else state[songIndex].mood.push(action.payload.moodId)
      ipc.callMain(IpcEvents.MUSIC_MOOD, { song: state[songIndex].id, mood: state[songIndex].mood })
    },
    markIn(state, action: PayloadAction<{ index: number; in: number }>) {
      state[action.payload.index].in = action.payload.in
    },
    markOut(state, action: PayloadAction<{ index: number; out: number }>) {
      state[action.payload.index].out = action.payload.out
    },
    editSong(state, action: PayloadAction<PeepoMeta>) {
      const prevSong = state.findIndex((val, i) => action.payload.path === val.path)
      if (prevSong !== -1) {
        ipc.callMain(IpcEvents.DB_UPDATE, ['song', { id: state[prevSong].id }, action.payload])
      }
      state[prevSong] = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeMood, (state, action) => {
      state.forEach((song) => {
        if (song.mood.includes(action.payload)) {
          song.mood.splice(song.mood.indexOf(action.payload), 1)
          ipc.callMain(IpcEvents.MUSIC_MOOD, { song: song.id, mood: action.payload })
        }
      })
    })
    builder.addCase(fetchSongs.fulfilled, (state, action) => {
      return action.payload.songs
    })
  },
})

export const { addSong, editSong, removeSong, setSongs, markIn, markOut, setSongMood } = musicSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSongs = (state: RootState) => state.songs

export default musicSlice.reducer
