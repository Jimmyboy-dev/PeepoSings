import { useEffect, useState } from "react"
import { Title } from "@mantine/core"
import DownloadButton from "../components/DownloadButton"
import { useNavigate } from "react-router"
import { Icon, InlineIcon } from "@iconify/react"
import PromoMessage from "../components/PromoMessage"

type Props = {}

export default function Home({}: Props) {
  const navigate = useNavigate()
  return (
    <header className="App-header flex z-20 flex-col gap-4 pb-32">
      <Title
        className="text-8xl text-pink-400 select-none"
        style={{ filter: "drop-shadow(10px 10px 5px rgba(0,0,0,0.6))" }}>
        Peepo Sings <InlineIcon icon="fas:music-note" />
      </Title>
      <div className="h-24" />
      <Title className="select-none" order={1}>
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
    </header>
  )
}
