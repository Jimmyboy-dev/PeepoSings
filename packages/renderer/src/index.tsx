import "./index.css"
import ReactDOM from "react-dom"
import React from "react"
import App from "./App"
import { MantineProvider } from "@mantine/core"
import theme from "./theme"
import gsap from "gsap"
import MotionPathPlugin from "gsap/MotionPathPlugin"
import { StoreProvider } from "./store"
gsap.registerPlugin(MotionPathPlugin)
// import isDev from "electron-is-dev"
// console.log(isDev ? "is Development" : "is Production")

if (
  !new (class {
    x: any
  })().hasOwnProperty("x")
)
  throw new Error("Transpiler is not configured correctly")

window.iconsLoaded.then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <MantineProvider withNormalizeCSS withGlobalStyles theme={theme}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </MantineProvider>
    </React.StrictMode>,
    document.getElementById("root")
  )
})
