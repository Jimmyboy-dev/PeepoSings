import { useEffect, useState } from "react"
import { Title } from "@mantine/core"
import DownloadButton from "../components/DownloadButton"
import PeepoSings from "../components/PeepoSings"
import { useNavigate } from "react-router"
import { Icon, InlineIcon } from "@iconify/react"
import PromoMessage from "../components/PromoMessage"

type Props = {}

export default function Home({}: Props) {
  const navigate = useNavigate()
  return (
    <header className="App-header flex flex-col gap-4 pb-32">
      <Title className="text-8xl text-pink-400" style={{ filter: "drop-shadow(10px 10px 5px rgba(0,0,0,0.6))" }}>
        Peepo Sings <InlineIcon icon="fas:music-note" />
      </Title>
      <div className="h-24" />
      <Title order={1}>
        The First{" "}
        <span className="text-twitch-main">
          <InlineIcon className="mr-2" icon="fab:twitch" />
          Twitch
        </span>
        -Centric Music Player.
      </Title>
      <PromoMessage />
      <div className="h-24" />
      <DownloadButton
        onClick={(os) => {
          navigate(`/download`)
        }}
      />
      <div className="flex flex-row gap-1 "></div>
    </header>
  )
}
