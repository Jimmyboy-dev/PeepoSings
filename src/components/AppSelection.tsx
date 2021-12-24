import { Icon } from "@iconify/react"
import { ActionIcon, Button, Group, Popover, Text } from "@mantine/core"
import { useBooleanToggle, useListState } from "@mantine/hooks"
import React, { ReactElement, useEffect } from "react"
import { useStore } from "../hooks"

interface Props {
  opened: boolean
  gameTab?: string
  toggleGameSelector: (state?: boolean) => void
}
const store = window.electron.store

export default function AppSelection({ toggleGameSelector, opened }: Props): ReactElement {
  const [currGame, setGame] = React.useState("none")
  const [games, setGames] = React.useState([])

  useEffect(() => {
    setGame(store.get("game.selectedGame"))
  }, [])

  useEffect(() => {
    store.set("game.selectedGame", currGame)
  }, [currGame])
  return (
    <Popover
      opened={opened}
      onClose={() => toggleGameSelector(false)}
      target={
        <span
          className="font-black w-full text-green-400 hover:bg-neutral-focus transition-colors"
          onClick={(e) => toggleGameSelector()}>
          _______
        </span>
      }
      withArrow
      position="bottom"
      styles={{ body: { width: 260 } }}
      className="noDrag cursor-pointer">
      <SelectionMenu />
    </Popover>
  )

  function SelectionMenu(): ReactElement {
    return (
      <Group className="flex flex-col">
        {games.map((val, i, arr) => (
          <AppButton key={i} gameName={val} />
        ))}
      </Group>
    )
  }
  function AppButton(props: { gameName: string }): ReactElement {
    const [editing, toggleEdit] = useBooleanToggle(false)
    return (
      <Group className="rounded w-full hover:bg-primary-focus" onClick={(e) => setGame(props.gameName)}>
        <Text>{props.gameName}</Text>
        <ActionIcon onClick={() => toggleEdit()}>
          <Icon icon="mdi:pencil" />
        </ActionIcon>
      </Group>
    )
  }
}
