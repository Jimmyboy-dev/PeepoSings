import { Icon } from "@iconify/react"
import { Box, Button, Container, Group, Header, Image, Portal, Progress, Slider, Space, Text } from "@mantine/core"
import { useBooleanToggle, useLocalStorageValue } from "@mantine/hooks"
import { observer } from "mobx-react-lite"
import React, { ReactElement, useContext, useEffect } from "react"
import { MusicStore } from "../store"
import { CurrentSongContext } from "../hooks/useCurrentSong"
import { useStore } from "../store"
import PeepoSings from "./PeepoSings"
import { useSessionStorage } from "../hooks/useSessionStorage"

interface Props {
  musicStore: MusicStore
}

function AudioPlayer({ musicStore }: Props): ReactElement {
  const [playing, setPlaying] = useBooleanToggle(false)

  const [progress, setProgress] = React.useState(0)
  const [source, setSource] = React.useState("")
  const [volume, setVol] = useSessionStorage<string>("volume", "1")

  const audio = React.useRef<HTMLAudioElement>(null)
  const song = musicStore.lastSong

  const onProgress = (e: any) => {
    if (audio.current) {
      const { currentTime, duration } = audio.current
      if (currentTime === duration) {
        setPlaying(false)
      }
      setProgress((currentTime / duration) * 100)
    }
  }

  const audioPlay = () => audio.current?.play().catch((e) => console.error(e, audio))

  useEffect(() => {
    setVol(volume.toString())
  }, [volume])

  useEffect(() => {
    if (!audio.current) return
    if (playing) {
      audioPlay()
    } else {
      audio.current.pause()
    }
  }, [playing])

  useEffect(() => {
    if (!song || !audio.current) return
    setSource(`resource://${song.filePath}`)
    setPlaying(false)
    audio.current.load()
    setProgress(0)
  }, [song])
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === " ") {
        setPlaying()
        console.log("space pressed")
      }
    }
    document.addEventListener("keydown", listener, true)
    return () => {
      document.removeEventListener("keydown", listener)
    }
  }, [])

  return (
    <Portal target={document.getElementById("portals") as HTMLDivElement} zIndex={9999}>
      <Group
        direction="column"
        spacing={0}
        className="justify-end gap-0"
        style={{ position: "absolute", width: "100vw", height: "100vh" }}>
        <PeepoSings talk={playing} />

        <div style={{ pointerEvents: "all" }} className="w-full z-10 bg-neutral h-32 bottom-0  m-0">
          <Progress className="absolute rounded-none w-full m-0" value={progress} />
          <audio ref={audio} src={source} onCanPlayThrough={() => setPlaying(true)} onTimeUpdate={onProgress}></audio>
          <Group direction="row" className="w-full h-full px-4 flex-nowrap">
            <Button className="rounded-full bg-green-500 text-lg w-10 h-10 p-0" onClick={() => setPlaying()}>
              {playing ? <Icon icon="fas:pause" /> : <Icon icon="fas:play" />}
            </Button>
            {song !== null && song.albumArt && (
              <div className="rounded-xl overflow-hidden">
                <img className="h-24 w-24 p-2 object-cover " src={song.albumArt}></img>
              </div>
            )}
            <Group className="justify-center gap-0 flex-grow truncate " direction="column">
              <Text className="text-lg font-bold">{song?.title || "No Song Selected"}</Text>
              <Text className="text-md font-semibold">{song?.artist || "No Song Selected"}</Text>
            </Group>
            <Slider
              className="w-32 p-4"
              min={0}
              step={1}
              max={100}
              value={Math.round(parseFloat(volume) * 100)}
              onChange={(e) => {
                setVol((e / 100).toString())
                if (audio.current) audio.current.volume = e / 100
              }}></Slider>
          </Group>
        </div>
      </Group>
    </Portal>
  )
}

export default observer(AudioPlayer)
