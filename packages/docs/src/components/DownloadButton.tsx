import { Icon } from "@iconify/react"
import { Anchor, Button } from "@mantine/core"
import React, { useEffect, useState } from "react"
import { getOS, OSString } from "../util/utils"

interface Props {
  onClick: (os: OSString) => void
}

const mapOStoLink: { [key in OSString]: string } = {
  "Unknown OS": "https://github.com/Jimmyboy-dev/PeepoSings/releases/latest",
  Linux: "https://github.com/Jimmyboy-dev/PeepoSings/releases/latest/download/Peepo-Sings-Installer.AppImage",
  MacOS: "https://github.com/Jimmyboy-dev/PeepoSings/releases/latest/download/Peepo-Sings-Installer.dmg",
  UNIX: "https://github.com/Jimmyboy-dev/PeepoSings/releases/latest/download/Peepo-Sings-Installer.AppImage",
  Windows: "https://github.com/Jimmyboy-dev/PeepoSings/releases/latest/download/Peepo-Sings-Setup.exe",
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
      component="a"
      variant="gradient"
      gradient={{ from: "indigo", to: "cyan", deg: 30 }}
      href={mapOStoLink[os]}
      target="_blank">
      Download for {os}
    </Button>
  )
}
