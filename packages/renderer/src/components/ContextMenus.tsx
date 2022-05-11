import React from 'react'
import 'react-contexify/dist/ReactContexify.css'
import { Menu, Item, Submenu, Separator } from 'react-contexify'
import { useNotifications } from '@mantine/notifications'

export const CTX_MENU = {
  RESULTS: 'search-results',
}
type Props = {}

export default function ContextMenus({}: Props) {
  const { showNotification } = useNotifications()
  return (
    <>
      <Menu id={CTX_MENU.RESULTS}>
        <Item onClick={() => showNotification({ message: 'Not implemented *yet*' })}>Preview Song</Item>
      </Menu>
    </>
  )
}
