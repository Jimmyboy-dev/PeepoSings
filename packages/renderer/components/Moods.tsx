import { Icon } from '@iconify/react'
import { ActionIcon, Anchor, Box, Button, Checkbox, ColorInput, DEFAULT_THEME, Grid, Group, Input, Modal, SimpleGrid, Stack, Text, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React, { ChangeEvent, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { addMood, removeMood, setMood } from '../store/slices/moods'
import { motion } from 'framer-motion'
import { nanoid } from '@reduxjs/toolkit'
import { setCurrentMood, setCurrentSong } from '../store/slices/currentSong'
import { setPlaying } from '../store/slices/player'
import { MoodJSON } from '@peepo/core'
import FavoritesBar from './FavoritesBar'

export default function Moods() {
  const [addingMood, { open, close, toggle: setAddMood }] = useDisclosure(false)
  const [mood, setMood] = React.useState<MoodJSON | undefined>(undefined)

  const moods = useAppSelector((state) => state.moods)
  return (
    <Stack justify="center" align="center">
      <ActionIcon
        size="xl"
        className="absolute right-2 top-2 bg-green-500 rounded-full"
        onClick={() => {
          setMood(undefined)
          setAddMood()
        }}>
        <Icon fontSize={24} icon="fas:plus" color="white" />
      </ActionIcon>
      <AddMoodModal opened={addingMood} onClose={close} mood={mood && { ...mood, type: 'editing' }} />
      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: 1500, cols: 3, spacing: 'md' },
          { maxWidth: 1100, cols: 2, spacing: 'sm' },
          { maxWidth: 600, cols: 1, spacing: 'sm' },
        ]}
        style={{ width: '80%' }}>
        {Object.values(moods).map((mood, i) => (
          <MoodItem
            key={mood.id}
            mood={mood}
            onEdit={() => {
              setMood(mood)
              open()
            }}
          />
        ))}
      </SimpleGrid>
      <FavoritesBar />
    </Stack>
  )
}
interface MoodProps {
  opened: boolean
  onClose: () => void
  mood?: MoodJSON & { type: 'editing' | 'new' }
}
function AddMoodModal({ onClose, opened, mood: moodP }: MoodProps) {
  const mood = moodP || { name: '', color: '#ffffff', icon: 'fas:music', type: 'new' }
  const [name, setName] = React.useState(mood.name)
  const [color, setColor] = React.useState(mood.color)
  const [icon, setIcon] = React.useState(mood.icon)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (mood.type === 'editing') {
      setName(mood.name)
      setColor(mood.color)
      setIcon(mood.icon)
    }
  }, [mood])

  const handleSubmit = () => {
    if (mood.type === 'new') dispatch(addMood({ name, color, icon }))
    else {
      const moodJson = mood as MoodJSON & { type?: 'editing' | 'new' }
      delete moodJson.type
      dispatch(setMood({ ...(moodJson as MoodJSON), name, color, icon }))
    }
    onClose()
  }
  return (
    <Modal opened={opened} onClose={onClose} title="Introduce yourself!">
      <Stack align="center">
        <Input.Wrapper label="Mood Name">
          <Input value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value)} />
        </Input.Wrapper>
        <ColorInput placeholder="#24d896" label="Mood Color" value={color} onChange={setColor} swatches={[...Object.values(DEFAULT_THEME.colors).map((val) => val[4])]} />
        <Input.Wrapper label="Mood Icon">
          <Input
            value={icon}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setIcon(e.target.value)}
            rightSection={
              <Tooltip
                transition="skew-up"
                transitionDuration={300}
                closeDelay={500}
                label={
                  <>
                    Look up Icons @{' '}
                    <Anchor href="https://icones.netlify.app" target="_blank">
                      Icones
                    </Anchor>
                  </>
                }>
                <Icon icon="fas:info" />
              </Tooltip>
            }
          />
        </Input.Wrapper>

        <Group position="center">
          {mood.type === 'editing' && (
            <Button variant="outline" color="red" onClick={() => mood && mood.id && dispatch(removeMood(mood.id)) && onClose()}>
              Delete
            </Button>
          )}
          <Button variant="outline" color="green" onClick={handleSubmit}>
            Submit
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}

interface MoodItemProps {
  mood: MoodJSON
  onEdit: () => void
}

function MoodItem({ mood: { id, name, color, icon }, onEdit }: MoodItemProps) {
  const dispatch = useAppDispatch()
  const songs = useAppSelector((state) => state.songs)
  const curMood = useAppSelector((state) => state.currentSong.mood)
  const songsInMood = songs.filter((song) => song.mood.includes(id))
  const [hovering, setHover] = React.useState(false)
  return (
    <div className="w-full flex flex-row h-full items-center">
      <motion.div
        className="flex flex-row items-center bg-slate-600 justify-start p-4 h-16 rounded-lg cursor-pointer select-none font-bold text-xl"
        onTap={(e) => {
          dispatch(setCurrentSong(Math.floor(Math.random() * songsInMood.length)))
          dispatch(setCurrentMood(id))
          dispatch(setPlaying())
        }}
        whileHover={{ scale: 1.1 }}
        animate={{ width: hovering ? '100%' : '85%', zIndex: 1 }}
        onHoverStart={(event, info) => setHover(true)}
        onHoverEnd={(event, info) => setHover(false)}
        whileTap={{ scale: 0.95 }}
        onContextMenu={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onEdit()
        }}>
        <Icon fontSize={24} color={color} icon={icon || 'fa-solid:music'} />
        <div className="ml-4">{name}</div>
      </motion.div>
      <MBox
        className="bg-slate-800 flex items-center justify-center rounded-r-md overflow-hidden"
        animate={{
          x: hovering ? '-100%' : 0,
          width: hovering ? '0%' : '15%',
        }}
        style={{
          height: '90%',
          zIndex: 0,
        }}
        transition={{
          duration: 0.1,
        }}>
        <Checkbox
          checked={curMood === id}
          onChange={(e) => {
            dispatch(setCurrentMood(curMood === id ? null : id))
          }}
        />
      </MBox>
    </div>
  )
}
const MBox = motion(Box)
