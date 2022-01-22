import { Icon } from "@iconify/react"
import { Button, Group, Input, InputWrapper, Text } from "@mantine/core"
import React, { ReactElement } from "react"
import SongsView from "./SongsView"
import SongSearch from "./SongSearch"
import { useMusic } from "../store"

interface Props {
  currentTab: string
}

export default function Music({ currentTab }: Props): ReactElement {
  const store = useMusic()
  switch (currentTab) {
    case "moods":
      return <></>
    case "songs":
    default:
      return (
        <Group className="mx-16" direction="column">
          <SongSearch />
          <SongsView />
        </Group>
      )
  }
}
