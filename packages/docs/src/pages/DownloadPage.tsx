import { Center, Title } from "@mantine/core"
import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { useNavigate } from "react-router"
import { useTimeoutFn, useInterval } from "react-use"
type Props = {}

export default function DownloadPage({}: Props) {
  const [tm, setTm] = useState(3)
  const nav = useNavigate()
  useTimeoutFn(() => nav("/"), 3500)
  useInterval(() => {
    setTm((tm) => tm - 1)
  }, 1000)
  return (
    <Center className="w-screen h-screen">
      <Helmet>
        <title>Download</title>
      </Helmet>
      <Title>Thanks for downloading Peepo Sings!</Title>
      <br />
      <Title order={2}>Redirecting to Homepage in {tm}...</Title>
    </Center>
  )
}
