import { Center, Title } from "@mantine/core"
import { useBooleanToggle } from "@mantine/hooks"
import { useEffect } from "react"
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom"
import PeepoSings from "./components/PeepoSings"
import DownloadPage from "./pages/DownloadPage"
import Home from "./pages/Home"

function App() {
  const [talking, setTalking] = useBooleanToggle(false)
  useEffect(() => setTalking(true), [])
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route index element={<Home />} />
          <Route path="download" element={<DownloadPage />} />

          <Route
            path="*"
            element={
              <Center className="w-screen h-screen">
                <Title order={1}>404</Title>
              </Center>
            }
          />
        </Routes>
        <div className="fixed bottom-0 left-8">
          <PeepoSings talk={talking} />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
