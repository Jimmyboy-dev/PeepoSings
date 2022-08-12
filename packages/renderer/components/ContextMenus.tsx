import React from 'react'
import 'react-contexify/dist/ReactContexify.css'
import { Menu, Item, Submenu, Separator } from 'react-contexify'
import { useNotifications } from '@mantine/notifications'
import { useModals } from '@mantine/modals'
import PreviewVideo from './PreviewVideo'
import { Title } from '@mantine/core'

export const CTX_MENU = {
  RESULTS: 'search-results',
}
type Props = {}

export default function ContextMenus({}: Props) {
  const modals = useModals()
  const showPreviewSongModal = ({ url, title }: { url: string; title: string }) => {
    modals.openModal({
      id: 'preview-song',
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

  return (
    <>
      <Menu id={CTX_MENU.RESULTS}>
        <Item onClick={({ props, data }) => showPreviewSongModal(props)}>Preview Song</Item>
      </Menu>
    </>
  )
}
