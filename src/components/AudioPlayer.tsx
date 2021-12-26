import { Icon } from "@iconify/react"
import { Button, Container, Group, Header, Image, Progress, Slider, Space, Text } from "@mantine/core"
import { useBooleanToggle } from "@mantine/hooks"
import React, { ReactElement, useContext, useEffect } from "react"
import { CurrentSongContext } from "../hooks/useCurrentSong"

interface Props {}

export default function AudioPlayer({}: Props): ReactElement {
  const [playing, setPlaying] = useBooleanToggle(false)
  const { song, setSong } = useContext(CurrentSongContext)
  const [progress, setProgress] = React.useState(0)
  const [source, setSource] = React.useState("file://")
  const [volume, setVol] = React.useState(0)

  const audio = React.useRef<HTMLAudioElement>(null)

  const onProgress = (e: any) => {
    if (audio.current) {
      const { currentTime, duration } = audio.current
      if (currentTime === duration) {
        setPlaying(false)
      }
      setProgress((currentTime / duration) * 100)
    }
  }
  const audioPlay = () => audio.current.play().catch((e) => console.error(e, audio))

  useEffect(() => {
    if (audio.current) setVol(audio.current.volume * 100)
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
    if (!audio.current.paused) audio.current.pause()
    // console.log("Song changed: ", song)

    audio.current.src = song !== null ? `resource://${song.filePath}` : ""
    audio.current.load()
    setPlaying(true)
    // audioPlay()
  }, [song])
  return (
    <Container className="w-full bg-neutral h-32 relative bottom-0 p-0">
      <Progress className="absolute rounded-none w-full m-0" value={progress} />
      <audio ref={audio} src={source} onTimeUpdate={onProgress}></audio>
      <Group direction="row" className="w-full h-full">
        <Button className="rounded-full bg-green-500 text-lg w-10 h-10 p-0" onClick={(e) => setPlaying()}>
          {playing ? <Icon icon="fas:pause" /> : <Icon icon="fas:play" />}
        </Button>
        <Image
          className="h-24 w-24 p-2 rounded-sm"
          src={
            song !== null && song.albumArt
              ? song.albumArt
              : "https://cdn.betterttv.net/emote/6113113276ea4e2b9f768768/3x"
          }></Image>
        <Group className="justify-center gap-0" direction="column">
          <Text className="text-lg font-bold">{song?.title || "No Song Selected"}</Text>
          <Text className="text-md font-semibold">{song?.artist || "No Song Selected"}</Text>
        </Group>
        <div className="flex-grow" />
        <Slider
          className="w-32 p-4"
          min={0}
          step={1}
          max={100}
          value={volume}
          onChange={(e) => {
            setVol(e)
            audio.current.volume = e / 100
          }}></Slider>
      </Group>
    </Container>
  )
}
