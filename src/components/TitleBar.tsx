import React, { ReactElement } from "react"
import { ActionIcon, Burger, Button, Group, Popover } from "@mantine/core"
import { Icon } from "@iconify/react"
import { useBooleanToggle } from "@mantine/hooks"
import AppDrawer from "./Settings"
import AppSelection from "./AppSelection"
import Settings from "./Settings"
interface Props {}

export default function TitleBar({}: Props): ReactElement {
  const [isOpen, toggleIsOpen] = useBooleanToggle(false)
  const [gameTab, toggleGameSelector] = useBooleanToggle(false)

  return (
    <div
      id="dragBar"
      className="navbar hover:shadow-2xl transition-shadow flex-row w-full mb-2 shadow-lg bg-base-300 text-base-content rounded-box rounded-t-none">
      <div className="noDrag">
        <ActionIcon
          className="flex-none text-green-400 ml-2 cursor-pointer h-12 w-12 rounded-full"
          color="currentColor"
          onClick={() => toggleIsOpen(!isOpen)}>
          <Icon fontSize={24} className={isOpen && "animate-spin"} icon="fas:gear" />
        </ActionIcon>
        <Settings opened={isOpen} toggle={toggleIsOpen} />
      </div>
      <Icon className="ml-4 text-base-content border-none" fontSize={20} icon="fas:music-note" />
      <div className="inline-flex  gap-1 items- px-2 ">
        <span className="text-lg  text-primary font-bold self-end">Peepo Sings</span>
        <span className="text-xs font-semibold">Twitch Music Player</span>
      </div>
      <div className="flex-grow" />
      <Group className="windowControl noDrag" spacing={4}>
        <ActionIcon onClick={() => window.electron.windowControl("minimize")}>
          <Icon color="white" icon="fas:window-minimize" />
        </ActionIcon>
        <ActionIcon onClick={() => window.electron.windowControl("maximize")}>
          <Icon color="white" icon="far:window-maximize" />
        </ActionIcon>

        <ActionIcon onClick={() => window.electron.windowControl("close")}>
          <Icon color="white" icon="fas:x" />
        </ActionIcon>
      </Group>
    </div>
  )
}
