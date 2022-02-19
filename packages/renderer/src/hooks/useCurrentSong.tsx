import React from "react"
import { Song } from "../store"
export const CurrentSongContext = React.createContext<{ song: Song; setSong: (song: string) => void }>({
  song: null,
  setSong: (song: string) => {},
})

export const CurrentSongProvider = (props: any) => {
  const [song, changeSong] = React.useState<Song>(null)
  const setSong = (song: string) => {
    window.electron.music.getSongs().then((songs) => {
      changeSong(songs.find((s) => s.title === song))
    })
  }
  React.useEffect(() => {
    const loadSong = async () => {
      const song = await window.electron.music.getLastSong()
      console.log("Last Song: ", song)

      changeSong(song)
    }
    loadSong()
  }, [])

  React.useEffect(() => {
    if (song) window.electron.music.setLastSong(song)
  }, [song])
  return <CurrentSongContext.Provider value={{ song, setSong }}>{props.children}</CurrentSongContext.Provider>
}
