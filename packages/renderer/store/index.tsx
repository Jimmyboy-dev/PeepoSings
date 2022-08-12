import { configureStore } from '@reduxjs/toolkit'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import type { RootState } from './slices'
import rootReducer from './slices'
// ...
import { createLogger } from 'redux-logger'
import { electronMiddleware } from './middleware'
const logger = createLogger({
  collapsed: true,
  level: 'debug',
  colors: {
    action: () => `#008080`,
    error: () => `#FF0000`,
    nextState: () => `#0000FF`,
    prevState: () => `#00FF00`,
    title: () => `#008080`,
  },
})

const persistConfig = {
  key: 'root',
  storage: window.electron.electronStorage,
  blacklist: ['currentSong'],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    })
      .concat(logger)
      .prepend(electronMiddleware),
  devTools: import.meta.env.DEV,
})

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
