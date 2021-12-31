import React, { ReactElement, useContext } from "react"
import { action, computed, makeAutoObservable, reaction, runInAction, toJS } from "mobx"
import { MoreVideoDetails, VideoDetails } from "ytdl-core"
import { configure } from "mobx"

configure({
  enforceActions: "observed",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true,
})

export const storeContext = React.createContext<RootStore | null>(null)

export class RootStore {
  musicStore: MusicStore
  moodStore: MoodStore
  constructor() {
    this.musicStore = new MusicStore(this)
    this.moodStore = new MoodStore(this)
  }
}

export class MusicStore {
  transportLayer: typeof window.electron.music
  isLoading = true
  songs: SongModel[] = []
  rootStore: RootStore
  moodStore: MoodStore

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { transportLayer: false })
    this.rootStore = rootStore
    this.moodStore = rootStore.moodStore
    this.transportLayer = window.electron.music
    window.electron.listeners.onMusicChange((e, songs) => {
      runInAction(() => {
        songs.forEach((song) => this.updateSongFromStore(song))
      })
    })

    window.electron.listeners.onDownloadProgress((e, progress) => {
      runInAction(() => {
        const song = this.songs.find((s) => s.filePath === progress.dlInfo.savePath)
        if (!song.downloading) song.downloading = true
        if (song)
          song.downloadProgress =
            progress.raw.frames / (parseInt(progress.dlInfo.vidInfo.videoDetails.lengthSeconds) * 60)
      })
    })

    window.electron.listeners.onDownloadEnd((e, info) => {
      runInAction(() => {
        const song = this.songs.find((s) => s.filePath === info.dlInfo.savePath)
        if (song) song.downloading = false
      })
    })

    this.loadMusic()
  }

  get lastSong(): SongModel | null {
    return this.songs.find((s) => s.isCurrentSong) || null
  }

  loadMusic() {
    this.isLoading = true
    this.transportLayer
      .getSongs()
      .then((songs) => {
        runInAction(() => {
          songs.forEach((song) => this.updateSongFromStore(song))
        })
        return this.transportLayer.getLastSong()
      })
      .then((song) => {
        runInAction(() => {
          let curSong: SongModel
          if (song) curSong = this.songs.find((s) => s.filePath === song.filePath)
          if (curSong) curSong.isCurrentSong = true
          this.isLoading = false
        })
      })
  }

  setCurrentSong(song: SongModel) {
    this.songs.forEach((song) => runInAction(() => (song.isCurrentSong = false)))
    if (!song) return
    song.isCurrentSong = true
  }

  updateSongFromStore(json: SongJSON) {
    let song = this.songs.find((s) => s.filePath === json.filePath)
    if (!song) {
      song = new SongModel(this)
      this.songs.push(song)
    }
    song.update(json)
  }
  // Creates a fresh Todo on the client and the server.
  addSong() {
    const song = new SongModel(this)
    this.songs.push(song)
    return song
  }

  // A Todo was somehow deleted, clean it from the client memory.
  removeSong(song: SongModel) {
    let json = song.asJson
    this.songs.splice(this.songs.indexOf(song), 1)
    this.transportLayer.removeSong(json.filePath, json.title)
    song.dispose()
  }
}

export class SongModel implements SongJSON {
  filePath: string = null
  title: string = null
  artist: string = null
  duration: number = null
  favorite: boolean = false
  downloading: boolean = false
  downloadProgress: number = 0
  mood?: Mood = null
  album?: string = null
  albumArt?: string = null
  isCurrentSong: boolean = false
  metadata: MakeAllOptional<MoreVideoDetails> = null
  store: MusicStore
  autoSave: boolean = true
  saveHandler: () => void = null

  constructor(store: MusicStore) {
    makeAutoObservable(this, {
      store: false,
      autoSave: false,
      saveHandler: false,
      dispose: false,
      asJson: computed,
      makeCurrent: action.bound,
    })

    this.store = store

    this.saveHandler = reaction(
      () => this.asJson, // Observe everything that is used in the JSON.
      (json) => {
        // If autoSave is true, send JSON to the server.
        if (this.autoSave) {
          this.store.transportLayer.saveSong(json)
        }
      }
    )
  }

  get asJson(): SongJSON {
    return {
      filePath: this.filePath,
      title: this.title,
      artist: this.artist,
      duration: this.duration,
      favorite: this.favorite,
      mood: this.mood ? this.mood.asJson : null,
      album: this.album,
      albumArt: this.albumArt,
      metadata: this.metadata,
    }
  }

  favoriteToggle() {
    this.favorite = !this.favorite
  }

  remove() {
    this.store.removeSong(this)
  }

  update(json: SongJSON) {
    this.autoSave = false // Prevent sending of our changes back to the server.
    this.filePath = json.filePath
    this.title = json.title
    this.artist = json.artist
    this.duration = json.duration
    this.favorite = json.favorite
    if (json.mood) this.mood = this.store.rootStore.moodStore.resolveMood(json.mood.name)
    this.album = json.album
    this.albumArt = json.albumArt
    this.metadata = json.metadata as MoreVideoDetails
    this.autoSave = true
  }

  makeCurrent() {
    this.store.setCurrentSong(this)
    let json = toJS(this.asJson)
    this.store.transportLayer.setLastSong(json)
  }

  setMood(mood: Mood) {
    this.mood = mood
  }

  dispose() {
    this.saveHandler()
  }
}

declare global {
  type Song = SongModel
}

class MoodStore {
  moods: Mood[] = []
  rootStore: RootStore

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false })
    this.rootStore = rootStore
  }

  resolveMood(name: string): Mood | undefined {
    return this.moods.find((m) => m.name === name)
  }
}
export class Mood {
  store: MoodStore
  name: string = ""
  constructor(name: string, store: MoodStore) {
    makeAutoObservable(this, { store: false })
    this.name = name
    this.store = store
  }

  get asJson(): MoodJSON {
    return {
      name: this.name,
    }
  }
}

export function StoreProvider(props: any): ReactElement {
  const store = new RootStore()
  return <storeContext.Provider value={store}>{props.children}</storeContext.Provider>
}

export const useStore = () => {
  const store = useContext(storeContext)
  if (!store) {
    throw new Error("StoreProvider not found")
  }
  return store
}
