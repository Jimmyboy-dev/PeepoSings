import type { Middleware } from "redux"
import type { RootState } from "./slices"
import { setCurrentSong } from "./slices/currentSong"
// eslint-disable-next-line @typescript-eslint/ban-types
const electronMiddleware: Middleware<{}, RootState> = (storeAPI) => {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      if (setCurrentSong.match(action)) {
        const { songs, currentSong: { mood, song } } = storeAPI.getState()
        if (song !== -1) {
          const curSong = mood ? songs.filter(s => s.mood.includes(mood))[song] : songs[song]
          window.electron.ipc.trayTooltip(curSong)
        }
        else {
          window.electron.ipc.trayTooltip(null)

        }
      }
      // Do anything here: pass the action onwards with next(action),
      // or restart the pipeline with storeAPI.dispatch(action)
      // Can also use storeAPI.getState() here

      return next(action)
    }
  }
}

export { electronMiddleware }