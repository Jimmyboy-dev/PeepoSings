import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { MantineProvider } from "@mantine/core"
import theme from "./util/theme"

ReactDOM.render(
  <MantineProvider withNormalizeCSS withGlobalStyles theme={theme}>
    <App />
  </MantineProvider>,
  document.getElementById("root")
)
