import React, { ReactElement } from "react"
import { Drawer, Button, Group } from "@mantine/core"

interface Props {
  opened: boolean
  toggle: () => void
}

export default function AppDrawer({ opened, toggle }: Props): ReactElement {
  return (
    <Drawer opened={opened} onClose={() => toggle()} title="Register" padding="xl" size="xl" className="noDrag">
      <Group direction="column"></Group>
    </Drawer>
  )
}
