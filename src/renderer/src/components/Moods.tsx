import { Icon } from '@iconify/react'
import { ActionIcon, Anchor, Box, Button, Checkbox, ColorInput, DEFAULT_THEME, Grid, Group, Input, Modal, SimpleGrid, Stack, Text, TextInput, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React, { ChangeEvent, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { addMood, removeMood, setMood } from '../store/slices/moods'
import { motion } from 'framer-motion'
import { setCurrentMood, setCurrentSong } from '../store/slices/currentSong'
import { setPlaying } from '../store/slices/player'
import { MoodJSON } from '@peepo/core'
import FavoritesBar from './FavoritesBar'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export default function Moods() {
  const [addingMood, { open, close, toggle: setAddMood }] = useDisclosure(false)
  const [mood, setMood] = React.useState<MoodJSON | undefined>(undefined)

  const [selectedMoods, setSelectedMoods] = React.useState<number[]>([])

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
      {/* <DragDropContext
        onDragEnd={(result, provided) => {
          if (!result.destination) return
          const items = Array.from(selectedMoods)
          const [reorderedItem] = items.splice(result.source.index, 1)
          items.splice(result.destination.index, 0, reorderedItem)
          setSelectedMoods(items)
        }}>
        <Droppable droppableId="mood">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}> */}
      <Grid gutter="lg" style={{ width: '80%' }}>
        {moods.map((mood, i) => (
          <Grid.Col span={6} key={mood.id.toString()}>
            <Mood
              index={i}
              mood={mood}
              selected={selectedMoods.includes(mood.id)}
              onSelect={() => {
                setSelectedMoods((moods) => {
                  if (moods.includes(mood.id)) {
                    return moods.filter((m) => m !== mood.id)
                  }
                  return [...moods, mood.id]
                })
              }}
              onEdit={() => {
                setMood(mood)
                open()
              }}
            />
          </Grid.Col>
        ))}
      </Grid>
      {/* </div>
          )}
        </Droppable>
      </DragDropContext> */}
      <FavoritesBar filterMoods={selectedMoods} />
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
    <Modal opened={opened} onClose={onClose} title={mood.type === 'new' ? 'Create a new Mood' : `Editing ${mood.name}`}>
      <Stack align="center">
        <TextInput label="Mood Name" value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />

        <ColorInput placeholder="#24d896" label="Mood Color" value={color} onChange={setColor} swatches={[...Object.values(DEFAULT_THEME.colors).map((val) => val[4])]} />
        <Input.Wrapper label="Mood Icon">
          <Input
            value={icon}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setIcon(e.target.value)}
            rightSection={
              <Tooltip
                transitionProps={{
                  transition: 'skew-up',
                  duration: 0.3,
                }}
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

interface MoodItemProps extends React.PropsWithRef<JSX.IntrinsicElements['div']> {
  mood: MoodJSON
  selected: boolean
  onSelect?: () => void
  onEdit: () => void
}

function Mood({ mood, index, ...props }: MoodItemProps & { index: number }) {
  const dragId = `mood-${mood.id}`

  return <MoodItem mood={mood} {...props} />
  // return (
  //   <Draggable draggableId={dragId} index={index}>
  //     {(provided) => <MoodItem mood={mood} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} {...props} />}
  //   </Draggable>
  // )
}

const MoodItem = React.forwardRef<HTMLDivElement, MoodItemProps>(({ mood: { id, name, color, icon }, onEdit, selected, onSelect, ...props }, ref) => {
  const dispatch = useAppDispatch()
  const songs = useAppSelector((state) => state.songs)
  const curMood = useAppSelector((state) => state.currentSong.mood)
  const songsInMood = songs.filter((song) => song.mood.some((m) => m.id === id))
  const [hovering, setHover] = React.useState(false)
  return (
    <div className="w-full flex flex-row h-full items-center" {...props} ref={ref}>
      <motion.div
        className="flex flex-row items-center bg-slate-600 justify-start p-4 h-16 rounded-lg cursor-pointer select-none font-bold text-xl"
        onTap={(e) => {
          if (songsInMood.length === 0) return
          const songIndex = Math.floor(Math.random() * songsInMood.length)
          console.log('setting current song to: ', songIndex)
          dispatch(setCurrentSong(songIndex))
          console.log('setting current mood to: ', id)
          dispatch(setCurrentMood(id))
          console.log('setting playing to: ', true)
          dispatch(setPlaying(true))
        }}
        whileHover={{ scale: 1.1 }}
        initial={{ scale: 1, width: '85%', borderStyle: 'solid', borderColor: 'white', borderWidth: 0 }}
        animate={{ width: hovering ? '100%' : '85%', zIndex: 1, borderWidth: curMood === id ? 4 : 0 }}
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
        initial={{ width: '15%' }}
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
        <Checkbox checked={selected} onChange={onSelect} />
      </MBox>
    </div>
  )
})
const MBox = motion(Box)
