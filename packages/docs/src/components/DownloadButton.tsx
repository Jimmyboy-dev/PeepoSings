import { Icon, InlineIcon } from "@iconify/react"
import { Anchor, Button, Divider, Group } from "@mantine/core"
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
    <Group direction="column">
      <Button
        onClick={() => {
          onClick(os)
        }}
        size="xl"
        leftIcon={<InlineIcon icon={mapOStoIcon(os)} />}
        component="a"
        variant="gradient"
        gradient={{ from: "indigo", to: "cyan", deg: 30 }}
        href={mapOStoLink[os]}
        target="_blank">
        Download for {os}
      </Button>
      <div className="flex flex-row items-center justify-evenly gap-1 h-6 w-full">
        <Anchor
          className="hover:font-semibold hover:no-underline hover:text-blue-300 transition-colors duration-200 w-1/2"
          href="https://github.com/Jimmyboy-dev/PeepoSings/releases/latest"
          target="_blank">
          Latest Release
        </Anchor>
        <div className="h-full w-0.5 opacity-60 bg-gray-400 rounded-full" />
        <Anchor
          className="hover:font-semibold hover:no-underline hover:text-blue-300 transition-colors duration-200 w-1/2"
          href="https://github.com/Jimmyboy-dev/PeepoSings/releases"
          target="_blank">
          Previous Versions
        </Anchor>
      </div>
    </Group>
  )
}
