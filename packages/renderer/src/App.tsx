import { Icon } from "@iconify/react"
import { ActionIcon, Box, Button, Col, Grid, Modal, Tabs } from "@mantine/core"
import React, { ReactElement } from "react"
import AudioPlayer from "./components/AudioPlayer"
import Music from "./components/Music"
import { CurrentSongProvider } from "./hooks/useCurrentSong"
import TitleBar from "./components/TitleBar"
import PeepoSings from "./components/PeepoSings"

interface Props {}

export default function App({}: Props): ReactElement {
  const [currentTab, setCurrentTab] = React.useState("songs")

  return (
    <div
      id="main-page"
      className="flex flex-col items-stretch h-full w-full mb-32 mt-16 overflow-y-scroll overflow-x-hidden p-4 scroller"
      style={{ maxHeight: "calc(100vh - 192px)" }}>
      <TitleBar currentTab={currentTab} onTabChange={setCurrentTab} />
      <Box className="w-full relative text-neutral-content m-0 h-full px-2">
        <Music currentTab={currentTab} />
        <ActionIcon
          className="absolute top-0 left-2"
          variant="filled"
          onClick={() => {
            window.electron.music.openInEditor()
          }}>
          <Icon icon="fas:arrow-up-right-from-square" />
        </ActionIcon>
      </Box>
      <AudioPlayer />
    </div>
  )
}
