import { ActionIcon, Center, Title } from "@mantine/core"
import { useBooleanToggle } from "@mantine/hooks"
import { useEffect } from "react"
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"
import PeepoSings from "./components/PeepoSings"
import DownloadPage from "./pages/DownloadPage"
import Home from "./pages/Home"
import { Icon } from "@iconify/react"

function App() {
  const [talking, setTalking] = useBooleanToggle(false)
  useEffect(() => setTalking(true), [])
  return (
    <>
      <Helmet titleTemplate="Peepo Sings - %s">
        <title>Home</title>
      </Helmet>
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
          <PeepoSings talk={talking} />
        </div>
      </BrowserRouter>
      <div className="fixed bottom-8 right-8">
        <ActionIcon
          component="a"
          href="https://github.com/Jimmyboy-dev/PeepoSings"
          target="_blank"
          variant="light"
          className="h-16 w-16 rounded-2xl transition-colors">
          <Icon className="hover:text-blue-300 transition-colors" fontSize={48} icon="fab:github" />
        </ActionIcon>
      </div>
    </>
  )
}

export default App
