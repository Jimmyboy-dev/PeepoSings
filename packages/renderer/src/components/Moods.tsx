import { Icon } from "@iconify/react"
import {
  ActionIcon,
  Anchor,
  Button,
  ColorInput,
  DEFAULT_THEME,
  Grid,
  Group,
  Input,
  InputWrapper,
  Modal,
  SimpleGrid,
  Text,
  Tooltip,
} from "@mantine/core"
import { useBooleanToggle } from "@mantine/hooks"
import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store"
import { addMood, removeMood, setMood } from "../store/slices/moods"
import { motion } from "framer-motion"
import { nanoid } from "@reduxjs/toolkit"
import { setCurrentMood, setCurrentSong } from "../store/slices/currentSong"
import { setPlaying } from "../store/slices/player"

export default function Moods() {
  const [addingMood, setAddMood] = useBooleanToggle(false)
  const [mood, setMood] = React.useState<MoodJSON | undefined>(undefined)
  const player = useAppSelector((state) => state.player)

  const moods = useAppSelector((state) => state.moods)
  const dispatch = useAppDispatch()
  return (
    <Group direction="column" position="center" align="center">
      <ActionIcon size="xl" className="absolute right-2 top-2 bg-green-500 rounded-full" onClick={() => setAddMood()}>
        <Icon fontSize={24} icon="fas:plus" color="white" />
      </ActionIcon>
      <AddMoodModal
        opened={addingMood}
        onClose={() => setAddMood(false)}
        mood={!mood ? undefined : { ...mood, type: "editing" }}
      />
      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: 1100, cols: 3, spacing: "md" },
          { maxWidth: 755, cols: 2, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
        style={{ width: "80%" }}>
        {Object.values(moods).map((mood, i) => (
          <MoodItem
            key={mood.id}
            mood={mood}
            onEdit={() => {
              setMood(mood)
              setAddMood(true)
            }}
          />
        ))}
      </SimpleGrid>
    </Group>
  )
}
interface MoodProps {
  opened: boolean
  onClose: () => void
  mood?: Partial<MoodJSON> & { type: "editing" | "new" }
}
function AddMoodModal({
  onClose,
  opened,
  mood = { name: "", color: "#ffffff", icon: "fas:music", type: "new" },
}: MoodProps) {
  const [name, setName] = React.useState(mood.name)
  const [color, setColor] = React.useState(mood.color)
  const [icon, setIcon] = React.useState(mood.icon)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (mood.type === "editing") {
      setName(mood.name)
      setColor(mood.color)
      setIcon(mood.icon)
    }
  }, [mood])

  const handleSubmit = () => {
    if (mood.type === "new") dispatch(addMood({ name, color, icon, id: nanoid(8) }))
    else {
      const moodJson = mood
      delete moodJson.type
      dispatch(setMood({ ...(moodJson as MoodJSON), name, color, icon }))
    }
    onClose()
  }
  return (
    <Modal opened={opened} onClose={onClose} title="Introduce yourself!">
      <Group direction="column" position="center">
        <InputWrapper label="Mood Name">
          <Input value={name} onChange={(e) => setName(e.currentTarget.value)} />
        </InputWrapper>
        <ColorInput
          placeholder="#24d896"
          label="Mood Color"
          value={color}
          onChange={setColor}
          swatches={[...Object.values(DEFAULT_THEME.colors).map((val) => val[4])]}
        />
        <InputWrapper label="Mood Icon">
          <Input
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            rightSection={
              <Tooltip
                transition="skew-up"
                transitionDuration={300}
                transitionTimingFunction="ease"
                allowPointerEvents
                delay={500}
                label={
                  <>
                    Look up Icons @{" "}
                    <Anchor href="https://icones.netlify.app" target="_blank">
                      Icones
                    </Anchor>
                  </>
                }>
                <Icon icon="fas:info" />
              </Tooltip>
            }
          />
        </InputWrapper>

        <Group direction="row" position="center">
          {mood.type === "editing" && (
            <Button
              variant="outline"
              color="red"
              onClick={() => mood && mood.id && dispatch(removeMood(mood.id)) && onClose()}>
              Delete
            </Button>
          )}
          <Button variant="outline" color="green" onClick={handleSubmit}>
            Submit
          </Button>
        </Group>
      </Group>
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
  const songsInMood = songs.filter((song) => song.mood.includes(id))
  return (
    <motion.div
      className="flex flex-row gap-4 items-center w-full bg-slate-600 justify-start p-4 h-16 rounded-lg cursor-pointer select-none font-bold text-xl"
      onClick={(e) => {
        dispatch(setCurrentSong(Math.floor(Math.random() * songsInMood.length)))
        dispatch(setCurrentMood(id))
        dispatch(setPlaying())
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onContextMenu={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onEdit()
      }}>
      <Icon fontSize={24} color={color} icon={icon} />
      <div>{name}</div>
    </motion.div>
  )
}
