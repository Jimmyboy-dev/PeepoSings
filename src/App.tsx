import { Col, Grid } from "@mantine/core"
import React, { ReactElement } from "react"
import Chat from "./components/Chat"
import TitleBar from "./TitleBar"

interface Props {}

export default function App({}: Props): ReactElement {
  return (
    <div className="flex flex-col items-stretch h-full ">
      <TitleBar />
      <Grid className="w-full text-neutral-content h-full p-2">
        <Col span={3}>
          <Chat />
        </Col>
        <Col span={6}></Col>
      </Grid>
    </div>
  )
}
