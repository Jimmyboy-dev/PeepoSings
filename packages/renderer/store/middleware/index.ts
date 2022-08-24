import type { Middleware } from 'redux'
import type { RootState } from '../slices'
import { setCurrentSong } from '../slices/currentSong'
import { setCurrentTime, setPlaying } from '../slices/player'
import { IpcEvents, PeepoMeta } from '@peepo/core'
import { addSong } from '../slices/songs'

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
      if (song !== -1) curSong = mood ? songs.filter((s) => s.mood.includes(mood))[song] : songs[song]
      if (setCurrentSong.match(action)) {
        if (curSong) {
          ipc.callMain(IpcEvents.SONG_CHANGE, curSong)

          navigator.mediaSession.metadata = new MediaMetadata({
            title: curSong.title,
            artist: curSong.artist,
            album: curSong.album,
            artwork: curSong.thumbnail ? [{ src: curSong.thumbnail, type: 'image/png' }] : undefined,
          })
        } else {
          ipc.callMain(IpcEvents.SONG_CHANGE, curSong)
          navigator.mediaSession.metadata = null
        }
      } else if (setPlaying.match(action)) {
        navigator.mediaSession.playbackState = action.payload || !player.playing ? 'playing' : 'paused'
      } else if (setCurrentTime.match(action)) {
        if (curSong)
          navigator.mediaSession.setPositionState({
            duration: curSong.duration,
            playbackRate: 1,
            position: action.payload,
          })
      }

      // Do anything here: pass the action onwards with next(action),
      // or restart the pipeline with storeAPI.dispatch(action)
      // Can also use storeAPI.getState() here
    }
  }
}

export { electronMiddleware }
