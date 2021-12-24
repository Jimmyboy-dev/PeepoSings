import React from "react"
import { StateStore } from "../../store"

const store = window.electron.store

const useStore = (key: any) => {
  const [storeVal, setStoreVal] = React.useState(store.get(key))
  React.useEffect(() => {
    const unsub = store.onDidChange(key, (val) => setStoreVal(val))
    return () => {
      unsub()
    }
  })

  React.useEffect(() => {
    store.set(key, storeVal)
  }, [storeVal])
  return [storeVal, setStoreVal]
}

export default useStore
