import type { ReactElement } from 'react'
import React, { useEffect } from 'react'
import { Drawer, Button, Group, Modal, Select, Checkbox, Text, TextInput, Stack, Loader, Title, Box, Tabs, Center } from '@mantine/core'
import { PeepoSingConfig } from '@peepo/core'
import { useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../store'
import { connectToLastFM, setOutputDevice, toggleAdvancedOptions, toggleRunOnStartup } from '../store/slices/config'

interface Props {
  opened: boolean
  toggle: () => void
}

export default function Settings({ opened, toggle }: Props): ReactElement {
  const config = useAppSelector((store) => store.config)
  const dispatch = useAppDispatch()
  const [token, setToken] = React.useState<string>('')

  const [audioDevices, setAudioDevices] = React.useState<MediaDeviceInfo[]>([])
  useEffect(() => {
    const doIt = async () => {
      //Get and display audio devices
      const devices = await navigator.mediaDevices.enumerateDevices()
      const audioDevices = devices.filter((device) => device.kind === 'audiooutput')
      setAudioDevices(audioDevices)
    }
    const devicePromise = doIt()
  }, [audioDevices, setAudioDevices])

  const onChange = (deviceId: string) => {
    dispatch(setOutputDevice(deviceId))
  }
  if (!config) {
    return (
      <Modal centered opened={opened} onClose={toggle}>
        <Group>Loading...</Group>
      </Modal>
    )
  } else
    return (
      <Modal
        centered
        opened={opened}
        onClose={() => toggle()}
        title={<Title order={2}>Settings</Title>}
        padding="lg"
        size="xl"
        className="noDrag"
        // overflow="outside"
        styles={{
          content: {
            minHeight: '60vh',
            paddingTop: 0,
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '75vh',
          },
          header: {
            margin: 0,
            minHeight: '3vh',
          },
          body: {
            flexGrow: 1,
          },
        }}>
        <Tabs variant="outline" radius="md" defaultValue="general" classNames={{ root: 'h-full', panel: 'h-full' }}>
          <Tabs.List mx={-20} pl={20}>
            <Tabs.Tab value="general">General</Tabs.Tab>
            <Tabs.Tab value="scrobbler">Scrobbler</Tabs.Tab>
            <Tabs.Tab value="plugins">Plugins</Tabs.Tab>
            {config.advancedOptions && <Tabs.Tab value="custom">Custom</Tabs.Tab>}
          </Tabs.List>
          <Tabs.Panel value="general">
            <Stack p="lg" pt={16}>
              {audioDevices.length !== 0 ? (
                <Select
                  label="Audio Output Device"
                  style={{ width: '50%' }}
                  onChange={(e: string) => onChange(e)}
                  defaultValue={audioDevices.find((device) => config.outputDevice === device.deviceId)?.deviceId || audioDevices[0].deviceId}
                  data={audioDevices.map((dev) => ({ label: dev.label, value: dev.deviceId }))}
                  data-autofocus
                />
              ) : (
                <Group>Loading Audio Devices (or none found)</Group>
              )}
              <Checkbox checked={config.runOnStartup} label="Launch on Startup" onChange={() => toggleRunOnStartup(dispatch)} />
              <Checkbox checked={config.advancedOptions} label="Show Advanced Options" onChange={(val) => dispatch(toggleAdvancedOptions(val.target.checked))} />
            </Stack>
          </Tabs.Panel>
          <Tabs.Panel value="scrobbler">
            <Stack pt={16}>
              <Title order={4}>LastFM</Title>
              {config.scrobbler && config.scrobbler.connected ? (
                <Text>Connected to LastFM</Text>
              ) : (
                <Stack>
                  <TextInput
                    label="LastFM Token"
                    onChange={(e) => {
                      setToken(e.target.value)
                    }}
                  />
                  <Button
                    onClick={() => {
                      dispatch(token.length > 0 ? connectToLastFM(token) : connectToLastFM())
                    }}>
                    Connect to LastFM
                  </Button>
                </Stack>
              )}
            </Stack>
          </Tabs.Panel>
          <Tabs.Panel value="plugins">
            <Stack pt="xs">
              <Title order={4}></Title>
            </Stack>
          </Tabs.Panel>
          {config.advancedOptions && (
            <Tabs.Panel value="custom" mx={-20} mb={-20}>
              <HookCreator hooks={[{}]} type="onSong" />
            </Tabs.Panel>
          )}
        </Tabs>
      </Modal>
    )
}

// const CodeEditor = React.lazy(() => import('./CodeEditor'))

interface Hook {}

interface HookCreatorProps {
  hooks: Hook[]
  type: 'onSong'
}

const hookDefaults = {
  onSong: `
  // This hook is called when 
`,
}

function HookCreator({ hooks, type }: HookCreatorProps) {
  const [hook, setHook] = React.useState(hookDefaults[type])
  return (
    <React.Suspense fallback={<Loader color="green" />}>
      {/* <CodeEditor
        code={hookDefaults[type]}
        language="typescript"
        onChange={(type, code) => {
          if (type === 'code') setHook(code)
        }}
        theme={'vs-dark'}
      /> */}
    </React.Suspense>
  )
}
