import "./index.css"
import ReactDOM from "react-dom"
import React from "react"
import App from "./App"
import { MantineProvider } from "@mantine/core"
import theme from "./theme"
import gsap from "gsap"
import MotionPathPlugin from "gsap/MotionPathPlugin"
gsap.registerPlugin(MotionPathPlugin)
// import isDev from "electron-is-dev"
// console.log(isDev ? "is Development" : "is Production")

ReactDOM.render(
  <MantineProvider withNormalizeCSS withGlobalStyles theme={theme}>
    <App />
  </MantineProvider>,
  document.getElementById("root")
)
