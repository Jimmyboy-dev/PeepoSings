import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { createLogger } from "redux-logger";
import { FLUSH, PAUSE, PERSIST, PersistConfig, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist";

import { electronMiddleware } from "./middleware";
import rootReducer from "./slices";
import { setCurrentTime } from "./slices/player";

import type { AnyAction } from 'redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from './slices'
// ...
const logger = createLogger({
  collapsed: true,
  timestamp: false,

  level: 'info',
  colors: {
    action: () => `#008080`,
    error: () => `#FF0000`,
    nextState: () => `#0000FF`,
    prevState: () => `#00FF00`,
    title: () => `#008080`,
  },
  predicate: (getState: () => RootState, action: AnyAction) => {
    if (setCurrentTime.match(action)) return false
    if (action.type?.startsWith('persist')) return false
    return true
  },
})

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage: window.store.electronStorage,
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
