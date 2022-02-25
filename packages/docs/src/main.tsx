import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { MantineProvider } from "@mantine/core"
import theme from "./util/theme"

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider withNormalizeCSS withGlobalStyles theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
