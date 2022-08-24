import React from 'react'
import 'react-contexify/dist/ReactContexify.css'
import { Menu, Item, Submenu, Separator } from 'react-contexify'
import { useNotifications } from '@mantine/notifications'
import { openModal, useModals } from '@mantine/modals'
import PreviewVideo from './PreviewVideo'
import { Title } from '@mantine/core'
import { useAppSelector } from '../store'

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
      modal: {
        width: '75vw',
      },
    },
  })
}
export default function ContextMenus({}: Props) {
  // const moods = useAppSelector((state) => state.moods)

  return (
    <>
      <Menu id={CTX_MENU.RESULTS}>
        <Item onClick={({ props, data }) => showPreviewSongModal(props)}>Preview Song</Item>
      </Menu>
      <Menu id={CTX_MENU.MOOD}>
        <Item onClick={({ props, data }) => showPreviewSongModal(props)}>Preview Song</Item>
      </Menu>
      <Menu id={CTX_MENU.SONG}>
        <Item onClick={({ props, data }) => window.electron.music.openLocation(props)}>Open File Location</Item>
      </Menu>
    </>
  )
}
