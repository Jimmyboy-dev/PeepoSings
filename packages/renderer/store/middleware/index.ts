import type { Middleware } from 'redux'
import type { RootState } from '../slices'
import { nextSong, prevSong, setCurrentSong } from '../slices/currentSong'
import { setCurrentTime, setPlaying } from '../slices/player'
import { IpcEvents, PeepoMeta } from '@peepo/core'
import { addSong } from '../slices/songs'
import { clamp } from 'lodash'

// eslint-disable-next-line @typescript-eslint/ban-types
const electronMiddleware: Middleware<{}, RootState> = (storeAPI) => {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      switch (action?.type?.split('/')[0]) {
        case 'songs':
          break
        case 'player':
          break
        case 'currentSong':
          break

        case 'moods':
          break
      }
      next(action)
      const {
        songs,
        currentSong: { mood, song },
        player,
        config,
      } = storeAPI.getState()
      let curSong: PeepoMeta | undefined
      if (song !== -1) curSong = mood !== null ? songs.filter((s) => s.mood.includes(mood))[song] : songs[song]
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
      }

      // Do anything here: pass the action onwards with next(action),
      // or restart the pipeline with storeAPI.dispatch(action)
      // Can also use storeAPI.getState() here
    }
  }
}

export { electronMiddleware }
