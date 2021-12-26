import { Group, Image, Text } from "@mantine/core"
import { useListState } from "@mantine/hooks"
import React, { ReactElement, useContext, useEffect } from "react"
import { Song } from "../../store"
import { CurrentSongContext } from "../hooks/useCurrentSong"

interface Props {}

const db = window.electron.music

export default function MusicDb({}: Props): ReactElement {
  const { song, setSong } = useContext(CurrentSongContext)

  const [songs, setSongs] = useListState<Song | string>(["loading"])
  useEffect(() => {
    const loadSongs = async () => {
      setSongs.setState(await db.getSongs())
    }
    loadSongs()
  }, [])

  if (typeof songs[0] === "string") return <div>Loading...</div>
  else
    return (
      <Group direction="column" className="w-full ">
        {songs.length === 0 && <div>No songs found</div>}
        {songs.length !== 0 &&
          (songs as Song[]).map((song, i) => (
            <Group
              direction="row"
              key={i}
              className="hover:bg-secondary-content h-20  p-4 w-full rounded-lg cursor-pointer transition-all"
              onClick={(e) => setSong(song.title)}>
              <Text className="text-lg font-semibold">{song.title}</Text>
              <Image src={song?.albumArt} />
            </Group>
          ))}
      </Group>
    )
}
