import React, { ReactElement, useEffect } from "react"
import { Drawer, Button, Group, Modal, Select } from "@mantine/core"
import { PeepoSingConfig } from "../../../shared/types/peepo-sings"

interface Props {
  opened: boolean
  toggle: () => void
}

export default function Settings({ opened, toggle }: Props): ReactElement {
  const [settings, setSettings] = React.useState<PeepoSingConfig | null>(null)

  const [audioDevices, setAudioDevices] = React.useState<MediaDeviceInfo[]>([])
  useEffect(() => {
    const doIt = async () => {
      //Get and display config
      setSettings((await window.electron.config.get()) as PeepoSingConfig)
      //Get and display audio devices
      const devices = await navigator.mediaDevices.enumerateDevices()
      const audioDevices = devices.filter((device) => device.kind === "audiooutput")
      setAudioDevices(audioDevices)
    }
    doIt()
  }, [])

  const changeSetting = function <T extends keyof PeepoSingConfig>(key: T, value: PeepoSingConfig[T]) {
    setSettings((cfg) => {
      cfg[key] = value
      return cfg
    })
    window.electron.config.set(key, value)
  }

  const onChange = (deviceId: string) => {
    changeSetting("outputDevice", deviceId)
  }
  if (settings === null)
    return (
      <Modal centered opened={opened} onClose={toggle}>
        Loading...
      </Modal>
    )
  else
    return (
      <Modal
        centered
        opened={opened}
        onClose={() => toggle()}
        title="Settings"
        padding="xl"
        size="lg"
        className="noDrag">
        <Group direction="column">
          <Select
            label="Audio Output Device"
            style={{ width: "50%" }}
            onChange={(e) => onChange(e)}
            defaultValue={
              audioDevices.find((device) => settings.outputDevice === device.deviceId)?.deviceId ||
              audioDevices[0]?.deviceId
            }
            data={audioDevices.map((dev) => ({ label: dev.label, value: dev.deviceId }))}
          />
        </Group>
      </Modal>
    )
}
