// import React from 'react'
import 'react-contexify/dist/ReactContexify.css'
import { Menu, Item } from 'react-contexify'
// import { notifications } from '@mantine/notifications'
import { openModal, modals } from '@mantine/modals'
import PreviewVideo from './PreviewVideo'
import { Title } from '@mantine/core'
import { useAppDispatch } from '../store'
import { addUpNext } from '../store/slices/currentSong'

export const CTX_MENU = {
  RESULTS: 'search-results',
  SONG: 'song-view',
  MOOD: 'mood-view',
}
type Props = {}
export const showPreviewSongModal = ({ url, title }: { url: string; title: string }) => {
  openModal({
    children: <PreviewVideo video={url} />,
    title: (
      <Title style={{}} className="text-xl font-bold">
        Previewing - "<span className="text-green-600">{title}</span>"
      </Title>
    ),
    styles: {
      body: {
        width: '75vw',
      },
    },
  })
}
export default function ContextMenus({}: Props) {
  // const moods = useAppSelector((state) => state.moods)
  const dispatch = useAppDispatch()
  return (
    <>
      <Menu id={CTX_MENU.RESULTS}>
        <Item onClick={({ props, data }) => showPreviewSongModal(props)}>Preview Song</Item>
      </Menu>
      <Menu id={CTX_MENU.MOOD}>
        <Item onClick={({ props, data }) => showPreviewSongModal(props)}>Preview Song</Item>
      </Menu>
      <Menu id={CTX_MENU.SONG}>
        <Item onClick={({ props, data }) => dispatch(addUpNext(props.id))}>Add to Up Next</Item>
        <Item onClick={({ props, data }) => window.electron.music.openLocation(props.path)}>Open File Location</Item>
        {import.meta.env.DEV && <Item onClick={({ props, data }) => console.dir(props)}>Debug Log Data to Console</Item>}
      </Menu>
    </>
  )
}
