import type { Middleware } from 'redux'
import type { RootState } from './slices'
import { setCurrentSong } from './slices/currentSong'
import player, { setCurrentTime, setPlaying } from './slices/player'
import { ipcRenderer } from 'electron-better-ipc'

// eslint-disable-next-line @typescript-eslint/ban-types
const electronMiddleware: Middleware<{}, RootState> = (storeAPI) => {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      next(action)
      const {
        songs,
        currentSong: { mood, song },
        player,
        config,
      } = storeAPI.getState()
      let curSong: SongJSON | undefined
      if (song !== -1) curSong = mood ? songs.filter((s) => s.mood.includes(mood))[song] : songs[song]
      if (setCurrentSong.match(action)) {
        if (curSong) {
          window.electron.ipc.trayTooltip(curSong)
          window.electron.ipc.onSong(curSong)
          if (config.scrobbler.connected) {
          }
          navigator.mediaSession.metadata = new MediaMetadata({
            title: curSong.title,
            artist: curSong.artist,
            album: curSong.album,
            artwork: curSong.albumArt ? [{ src: curSong.albumArt, sizes: '192x192', type: 'image/png' }] : undefined,
          })
        } else {
          window.electron.ipc.onSong(null)
          window.electron.ipc.trayTooltip(null)

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
