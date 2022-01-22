import React, { ReactElement, useContext, useEffect, useState } from "react"
import { MoreVideoDetails, VideoDetails } from "ytdl-core"
export const musicContext = React.createContext<MusicCtx>(null)

export interface MusicCtx {
  currentSong: SongJSON
  setCurrentSong: (song: SongJSON) => void
  currentSongIndex: number
  songs: SongJSON[]
  removeSong: (song: SongJSON) => void
}

export function MusicProvider(props: any): ReactElement {
  const [currentSong, setCurrentSong] = useState<SongJSON>(null)
  const [songs, setSongs] = useState<SongJSON[]>([])
  const [currSongInd, setInd] = useState<number>(currentSong ? songs.indexOf(currentSong) : -1)

  const removeSong = (song: SongJSON) => {
    window.electron.music.removeSong(song.filePath, song.title)
  }

  useEffect(() => {
    const listeners = []

    window.electron.music.getSongs().then((songs) => {
      setSongs(songs)
    })

    listeners.push(
      window.electron.listeners.onMusicChange((e, songs) => {
        setSongs(songs)
        if (currentSong) {
          setCurrentSong(songs[currSongInd])
        }
      })
    )

    return () => {
      listeners.forEach((l) => l())
    }
  }, [])

  useEffect(() => {
    if (currentSong) {
      window.electron.music.setLastSong(currentSong)
      setInd(songs.indexOf(currentSong))
    } else {
      setInd(-1)
    }
  }, [currentSong])

  return (
    <musicContext.Provider value={{ currentSong, currentSongIndex: currSongInd, setCurrentSong, songs, removeSong }}>
      {props.children}
    </musicContext.Provider>
  )
}

export const useMusic = () => {
  const music = useContext(musicContext)
  if (!music) {
    throw new Error("MusicProvider not found")
  }
  return music
}

export const useSong = (songID: SongJSON) => {
  const { songs } = useMusic()
  if (!songs) {
    throw new Error("MusicProvider not found")
  }
  const setSong = (song: SongJSON) => {
    const ind = songs.indexOf(songs.find((s) => s.filePath === song.filePath))
    if (ind !== -1) {
      window.electron.music.saveSong(song)
    }
  }
  const song = songs.find((s) => s.filePath === songID.filePath)
  return [song, setSong]
}
export const useConfig = function <T, Initial>(path: string, initial: Initial): [T | Initial, (newValue: T) => void] {
  const [value, setValue] = useState<T | Initial>(initial)
  useEffect(() => {
    window.electron.config.get().then((res) => {
      setValue(res[path])
    })
  }, [])

  useEffect(() => {
    if (value !== initial) window.electron.config.set(path, value)
  }, [value])

  useEffect(() => {
    let l = window.electron.listeners.onConfigChange((res) => {
      setValue(res[path])
    })
    return l
  }, [])

  return [value, setValue]
}
