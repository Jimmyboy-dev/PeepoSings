import { Center } from '@mantine/core'
import { useModals } from '@mantine/modals'
import React from 'react'
import ReactPlayer from 'react-player'

type Props = { video: string }

export default function PreviewVideo({ video }: Props) {
  return (
    <Center className="h-full">
      <ReactPlayer style={{ width: '60vw', height: '100%' }} url={video} />
    </Center>
  )
}
