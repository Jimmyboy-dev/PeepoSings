import './index.css'
import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './App'
// import type { Step } from 'react-joyride'
// import Joyride from 'react-joyride'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { useAppSelector, store, persistor } from './store'
import { Provider as StoreProvider } from 'react-redux'
import theme from './theme'
import gsap from 'gsap'
import MotionPathPlugin from 'gsap/MotionPathPlugin'
// import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { ModalsProvider } from '@mantine/modals'
import Spotlight from './components/Spotlight'

// import unhandled from 'electron-unhandled'
// unhandled({})

gsap.registerPlugin(MotionPathPlugin)

const Root = () => {
  const currentMood = useAppSelector((state) => state.currentSong.mood)
  // 1. Retrieve the notifications to display.
  return (
    <>
      <Notifications limit={5} position="bottom-right" style={{ bottom: currentMood ? 200 : 142 }} zIndex={99999} />
      <ModalsProvider
        modalProps={{
          classNames: {
            header: 'winDrag',
            close: 'noDrag',
          },
          zIndex: 99998,
          styles: { overlay: { zIndex: 11111 } },
        }}>
        {/* <Spotlight> */}
        <App />
        {/* </Spotlight> */}
      </ModalsProvider>
    </>
  )
}
const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MantineProvider withNormalizeCSS withGlobalStyles theme={theme}>
          <Root />
        </MantineProvider>
      </PersistGate>
    </StoreProvider>
  </React.StrictMode>
)
