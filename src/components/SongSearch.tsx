import { Icon } from "@iconify/react"
import { InputWrapper, Group, Input, Button } from "@mantine/core"
import React, { ReactElement } from "react"

interface Props {}

export default function SongSearch({}: Props): ReactElement {
  const [search, setSearch] = React.useState("")
  const addSong = (e: React.FormEvent<HTMLButtonElement>) => {
    window.electron.music.addSong(search)
  }
  return (
    <InputWrapper className="w-full" label="Add a Video:">
      <Group className="w-full" direction="row">
        <Input
          icon={<Icon icon="fas:music-note" />}
          id="add-song"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search or Enter URL..."
          className="flex-grow"
        />
        <Button variant="filled" onClick={addSong}>
          Add
        </Button>
      </Group>
    </InputWrapper>
  )
}
