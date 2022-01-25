import { ActionIcon, Button, Group, Image, Text, Tooltip } from "@mantine/core"
import { useListState } from "@mantine/hooks"
import React, { ReactElement, useContext, useEffect } from "react"
import { CurrentSongContext } from "../lib/useCurrentSong
import { VideoDetails } from "ytdl-core"
import { useMusic } from "../store"
import { Icon } from "@iconify/react"

interface Props {
  songs?: SongJSON[]
}

const db = window.electron.music

export default ({}: Props): ReactElement => {
  const { songs, setCurrentSong } = useMusic()
  return (
    <Group direction="column" className="w-full">
      {songs.length === 0 && <div>No songs found</div>}
      {songs.length !== 0 &&
        songs.map((song, i) => <SongView song={song} setCurrentSong={setCurrentSong} key={song.title} />)}
    </Group>
  )
}

const SongView = ({ song, setCurrentSong }: { song: SongJSON; setCurrentSong: (song: SongJSON) => void }) => {
  const { removeSong } = useMusic()
  return (
    <div
      className="flex flex-row cursor-pointer items-center w-full p-2 text-gray-100 rounded-lg h-24 hover:bg-base-100 transition-colors hover:font-semibold"
      onClick={() => setCurrentSong(song)}>
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
      <ActionIcon
        className="ml-auto hover:text-red-400"
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation()
          e.preventDefault()
          setCurrentSong(null)
          setTimeout(() => removeSong(song), 250)
        }}>
        <Icon icon="fas:trash" />
      </ActionIcon>
    </div>
  )
}
