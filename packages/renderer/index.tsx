import './index.css'
import { createRoot } from 'react-dom/client'
import * as React from 'react'
import App from './App'
// import type { Step } from 'react-joyride'
// import Joyride from 'react-joyride'
import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import store, { useAppSelector } from './store'
import { Provider as StoreProvider } from 'react-redux'
import theme from './theme'
import gsap from 'gsap'
import MotionPathPlugin from 'gsap/MotionPathPlugin'
// import { persistStore } from 'redux-persist'
// import { PersistGate } from 'redux-persist/integration/react'
import KBarProvider from './components/KBar'
import { ModalsProvider } from '@mantine/modals'
// import unhandled from 'electron-unhandled'
// unhandled({})

gsap.registerPlugin(MotionPathPlugin)

// const persistor = persistStore(store)

const Root = () => {
  const currentMood = useAppSelector((state) => state.currentSong.mood)
  // 1. Retrieve the notifications to display.
  return (
    <NotificationsProvider limit={5} position="bottom-right" style={{ bottom: currentMood ? 200 : 142 }}>
      <App />
    </NotificationsProvider>
  )
}
const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <MantineProvider withNormalizeCSS withGlobalStyles theme={theme}>
        <ModalsProvider>
          <KBarProvider>
            <Root />
          </KBarProvider>
        </ModalsProvider>
      </MantineProvider>
      {/* </PersistGate> */}
    </StoreProvider>
  </React.StrictMode>
)
