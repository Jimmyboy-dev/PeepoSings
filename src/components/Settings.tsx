import React, { ReactElement } from "react"
import { Drawer, Button, Group, Modal } from "@mantine/core"

interface Props {
  opened: boolean
  toggle: () => void
}

export default function Settings({ opened, toggle }: Props): ReactElement {
  return (
    <Modal centered opened={opened} onClose={() => toggle()} title="Settings" padding="xl" size="lg" className="noDrag">
      <Group direction="column"></Group>
    </Modal>
  )
}
