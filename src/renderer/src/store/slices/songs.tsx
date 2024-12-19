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

export const setSongMood = createAsyncThunk<PeepoMeta, { songId: number; moodId: number | number[] }>('songs/setMood', async (payload, api) => {
  const newSong = await ipc.callMain(IpcEvents.MUSIC_MOOD, { song: payload.songId, mood: payload.moodId }).catch((err) => {
    console.error(err)
  })
  return newSong as PeepoMeta
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
      console.log('Adding song:', song)

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
        const moodIndex = song.mood.findIndex((s) => s.id === action.payload)
        if (moodIndex !== -1) {
          song.mood.splice(moodIndex, 1)
          ipc.callMain(IpcEvents.MUSIC_MOOD, { song: song.id, mood: action.payload })
        }
      })
    })
    builder.addCase(fetchSongs.fulfilled, (state, action) => {
      return action.payload.songs
    })
    builder.addCase(setSongMood.fulfilled, (state, action) => {
      const songIndex = state.findIndex((val) => val.id === action.payload.id)
      if (songIndex === -1) return
      console.log('setSongMood', action.payload)
      state[songIndex] = action.payload
    })
  },
})

export const { addSong, editSong, removeSong, setSongs, markIn, markOut } = musicSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSongs = (state: RootState) => state.songs

export default musicSlice.reducer
