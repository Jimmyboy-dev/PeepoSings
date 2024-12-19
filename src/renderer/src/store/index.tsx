import { configureStore } from '@reduxjs/toolkit'

import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { persistReducer, persistStore, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, PersistConfig } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import type { RootState } from './slices'
import rootReducer from './slices'
// ...
import { createLogger } from 'redux-logger'
import { electronMiddleware } from './middleware'
const logger = createLogger({
  collapsed: true,
  level: 'verbose',

  colors: {
    action: () => `#008080`,
    error: () => `#FF0000`,
    nextState: () => `#0000FF`,
    prevState: () => `#00FF00`,
    title: () => `#008080`,
  },
})

const persistConfig: PersistConfig<RootState> = {
  key: 'peepo-store',
  storage,
  throttle: 2500,
  blacklist: ['songs', 'moods'],
}
export const persistedReducer = persistReducer(persistConfig, rootReducer)

if (import.meta.hot) {
  import.meta.hot.accept('./slices', async () => {
    // This fetch the new state of the above reducers.
    const nextRootReducer = await import('./slices')
    store.replaceReducer(persistReducer(persistConfig, nextRootReducer.default))
  })
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      // immutableCheck: false,
    })
      .concat(logger)
      .prepend(electronMiddleware),
  devTools: import.meta.env.DEV,
})

export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
