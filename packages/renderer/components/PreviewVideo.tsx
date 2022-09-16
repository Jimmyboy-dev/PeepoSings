import { Center } from '@mantine/core'
// import { useModals } from '@mantine/modals'
import React from 'react'
import ReactPlayer from 'react-player/youtube'
import { useAppSelector } from '../store'

type Props = { video: string }

export default function PreviewVideo({ video }: Props) {
  const { volume } = useAppSelector((state) => state.player)
  let player: React.ReactNode = (
    <ReactPlayer
      wrapper={(props) => <Center className="noDrag" {...props} />}
      width="100%"
      volume={volume}
      controls
      config={{
        playerVars: {
          autoplay: 1,
          widget_referrer: 'https://sings.peepo.dev',
        },
      }}
      url={video}
    />
  )
  return <Center className="h-full">{player}</Center>
}
