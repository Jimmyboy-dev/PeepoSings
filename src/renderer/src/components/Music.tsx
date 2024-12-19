import { Icon } from '@iconify/react'
import { Button, Group, Input, Stack, Text } from '@mantine/core'
import type { ReactElement } from 'react'
import React from 'react'
import SongsView from './SongsView'
import SongSearch from './SongSearch'
import { useAppSelector } from '../store'
import Moods from './Moods'

interface Props {
  currentTab: string
}

export default function Music({ currentTab }: Props): ReactElement {
  switch (currentTab) {
    case 'moods':
      return <Moods />
    case 'songs':
    default:
      return (
        <Stack className="mx-8">
          <SongSearch />
          <SongsView />
        </Stack>
      )
  }
}
