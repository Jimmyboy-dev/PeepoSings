import styled from '@emotion/styled'
import React, { useEffect, useRef } from 'react'
import { PeepoMeta } from '@peepo/core'
import { useAppDispatch, useAppSelector } from '../store'
import { Stack, ScrollArea, Text, Group, Image, Box, Tooltip } from '@mantine/core'
import { motion } from 'framer-motion'
import { setCurrentSong } from '../store/slices/currentSong'
import { setPlaying } from '../store/slices/player'

const Favorites = styled.div`
  position: absolute;

  left: 11vw;
  @media screen and (max-width: 768px) {
    right: 0;
  }
  right: 2rem;
  max-height: 100px;
  min-height: 90px;
  height: 12vh;
  background: ${({ theme }) => theme.colors.dark[5]};
  border-radius: 0.25rem;
  border-top-left-radius: 0;
  &::after {
    content: 'Favorites';
    position: absolute;
    bottom: 100%;
    left: 0;
    padding: 0.15rem 0.5rem;
    background: ${({ theme }) => theme.colors.dark[5]};
    color: ${({ theme }) => theme.colors.dark[0]};
    border-radius: 0.25rem;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.dark[4]};
  }
  overflow: visible;
`

const MBox = motion(Box)

type Props = {
  filterMoods?: number[]
}

export default function FavoritesBar({ filterMoods }: Props) {
  const favorites = useAppSelector((store) =>
    store.songs
      .filter((song) => (store.currentSong.mood !== null ? song.mood.some((mood) => (filterMoods.length > 0 ? filterMoods.includes(mood.id) : store.currentSong.mood === mood.id)) : true))
      .filter((song) => song.favorite)
  )
  const mood = useAppSelector((store) => store.currentSong.mood)
  const viewport = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      viewport.current.scrollTo({ behavior: 'auto', left: viewport.current.scrollLeft + e.deltaY / 2 })
    }
    viewport.current.addEventListener('wheel', onWheel)
    return () => {
      if (viewport.current) viewport.current.removeEventListener('wheel', onWheel)
    }
  }, [])
  return (
    <Favorites style={{ bottom: !mood ? '0rem' : '2.5rem' }}>
      <ScrollArea type="hover" style={{ width: '100%', height: '100%' }} offsetScrollbars viewportRef={viewport} scrollbarSize={8}>
        <Group style={{ height: '11vw', maxHeight: '100px', minHeight: '90px', overflowY: 'hidden', overflowX: 'auto', padding: '0.5rem 0.75rem', flexWrap: 'nowrap' }} spacing={12}>
          {favorites.map((song) => (
            <FavoriteSongView key={song.id} song={song} />
          ))}
        </Group>
      </ScrollArea>
    </Favorites>
  )
}

function FavoriteSongView({ song }: { song: PeepoMeta }) {
  const dispatch = useAppDispatch()
  const curSong = useAppSelector((store) => store.currentSong.song)
  const isCurrent = curSong === song.id

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
          minWidth: '8rem',
          minHeight: '100%',
          overflow: 'hidden',
          borderRadius: '0.5rem',
          mb: '0.5rem',

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
        initial={{
          outlineWidth: '0px',
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
          dispatch(setCurrentSong(song.id))
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
