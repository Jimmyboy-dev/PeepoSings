import { Icon } from "@iconify/react"
import { ActionIcon, Box, Button, Col, Grid, Modal, Tabs } from "@mantine/core"
import React, { ReactElement, useCallback } from "react"
import AudioPlayer from "./components/AudioPlayer"
import Music from "./components/Music"
import { CurrentSongProvider } from "./lib/useCurrentSong
import TitleBar from "./components/TitleBar"
import PeepoSings from "./components/PeepoSings"

interface Props {}

export default function App({}: Props): ReactElement {
  const [currentTab, setCurrentTab] = React.useState("songs")

  // App shortcuts (not using Electron's global shortcuts API to avoid conflicts
  // with other applications)
  const onKey = useCallback(
    async (e: KeyboardEvent) => {
      switch (e.key) {
        case ' ':
          e.preventDefault();
          e.stopPropagation();
          if(Player.isPaused())
            await Player.play();
          else
            await Player.pause();
          break;
        case ',':
          if (isCtrlKey(e)) {
            e.preventDefault();
            e.stopPropagation();
            navigate('/settings');
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          e.stopPropagation();
          PlayerActions.jumpTo(Player.getCurrentTime() - 10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          e.stopPropagation();
          PlayerActions.jumpTo(Player.getCurrentTime() + 10);
          break;
        default:
          break;
      }
    },
    []
  );

  return (
    <div
      id="main-page"
      className="flex flex-col items-stretch h-full w-full mb-32 mt-16 overflow-y-scroll overflow-x-hidden p-4 scroller"
      style={{ maxHeight: "calc(100vh - 192px)" }}>
            <KeyBinding onKey={onKey} preventInputConflict />
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
