import { Icon } from "@iconify/react"
import { Button } from "@mantine/core"
import React, { useEffect, useState } from "react"
import { getOS, OSString } from "../util/utils"

interface Props {
  onClick: (os: OSString) => void
}

const mapOStoIcon = (os: OSString) => {
  switch (os) {
    case "MacOS":
      return "fab:apple"
    case "Windows":
      return "fab:windows"
    case "Linux":
      return "fab:linux"
    case "UNIX":
      return "fab:linux"
    default:
      return "fas:question"
  }
}

export default function DownloadButton({ onClick }: Props) {
  const [os, setOS] = useState<OSString>("Unknown OS")
  useEffect(() => {
    setOS(getOS())
  }, [])
  return (
    <Button
      onClick={() => {
        onClick(os)
      }}
      leftIcon={<Icon icon={mapOStoIcon(os)} />}
      variant="gradient"
      gradient={{ from: "indigo", to: "cyan", deg: 30 }}>
      Download for {os}
    </Button>
  )
}
