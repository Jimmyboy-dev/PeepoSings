import { Icon } from "@iconify/react"
import { Button, Group, Input, InputWrapper, Text } from "@mantine/core"
import React, { ReactElement } from "react"
import MusicDb from "./MusicDb"
import SongSearch from "./SongSearch"

interface Props {}

export default function Music({}: Props): ReactElement {
  return (
    <Group direction="column">
      <SongSearch />
      <MusicDb />
    </Group>
  )
}
