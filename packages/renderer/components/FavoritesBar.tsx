import styled from '@emotion/styled'
import React from 'react'
import { PeepoMeta } from '@peepo/core'
import { useAppDispatch, useAppSelector } from '../store'
import { Stack, ScrollArea, Text, Group, Image, Box, Tooltip } from '@mantine/core'
import { motion } from 'framer-motion'
import { setCurrentSong } from '../store/slices/currentSong'
import { setPlaying } from '../store/slices/player'

const Favorites = styled.div`
  position: absolute;

  left: 11vw;
  right: 2rem;
  max-height: 100px;
  height: 12vh;
  background: #222222;

  overflow: visible;
`

const MBox = motion(Box)

type Props = {}

export default function FavoritesBar({}: Props) {
  const favorites = useAppSelector((store) =>
    store.songs
      .filter((song) => (store.currentSong.mood !== null ? song.mood.includes(store.currentSong.mood) : true))
      .map((song, i) => ({ ...song, index: i }))
      .filter((song) => song.favorite)
  )
  const mood = useAppSelector((store) => store.currentSong.mood)
  return (
    <Favorites style={{ bottom: !mood ? '0rem' : '2.5rem' }}>
      <Group style={{ width: '100%', height: '100%', overflowY: 'visible', overflowX: 'auto', padding: '0.5rem 0.75rem' }} spacing={12}>
        {favorites.map((song) => (
          <FavoriteSongView key={song.id} song={song} />
        ))}
      </Group>
    </Favorites>
  )
}

function FavoriteSongView({ song }: { song: PeepoMeta & { index: number } }) {
  const dispatch = useAppDispatch()
  const curSong = useAppSelector((store) => store.currentSong.song)
  const isCurrent = curSong === song.index

  return (
    <Tooltip
      label={
        <>
          <Text className="font-semibold text-green-400 inline">{song.title}</Text> by <Text className="font-semibold inline">{song.artist}</Text>
        </>
      }
      openDelay={750}
      offset={12}
      position="top"
      styles={{
        tooltip: {
          outlineColor: '#fff',
          outlineStyle: 'solid',
          outlineWidth: '2px',
        },
      }}>
      <MBox
        sx={{
          position: 'relative',
          cursor: 'pointer',
          width: '10rem',
          minHeight: '100%',
          overflow: 'hidden',
          borderRadius: '0.5rem',

          boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.1), 0 0 var(--glow-size) var(--glow-spread) var(--glow-color)',
          '--glow-size': '0px',
          '--glow-color': 'transparent',
          '--glow-spread': '0px',
          // transition: 'all 0.2s ease-in-out',
          '&:hover': {
            '--glow-size': '0.5rem 4px',
            '--glow-color': 'rgba(0, 0, 0, 0.1)',
            '--glow-spread': '0.5rem',
          },
          outlineStyle: 'solid',
          outlineColor: '#44ff99',
        }}
        animate={{
          outlineWidth: isCurrent ? '2px' : '0px',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{
          duration: 0.1,
        }}
        onTap={(e) => {
          dispatch(setCurrentSong(song.index))
          dispatch(setPlaying(true))
        }}>
        <Stack
          justify="space-around"
          px={8}
          py={4}
          sx={{
            position: 'absolute',
            zIndex: 1,
            height: '100%',
            width: '100%',
            color: 'white',
            textShadow: '-2px 2px 1px rgba(0,0,0,0.6)',
            background: 'linear-gradient(to top, #000000aa 0%,#00000077 15%, #00000000 50%, #00000077 85%, #000000aa 100%)',
          }}>
          <Text className="text-lg font-semibold truncate">{song.title}</Text>
          <Text className="text-md font-semibold">{song.artist}</Text>
        </Stack>
        <motion.img
          draggable={false}
          src={song.thumbnail}
          alt={song.title}
          className="h-full w-full"
          style={{
            top: '0',
            left: '0',
            position: 'absolute',
            zIndex: 0,
            filter: 'blur(0.1rem)',
            objectFit: 'cover',
          }}
        />
      </MBox>
    </Tooltip>
  )
}
