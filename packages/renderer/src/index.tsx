import "./index.css";

import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import gsap from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import * as React from "react";
import { render } from "react-dom";
import { Provider as StoreProvider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import store from "./store";
import theme from "./theme";

Object.assign(console, window.logger.functions)

// import type { Step } from 'react-joyride'
// import Joyride from 'react-joyride'

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
    document.getElementById('root'),
    window.removeLoading
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
