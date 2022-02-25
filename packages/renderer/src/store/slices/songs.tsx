import type { PayloadAction } from "@reduxjs/toolkit"
import { createAction, createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import type { RootState } from ".."
import { removeMood } from "./moods"

// const fetchSongs = createAction("songs/fetch", (songs: SongJSON[]) => ({ payload: songs }))

// Define a type for the slice state
type SongsState = SongJSON[]

// Define the initial state using that type
const initialState: SongsState = []

export const musicSlice = createSlice({
  name: "songs",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addSong(state, action: PayloadAction<Partial<SongJSON>>) {
      const {
        album,
        albumArt,
        artist,
        duration,
        favorite,
        filePath,
        id,
        in: sIn,
        metadata,
        mood,
        out,
        title,
      } = action.payload
      const song: Partial<SongJSON> = {
        id: id || nanoid(8),
        out: out || duration,
        in: sIn || 0,
        title: title || "",
        album: album || "",
        artist: artist || "",
        albumArt: albumArt || "",
        filePath: filePath || "",
        metadata: metadata || {},
        mood: mood || [],
        duration: duration || 0,
        favorite: favorite || false,
      }

      state.push(song as SongJSON)
    },
    removeSong(state, action: PayloadAction<SongJSON>) {
      state.splice(state.indexOf(action.payload), 1)
    },
    setSongs(state, action: PayloadAction<SongJSON[]>) {
      const songs = action.payload
      songs.forEach((song, i) => {
        if (!song.id) songs[i].id = nanoid(8)
      })
      return songs
    },
    setSongMood(state, action: PayloadAction<{ songId: string; moodId: MoodJSON["id"] | MoodJSON["id"][] }>) {
      const songIndex = state.findIndex((val) => val.id === action.payload.songId)
      if (action.payload.moodId instanceof Array) {
        state[songIndex].mood = action.payload.moodId
      } else state[songIndex].mood.push(action.payload.moodId)
    },
    markIn(state, action: PayloadAction<{ index: number; in: number }>) {
      state[action.payload.index].in = action.payload.in
    },
    markOut(state, action: PayloadAction<{ index: number; out: number }>) {
      state[action.payload.index].out = action.payload.out
    },
    editSong(state, action: PayloadAction<SongJSON>) {
      const prevSong = state.findIndex((val, i) => action.payload.filePath === val.filePath)
      state[prevSong] = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeMood, (state, action) => {
      state.forEach((song) => {
        if (song.mood.includes(action.payload)) {
          song.mood.splice(song.mood.indexOf(action.payload), 1)
        }
      })
    })
  },
})

export const { addSong, editSong, removeSong, setSongs, markIn, markOut, setSongMood } = musicSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSongs = (state: RootState) => state.songs

export default musicSlice.reducer
