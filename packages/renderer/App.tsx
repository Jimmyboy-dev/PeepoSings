import { Icon } from '@iconify/react'
import { ActionIcon, Box, Button, Col, Grid, Modal, Tabs } from '@mantine/core'
import type { ReactElement } from 'react'
import React, { useEffect } from 'react'
import AudioPlayer from './components/AudioPlayer'
import Music from './components/Music'
import TitleBar from './components/TitleBar'
import { updateNotification, useNotifications } from '@mantine/notifications'
import ContextMenus from './components/ContextMenus'
import { useAppDispatch, useAppSelector } from './store'
import { ipcRenderer } from 'electron-better-ipc'
import { IpcRendererEvent } from 'electron/renderer'
import { DownloadInfo, IpcEvents, PeepoMeta } from '@peepo/core'
import { addSong, fetchSongs, setSongs } from './store/slices/songs'
import { Progress } from 'yt-dlp-wrap'

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
  const [currentTab, setCurrentTab] = React.useState('songs')
  // const [joyrideSteps, setSteps] = React.useState<Step[]>([
  //   {
  //     target: "",
  //     content: "Welcome to Mantine! Click here to learn more about the app.",
  //     placement: "bottom",
  //   },
  // ])
  const dispatch = useAppDispatch()
  const notifications = useNotifications()
  useEffect(() => {
    dispatch(fetchSongs())
  }, [])
  useEffect(() => {
    const onDlProgress = (dl: { dlInfo: DownloadInfo; msg: string; raw: Progress }) => {
      const {
        artist,
        duration,
        title,
        thumbnails: [{ url: albumArt }],
        album,
      } = dl.dlInfo.vidInfo
      updateNotification({
        id: title,
        loading: true,
        title: `Downloading ${title}`,

        autoClose: true,
        message: dl.msg,
        icon: <Icon icon="fas:check" />,
      })
    }
    const onDlEnd = (dl: { path: string; dlInfo: DownloadInfo; song: PeepoMeta }) => {
      console.log('Download finished', dl)
      dispatch(addSong(dl.song))
      const {
        artist,
        duration,
        title,
        thumbnails: [{ url: albumArt }],
        album,
      } = dl.dlInfo.vidInfo
      updateNotification({
        id: title,
        loading: false,
        title: `Downloaded ${title}`,
        autoClose: true,
        message: 'Downloaded Finished!',
        icon: <Icon icon="fas:check" />,
        disallowClose: false,
      })
    }
    const onErr = (err: any) => {
      const {
        ownerChannelName: artist,
        lengthSeconds: duration,
        title,
        thumbnails: [{ url: albumArt }],
        media: { category: album },
      } = err.dlInfo.vidInfo.videoDetails
      console.log('Error:', err.err)
      updateNotification({
        id: err.title,
        loading: false,
        title: `Error Downloading ${err.title}`,
        autoClose: false,
        message: err.message,
        icon: <Icon icon="fas:times" color="red" />,
        disallowClose: false,
      })
    }
    const dlErrorListener = window.ipc.answerMain(IpcEvents.MUSIC_ERROR, onErr)
    const dlEndListener = ipc.answerMain(IpcEvents.MUSIC_FINISHED, onDlEnd)
    const dlProgressListener = ipc.answerMain(IpcEvents.MUSIC_PROGRESS, onDlProgress)
    return () => {
      dlErrorListener()
      dlEndListener()
      dlProgressListener()
    }
  }, [])

  return (
    <div id="main-page" className="flex flex-col items-stretch h-full w-full mb-32 mt-16 overflow-y-scroll overflow-x-hidden p-4 scroller" style={{ maxHeight: 'calc(100vh - 192px)' }}>
      <TitleBar currentTab={currentTab} onTabChange={setCurrentTab} />
      <Box className="w-full relative text-neutral-content m-0 h-full px-2">
        <Music currentTab={currentTab} />
        {import.meta.env.DEV && (
          <ActionIcon
            className="absolute top-0 left-2"
            variant="filled"
            onClick={() => {
              window.electron.music.openInEditor()
            }}>
            <Icon icon="fas:arrow-up-right-from-square" />
          </ActionIcon>
        )}
      </Box>
      <AudioPlayer />
      <ContextMenus />
    </div>
  )
}
