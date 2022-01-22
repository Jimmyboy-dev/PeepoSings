import { Icon } from "@iconify/react"
import {
  Box,
  Button,
  Container,
  Group,
  Header,
  Image,
  Portal,
  Progress,
  Slider,
  Space,
  Text,
  Tooltip,
} from "@mantine/core"
import { useBooleanToggle, useLocalStorageValue } from "@mantine/hooks"
import React, { ReactElement, useContext, useEffect } from "react"
import { CurrentSongContext } from "../hooks/useCurrentSong"
import { useConfig, useMusic } from "../store"
import PeepoSings from "./PeepoSings"
import { useSessionStorage } from "../hooks/useSessionStorage"

interface Props {}

function AudioPlayer({}: Props): ReactElement {
  const [playing, setPlaying] = useBooleanToggle(false)
  const [repeat, setRepeat] = useBooleanToggle(false)
  const [shuffle, setShuffle] = useBooleanToggle(false)

  const [progress, setProgress] = React.useState(0)
  const [source, setSource] = React.useState("")
  const [audioDevice, setDevice] = useConfig<string, null>("outputDevice", null)

  useEffect(() => {
    if (audioDevice !== null && audio.current) audio.current.setSinkId(audioDevice)
  }, [audioDevice])

  const [volume, setVol] = useSessionStorage<string>("volume", "1")

  const audio = React.useRef<HTMLAudioElement & { setSinkId(deviceId: string): void }>(null)
  const { currentSong: song, setCurrentSong, currentSongIndex, songs } = useMusic()

  const calcProgress = function (currentTime: number) {
    if (audio.current) {
      return (currentTime - song.in) / (song.duration - song.in - (song.duration - song.out))
    }
  }
  const calcTime = function (percent: number) {
    if (song) {
      return percent * (song.duration - song.in - (song.duration - song.out)) + song.in
    }
  }
  const onProgress = (e: any) => {
    if (audio.current) {
      const { currentTime, duration } = audio.current
      if (currentTime === duration || currentTime >= song.out) {
        nextSong()
      }
      setProgress(calcProgress(currentTime) * 100)
    }
  }

  const audioPlay = () => audio.current?.play().catch((e) => console.error(e, audio))

  const nextSong = () => {
    if (song && audio.current) {
      if (repeat) {
        audio.current.currentTime = song.in
        audioPlay()
      } else if (shuffle) {
      } else {
        if (currentSongIndex === songs.length - 1) setCurrentSong(songs[0])
        else setCurrentSong(songs[currentSongIndex + 1])
      }
    }
  }

  const onSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX } = e
    const { offsetLeft, offsetWidth } = e.currentTarget
    const percent = (clientX - offsetLeft) / offsetWidth
    if (audio.current) audio.current.currentTime = calcTime(percent)
  }

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
    setProgress(song.in)
    audio.current.currentTime = song.in || 0
  }, [song])
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === " ") {
        setPlaying()
        console.log("space pressed")
      }
    }

    const l = window.electron.listeners.togglePlay(() => {
      setPlaying()
    })

    document.body.addEventListener("keypress", listener, true)
    return () => {
      document.removeEventListener("keypress", listener)
      l()
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
          <Progress
            className="absolute rounded-none w-full m-0"
            value={progress}
            styles={{
              label: { display: "none" },
              root: {
                transition: "transform 0.2s ease-in-out",
                transformOrigin: "bottom",
                "&:hover": {
                  transform: "scaleY(2)",
                },
              },
            }}
            onClick={onSeek}
            style={{ cursor: "pointer" }}
          />
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
            <Group className="justify-center gap-2 truncate " direction="row">
              <Tooltip label="Mark In">
                <Button
                  disabled={!song}
                  className="text-lg w-8 h-8 p-0"
                  onClick={() => window.electron.music.saveSong({ ...song, in: song.duration * (progress / 100) })}
                  onContextMenu={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    window.electron.music.saveSong({ ...song, in: 0 })
                  }}>
                  <Icon icon="fas:bracket-curly" />
                </Button>
              </Tooltip>
              <Tooltip label="Mark Out">
                <Button
                  disabled={!song}
                  className="text-lg w-8 h-8 p-0"
                  onClick={() => window.electron.music.saveSong({ ...song, out: song.duration * (progress / 100) })}
                  onContextMenu={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    window.electron.music.saveSong({ ...song, out: song.duration })
                  }}>
                  <Icon icon="fas:bracket-curly-right" />
                </Button>
              </Tooltip>
            </Group>

            <Slider
              className="w-24 "
              min={0}
              step={1}
              max={100}
              value={Math.round(parseFloat(volume) * 100)}
              onChange={(e) => {
                setVol((e / 100).toString())
                if (audio.current) audio.current.volume = e / 100
              }}></Slider>
            <Group className="justify-center gap-1 p-1 truncate " direction="row">
              <Tooltip label="Repeat">
                <Button className="text-lg w-8 h-8 p-0" onClick={() => setRepeat()}>
                  <Icon icon={repeat ? "fas:repeat" : "fat:repeat"} />
                </Button>
              </Tooltip>
              <Tooltip label="Shuffle">
                <Button className="text-lg w-8 h-8 p-0" onClick={() => setShuffle()}>
                  <Icon icon={shuffle ? "fas:shuffle" : "fat:shuffle"} />
                </Button>
              </Tooltip>
            </Group>
          </Group>
        </div>
      </Group>
    </Portal>
  )
}

export default AudioPlayer
