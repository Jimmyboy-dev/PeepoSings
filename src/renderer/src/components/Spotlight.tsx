import { Icon } from '@iconify/react'
import { Box } from '@mantine/core'
import { openModal } from '@mantine/modals'
import { SpotlightAction, SpotlightProvider } from '@mantine/spotlight'
import React from 'react'
import SongSearch from './SongSearch'

type Props = {
  children: React.ReactNode
}

export default function Spotlight({ children }: Props) {
  const actions: SpotlightAction[] = [
    {
      title: 'Search for a song',
      icon: <Icon icon="fas:music-note" />,
      onTrigger(action) {
        openModal({
          title: 'Search for a song',
          size: '90vw',
          children: (
            <Box
              sx={{
                width: '100%',
              }}>
              <SongSearch />
            </Box>
          ),
        })
      },
      description: 'Search for a song to add',
      keywords: 'youtube,search,s',
    },
  ]
  return (
    <SpotlightProvider searchIcon={<Icon icon="fas:magnifying-glass" />} searchPlaceholder="Search..." shortcut={['mod + P', 'mod + K', '/']} nothingFoundMessage="Nothing found..." actions={actions}>
      {children}
    </SpotlightProvider>
  )
}
