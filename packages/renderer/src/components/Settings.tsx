import React, { ReactElement, useEffect } from "react"
import { Drawer, Button, Group, Modal } from "@mantine/core"
import { PeepoSingConfig } from "../../../../types/store"

interface Props {
  opened: boolean
  toggle: () => void
}

export default function Settings({ opened, toggle }: Props): ReactElement {
  const [settings, setSettings] = React.useState<PeepoSingConfig | null>(null)
  useEffect(() => {
    const doIt = async () => setSettings((await window.electron.config.get()) as PeepoSingConfig)
    doIt()
  }, [])
  if (!settings)
    return (
      <Modal centered opened={opened} onClose={toggle}>
        Loading...
      </Modal>
    )
  return (
    <Modal centered opened={opened} onClose={() => toggle()} title="Settings" padding="xl" size="lg" className="noDrag">
      <Group direction="column"></Group>
    </Modal>
  )
}
