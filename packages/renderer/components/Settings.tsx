import type { ReactElement } from 'react'
import React, { useEffect } from 'react'
import { Drawer, Button, Group, Modal, Select, Checkbox, Text, TextInput, Stack } from '@mantine/core'
import { PeepoSingConfig } from '@peepo/core'
import { useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../store'
import { connectToLastFM, setOutputDevice, toggleRunOnStartup } from '../store/slices/config'

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
      <Modal centered opened={opened} onClose={() => toggle()} title="Settings" padding="xl" size="lg" className="noDrag">
        <Stack>
          {audioDevices.length !== 0 ? (
            <Select
              label="Audio Output Device"
              style={{ width: '50%' }}
              onChange={(e: string) => onChange(e)}
              defaultValue={audioDevices.find((device) => config.outputDevice === device.deviceId)?.deviceId || audioDevices[0].deviceId}
              data={audioDevices.map((dev) => ({ label: dev.label, value: dev.deviceId }))}
            />
          ) : (
            <Group>Loading Audio Devices (or none found)</Group>
          )}
          <Checkbox checked={config.runOnStartup} label="Launch on Startup" onChange={() => toggleRunOnStartup(dispatch)} />
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
      </Modal>
    )
}
