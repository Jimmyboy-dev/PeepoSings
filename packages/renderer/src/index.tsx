import './index.css'
import { render } from 'react-dom'
import * as React from 'react'
import App from './App'
// import type { Step } from 'react-joyride'
// import Joyride from 'react-joyride'
import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import store from './store'
import { Provider as StoreProvider } from 'react-redux'
import theme from './theme'
import gsap from 'gsap'
import MotionPathPlugin from 'gsap/MotionPathPlugin'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

gsap.registerPlugin(MotionPathPlugin)

const persistor = persistStore(store)

window.iconsLoaded.then(() => {
  render(
    <React.StrictMode>
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MantineProvider withNormalizeCSS withGlobalStyles theme={theme}>
            <Root />
          </MantineProvider>
        </PersistGate>
      </StoreProvider>
    </React.StrictMode>,
    document.getElementById('root')
  )
})

const Root = () => {
  // 1. Retrieve the notifications to display.
  return (
    <NotificationsProvider limit={5}>
      <App />
    </NotificationsProvider>
  )
}
