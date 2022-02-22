import { ActionIcon, Group, MultiSelect, Tooltip } from "@mantine/core"
import type { ReactElement } from "react"
import React from "react"
import { Icon } from "@iconify/react"
import { useAppDispatch, useAppSelector } from "../store"
import { setCurrentSong } from "../store/slices/currentSong"
import { removeSong, setSongMood } from "../store/slices/songs"

interface Props {
  songs?: SongJSON[]
}

const SongsView = ({ songs: _songs }: Props): ReactElement => {
  const songList = useAppSelector((store) => store.songs)
  const currentMood = useAppSelector((store) => store.currentSong.mood)
  const songs = currentMood !== null ? songList.filter((song) => song.mood.includes(currentMood)) : songList
  const dispatch = useAppDispatch()
  return (
    <Group direction="column" className="w-full pb-12">
      {songs.length === 0 && <div>No songs found</div>}
      {songs.length !== 0 &&
        songs.map((song, i) => (
          <SongView song={song} setCurSong={() => dispatch(setCurrentSong(i))} key={song.title} />
        ))}
    </Group>
  )
}
export default SongsView

const SongView = ({
  song,
  index,
  setCurSong,
}: {
  song: SongJSON
  index?: number
  setCurSong: (song?: number) => void
}) => {
  const dispatch = useAppDispatch()
  const moods = useAppSelector((store) => store.moods)
  return (
    <div
      className="flex flex-row cursor-pointer items-center w-full p-2 text-gray-100 rounded-lg h-24 hover:bg-base-100 transition-colors hover:font-semibold"
      onClick={() => setCurSong()}>
      <Tooltip label="Open in Explorer" position="left" placement="center" gutter={10}>
        <ActionIcon className="mx-1" onClick={() => window.electron.music.openLocation(song.filePath)}>
          <Icon icon="fas:arrow-up-right-from-square" />
        </ActionIcon>
      </Tooltip>
      <img src={song.albumArt} className="h-full rounded-xl" />
      <div className="flex flex-col flex-grow justify-center ml-4">
        <span className="text-lg  transition-all">{song.title}</span>
        <span className="text-sm">{song.artist}</span>
      </div>
      <MultiSelect
        value={song.mood}
        onClick={(e) => e.stopPropagation()}
        onChange={(v) => dispatch(setSongMood({ songId: song.id, moodId: v }))}
        data={Object.values(moods).map((mood: MoodJSON) => ({ label: mood.name, value: mood.id }))}
        searchable
        nothingFound="Nothing found"
      />
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
    </div>
  )
}
