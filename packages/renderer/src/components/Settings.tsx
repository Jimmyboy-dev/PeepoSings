import type { ReactElement} from "react"
import React, { useEffect } from "react"
import { Drawer, Button, Group, Modal, Select, Checkbox } from "@mantine/core"
import { PeepoSingConfig } from "../../../../types/store"
import { useSelector } from "react-redux"
import { useAppDispatch, useAppSelector } from "../store"
import { setOutputDevice, toggleRunOnStartup } from "../store/slices/config"

interface Props {
  opened: boolean
  toggle: () => void
}

export default function Settings({ opened, toggle }: Props): ReactElement {
  const config = useAppSelector((store) => store.config)
  const dispatch = useAppDispatch()

  const [audioDevices, setAudioDevices] = React.useState<MediaDeviceInfo[]>([])
  useEffect(() => {
    const doIt = async () => {
      //Get and display audio devices
      const devices = await navigator.mediaDevices.enumerateDevices()
      const audioDevices = devices.filter((device) => device.kind === "audiooutput")
      setAudioDevices(audioDevices)
    }
    doIt()
  }, [audioDevices, setAudioDevices])

  const onChange = (deviceId: string) => {
    dispatch(setOutputDevice(deviceId))
  }
  if (!config)
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
              audioDevices.find((device) => config.outputDevice === device.deviceId)?.deviceId ||
              audioDevices[0]?.deviceId
            }
            data={audioDevices.map((dev) => ({ label: dev.label, value: dev.deviceId }))}
          />
          <Checkbox
            checked={config.runOnStartup}
            label="Launch on Startup"
            onChange={() => toggleRunOnStartup(dispatch)}
          />
        </Group>
      </Modal>
    )
}
