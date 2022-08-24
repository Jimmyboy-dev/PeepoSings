import { createMigrate, MigrationManifest, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import { RootState } from './slices'

const migrations: MigrationManifest = {
  0: (state) => {
    const rootState = state as unknown as RootState
    console.log(rootState)
    // migration clear out device state
    return {
      ...state,
      device: undefined,
    }
  },
  1: (state) => {
    // migration to keep only device state
    return {
      ...state,
    }
  },
}
