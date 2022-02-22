import { Icon } from "@iconify/react"
import { ActionIcon, Box, Button, Col, Grid, Modal, Tabs } from "@mantine/core"
import type { ReactElement } from "react"
import React, { useEffect } from "react"
import AudioPlayer from "./components/AudioPlayer"
import Music from "./components/Music"
import TitleBar from "./components/TitleBar"
import { setUpNotifications } from "reapop"
import { useAppDispatch, useAppSelector } from "./store"
import { addSong } from "./store/slices/songs"

// run this function when your application starts before creating any notifications

declare global {
  interface Window {
    media: MediaDevices
  }
  interface MediaDevices {
    selectAudioOutput: (options: { deviceId: string }) => Promise<{ deviceId: string }>
  }
}

export default function App(): ReactElement {
  const [currentTab, setCurrentTab] = React.useState("songs")
  const dispatch = useAppDispatch()
  useEffect(() => {
    setUpNotifications({
      defaultProps: {
        position: "top-center",
        dismissible: true,
      },
    })
    // const onDlEnd = (e, dl) => {
    //   console.log("Download finished", dl)
    //   const {
    //     ownerChannelName: artist,
    //     lengthSeconds: duration,
    //     title,
    //     thumbnails: [{ url: albumArt }],
    //     media: { category: album },
    //   } = dl.dlInfo.vidInfo.videoDetails
    //   dispatch(
    //     addSong({
    //       artist,
    //       duration: parseInt(duration),
    //       title,
    //       filePath: dl.path,
    //       metadata: dl.dlInfo.vidInfo.videoDetails,
    //       album,
    //       albumArt,
    //     })
    //   )
    // }
    // const dlEndListener = window.electron.listeners.onDownloadEnd(onDlEnd)
    // return () => {
    //   dlEndListener.removeListener("download-end", onDlEnd)
    // }
  }, [])

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
