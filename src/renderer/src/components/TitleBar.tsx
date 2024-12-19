import type { ReactElement } from 'react'
import { useEffect } from 'react'
import React from 'react'
import { ActionIcon, Group, SegmentedControl } from '@mantine/core'
import { Icon } from '@iconify/react'
import { useDisclosure } from '@mantine/hooks'
// import AppSelection from "./AppSelection"
import Settings from './Settings'
interface Props {
  currentTab: string
  onTabChange: (tab: string) => void
}

export default function TitleBar({ currentTab, onTabChange }: Props): ReactElement {
  const [isOpen, { toggle: toggleIsOpen }] = useDisclosure(false)
  const [version, setVersion] = React.useState('')
  useEffect(() => {
    window.electron.misc.getVersion().then(setVersion)
  })

  return (
    <div id="dragBar" className="navbar fixed top-0 left-0 hover:shadow-2xl transition-shadow flex-row w-full mb-2 shadow-lg bg-base-300 text-base-content rounded-box rounded-t-none z-50">
      <div className="noDrag">
        <ActionIcon className="flex-none text-green-400 ml-2 cursor-pointer h-12 w-12 rounded-full" color="currentColor" onClick={toggleIsOpen}>
          <Icon fontSize={24} className={isOpen ? 'animate-spin' : undefined} icon="fas:gear" />
        </ActionIcon>
        <Settings opened={isOpen} toggle={toggleIsOpen} />
      </div>
      <Icon className="ml-4 border-none text-primary" fontSize={24} icon="fas:music-note" />
      <div className="inline-flex gap-2 px-2 ">
        <div className="flex flex-col items-end">
          <span className="text-xl  text-primary font-bold self-end">Peepo Sings</span>
          <span className="text-xs font-semibold -bottom-3 right-0">Twitch Music Player</span>
        </div>
        <span className=" text-xs  text-secondary font-bold ">v{version}</span>
      </div>
      <SegmentedControl
        className="noDrag flex-shrink ml-6 max-w-xs"
        value={currentTab}
        onChange={onTabChange}
        data={[
          { label: 'Songs', value: 'songs' },
          { label: 'Moods', value: 'moods' },
        ]}
      />
      <div className="flex-grow" />
      <Group className="windowControl flex-nowrap noDrag" spacing={4}>
        <ActionIcon onClick={() => window.electron.windowControl('minimize')}>
          <Icon color="white" icon="fas:window-minimize" />
        </ActionIcon>
        <ActionIcon onClick={() => window.electron.windowControl('maximize')}>
          <Icon color="white" icon="far:window-maximize" />
        </ActionIcon>

        <ActionIcon onClick={() => window.electron.windowControl('close')}>
          <Icon color="white" icon="fas:x" />
        </ActionIcon>
      </Group>
    </div>
  )
}
