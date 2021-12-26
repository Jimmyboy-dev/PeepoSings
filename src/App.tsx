import { Icon } from "@iconify/react"
import { ActionIcon, Button, Col, Grid, Modal } from "@mantine/core"
import React, { ReactElement } from "react"
import AudioPlayer from "./components/AudioPlayer"
import Music from "./components/Music"
import { CurrentSongProvider } from "./hooks/useCurrentSong"
import TitleBar from "./components/TitleBar"
import PeepoSings from "./components/PeepoSings"

interface Props {}

export default function App({}: Props): ReactElement {
  return (
    <CurrentSongProvider>
      <div className="flex flex-col items-stretch h-full w-full">
        <TitleBar />
        <Grid className="w-full relative text-neutral-content m-0 h-full px-2">
          <ActionIcon
            className="absolute top-18 left-2"
            variant="filled"
            onClick={(e) => {
              window.electron.music.openInEditor()
            }}>
            <Icon icon="fas:arrow-up-right-from-square" />
          </ActionIcon>
          <Col span={3}>{/* <Chat /> */}</Col>
          <Col span={6}>
            <Music />
          </Col>
          <PeepoSings />
        </Grid>
        <AudioPlayer />
      </div>
    </CurrentSongProvider>
  )
}
