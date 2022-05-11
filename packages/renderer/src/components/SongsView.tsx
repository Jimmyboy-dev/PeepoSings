import { ActionIcon, Badge, Box, Checkbox, Divider, Group, MultiSelect, Tooltip } from '@mantine/core'
import type { ReactElement } from 'react'
import React from 'react'
import { Icon } from '@iconify/react'
import { useAppDispatch, useAppSelector } from '../store'
import { setCurrentSong } from '../store/slices/currentSong'
import { removeSong, setSongMood } from '../store/slices/songs'
import { toggleCompactSongView } from '../store/slices/config'

interface Props {
  songs?: SongJSON[]
}

const SongsView = ({ songs: _songs }: Props): ReactElement => {
  const songList = useAppSelector((store) => store.songs)
  const currentMood = useAppSelector((store) => store.currentSong.mood)
  const compact = useAppSelector((store) => store.config.compactSongView)

  const songs = currentMood !== null ? songList.filter((song) => song.mood.includes(currentMood)) : songList
  const dispatch = useAppDispatch()
  return (
    <Box className="flex flex-col gap-1 bg-gray-800 p-2 rounded-lg w-full">
      <div className="flex flex-row px-4">
        <div className="flex-grow" />
        <Checkbox className=" font-semibold" label="Compact View" checked={compact} onChange={(e) => dispatch(toggleCompactSongView(e.currentTarget.checked))} />
      </div>
      <Divider className="mt-2 mb-1 -mx-2 rounded-full" size="xs" />
      <Group direction="column" className="w-full mb-24" spacing={compact ? 0 : 16}>
        {songs.length === 0 && <div>No songs found</div>}
        {songs.length !== 0 && songs.map((song, i) => <SongView compact={compact} song={song} setCurSong={() => dispatch(setCurrentSong(i))} key={song.title} />)}
      </Group>
    </Box>
  )
}
export default SongsView

const SongView = ({ song, index, compact, setCurSong }: { song: SongJSON; index?: number; compact?: boolean; setCurSong: (song?: number) => void }) => {
  const dispatch = useAppDispatch()
  const moods = useAppSelector((store) => store.moods)
  const currentSong = useAppSelector((store) => store.currentSong.song)

  const isCurrentSong = currentSong === index

  return (
    <div
      className={`flex flex-row items-center w-full text-gray-100 ${
        compact ? 'h-8 p-0 m-0 border-b-2 border-gray-300' : 'cursor-pointer p-2 rounded-lg h-24 hover:bg-base-100 transition-colors hover:font-semibold'
      } ${isCurrentSong ? 'font-black bg-slate-400' : ''}`}
      onClick={() => setCurSong()}>
      {!compact && (
        <Tooltip label="Open in Explorer" position="left" placement="center" gutter={10}>
          <ActionIcon className="mx-1" onClick={() => window.electron.music.openLocation(song.filePath)}>
            <Icon icon="fas:arrow-up-right-from-square" />
          </ActionIcon>
        </Tooltip>
      )}
      <img src={song.albumArt} className={`h-full object-cover ${compact ? 'aspect-square rounded-full p-1' : 'rounded-xl'}`} />
      <div className={`flex  ${compact ? 'flex-row gap-2 items-center flex-nowrap ml-2' : 'flex-col ml-4 flex-grow justify-center'}`}>
        <span className="truncate w-56 text-sm transition-all font-medium">{song.title}</span>
        <span className="font-semibold text-sm">{song.artist}</span>
      </div>
      {!compact && (
        <MultiSelect
          value={song.mood}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          onChange={(v) => dispatch(setSongMood({ songId: song.id, moodId: v }))}
          data={Object.values(moods).map((mood: MoodJSON) => ({ label: mood.name, value: mood.id }))}
          searchable
          nothingFound="Nothing found"
        />
      )}
      {!compact && (
        <ActionIcon
          className="ml-auto hover:text-red-400"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation()
            e.preventDefault()
            dispatch(setCurrentSong(-1))
            setTimeout(() => dispatch(removeSong(song)), 250)
          }}>
          <Icon icon="fas:trash" />
        </ActionIcon>
      )}

      {compact && (
        <>
          <div className="flex-grow" />
          <div className="flex flex-row gap-1 items-center">
            {song.mood.map(
              (id, i) =>
                id && (
                  <Badge
                    key={`${song.id}-mood-${i}`}
                    color={chooseRandomArrayValueSeeded(['cyan', 'blue', 'green', 'indigo', 'grape', 'violet', 'teal', 'lime', 'yellow', 'orange', 'pink', 'red'], strToNum(id))}>
                    {moods[id]?.name}
                  </Badge>
                )
            )}
          </div>
        </>
      )}
    </div>
  )
}
const strToNum = (str: string) => str.split('').reduce((a, b) => a + b.charCodeAt(0), 0)

function chooseRandomArrayValueSeeded<T>(array: T[], seed: number): T {
  const random = Math.sin(seed) * 10000
  return array[Math.floor(random % array.length)]
}
