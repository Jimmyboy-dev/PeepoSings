import { useMantineTheme } from '@mantine/core'
import { useMove } from '@mantine/hooks'
import { motion } from 'framer-motion'
import React from 'react'
import { useAppSelector } from '../store'
import { PeepoMeta } from '@peepo/core'

interface Props {
  value: number
  song?: PeepoMeta
  onChange: (value: number) => void
}

export default function ProgressSlider({ onChange, value, song }: Props) {
  const theme = useMantineTheme()
  // const [curTime, duration] = useAppSelector((state) => [state.player.currentTime, state.player.duration])
  const { ref } = useMove(({ x }) => onChange(x), {})
  return (
    <div className="group absolute z-50 pointer-events-auto w-full m-0 flex flex-row">
      <div style={{ height: 10, transformOrigin: 'bottom', width: '100%', position: 'relative', backgroundColor: theme.colors.dark[5] }} ref={ref}>
        <motion.div
          className="h-full"
          animate={{
            width: `${value * 100}%`,
          }}
          style={{
            borderRadius: '0px !important',
            transition: 'transform 0.2s ease-in-out',
            transformOrigin: 'bottom',
            background: theme.colors.green[5],
          }}
        />
        <motion.div
          animate={{
            left: `${value * 100}%`,
            top: '50%',
            width: '20px',
            height: '20px',
          }}
          style={{
            x: '-50%',
            y: '-50%',
            background: 'white',
            position: 'absolute',
            transformOrigin: 'bottom',

            borderRadius: '50%',
          }}></motion.div>
      </div>
    </div>
  )
}
