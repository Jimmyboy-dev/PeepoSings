import type { Middleware } from 'redux'
import type { RootState } from '../slices'
import { clearQueue, nextSong, prevSong, queueSong, setCurrentMood, setCurrentSong } from '../slices/currentSong'
import { setCurrentTime, setPlaying, setRepeat, setShuffle } from '../slices/player'
import { IpcEvents, PeepoMeta } from '@peepo/core'
import { addSong, setSongMood } from '../slices/songs'
import { clamp } from 'lodash'

// eslint-disable-next-line @typescript-eslint/ban-types
const electronMiddleware: Middleware<{}, RootState> = (store) => {
  return function wrapDispatch(dispatch) {
    ipc.answerMain(IpcEvents.MUSIC_BACK, () => dispatch(prevSong()))
    ipc.answerMain(IpcEvents.PLAYPAUSE, () =>
      dispatch({
        type: 'player/setPlaying',
        payload: undefined,
      })
    )
    ipc.answerMain(IpcEvents.MUSIC_FORWARD, () => dispatch(nextSong()))
    return function handleAction(action) {
      switch (action?.type?.split('/')[0]) {
        case 'songs':
          break
        // case 'player':

        //   break
        case 'currentSong':
          break

        case 'moods':
          break
      }
      dispatch(action)
      const {
        songs,
        currentSong: { mood, song, queue },
        player,
        config,
      } = store.getState()

      if (action.type === 'player/setPlaying') ipc.callMain(action.payload ?? !player.playing ? IpcEvents.PLAY : IpcEvents.PAUSE)
      if (!queue) return
      let curSong: PeepoMeta | undefined
      if (song !== -1) curSong = songs.find((s) => s.id === song)
      if ([setCurrentSong, nextSong, prevSong].some((act) => act.match(action))) {
        if (curSong) {
          ipc.callMain(IpcEvents.SONG_CHANGE, curSong)

          navigator.mediaSession.metadata = new MediaMetadata({
            title: curSong.title,
            artist: curSong.artist,
            album: curSong.album,
            artwork: curSong.thumbnail ? [{ src: curSong.thumbnail, type: 'image/png' }] : undefined,
          })
        } else {
          ipc.callMain(IpcEvents.SONG_CHANGE, null)
          navigator.mediaSession.metadata = null
        }
      } else if (setPlaying.match(action)) {
        navigator.mediaSession.playbackState = !player.playing ? 'playing' : 'paused'
      } else if (setCurrentTime.match(action)) {
        if (curSong)
          navigator.mediaSession.setPositionState({
            duration: curSong.duration,
            playbackRate: 1,
            position: clamp(action.payload, 0, curSong.duration),
          })
      } else if (setCurrentMood.match(action)) {
        if (action.payload !== -1) {
          const nextSongs = songs.filter((s) => s.mood.some((m) => m.id === action.payload))
          if (!nextSongs.length) {
            store.dispatch(clearQueue())
            return
          }

          const nextSong = nextSongs[Math.floor(Math.random() * nextSongs.length)]
          store.dispatch(setCurrentSong(nextSong.id))
        }
      }

      if (queue.length < 5 && songs.length > 0) {
        const queueLength = queue.length
        const songsToAdd: number[] = []
        const songQueue = mood !== -1 ? songs.filter((s) => s.mood.map((m) => m.id).includes(mood) && !queue.includes(s.id)) : songs.filter((s) => !queue.includes(s.id))
        do {
          let nextSong: PeepoMeta
          if (player.repeat) {
            nextSong = curSong!
          } else if (player.shuffle) {
            const songs = songQueue.filter((s) => {
              if (s.id === song) return false
              if (s.id === nextSong?.id) return false
              if ([...songsToAdd, ...queue].includes(s?.id)) return false
              return true
            })
            if (!songs.length) {
              nextSong = songQueue.find((s) => s.id === song) ?? songQueue[0]
              break
            }
            nextSong = songs[Math.floor(Math.random() * songQueue.length)]
          } else {
            const curSongIndex = songQueue.findIndex((s) => s.id === song)
            nextSong = songQueue[curSongIndex + queueLength + songsToAdd.length + 1] || songQueue[0]
          }
          if (nextSong) songsToAdd.push(nextSong.id)
          else break
        } while (songsToAdd.length < 5 - queueLength)
        dispatch(queueSong(songsToAdd))
      }
      if ([setShuffle, setRepeat].some((act) => act.match(action))) {
        dispatch(clearQueue())
      }

      // Do anything here: pass the action onwards with next(action),
      // or restart the pipeline with storeAPI.dispatch(action)
      // Can also use storeAPI.getState() here
    }
  }
}

export { electronMiddleware }
