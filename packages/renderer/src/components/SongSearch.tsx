import { Icon } from "@iconify/react"
import { InputWrapper, Group, Input, Button, Image, Text, Collapse, ActionIcon, Center, Loader } from "@mantine/core"
import React, { ChangeEvent, ReactElement } from "react"
import debounce from "lodash.debounce"
import throttle from "lodash.throttle"
import { SongModel } from "../store"
import { Item, Mix, Playlist, Video } from "ytsr"
import { useBooleanToggle } from "@mantine/hooks"
import { MoreVideoDetails, videoInfo } from "ytdl-core"

interface Props {}

type Results = Video[] | videoInfo[] | Playlist[]

export default function SongSearch({}: Props): ReactElement {
  const [search, setSearch] = React.useState("")
  const [songResults, setResults] = React.useState<Results>([])
  const [loading, toggleLoading] = useBooleanToggle(false)

  const addSong = (url?: string) => {
    if (url) window.electron.music.addSong(url)
    else window.electron.music.addSong(search)
  }

  const searchSongs = throttle(
    async () => {
      // e.preventDefault()
      if (search.length === 0) {
        toggleLoading(false)
        return
      }
      if (search.startsWith("https://")) {
        const video = await window.electron.music.getVideoInfo(search)
        setResults([video])
        return
      }
      try {
        const results = await window.electron.music.searchSongs(search)
        setResults(
          results?.items.filter((res) => res.type === "video" || res.type === "playlist") as Video[] | Playlist[]
        )
      } catch (e) {
        console.error(e)
      }
      toggleLoading(false)
    },
    500,
    { trailing: true }
  )

  React.useEffect(() => {
    toggleLoading(true)
    searchSongs()
  }, [search])

  return (
    <div className="rounded-xl transition-all border-2 w-full border-green-500  max-h-72 overflow-hidden">
      <InputWrapper className="w-full sticky top-0 bg-base-200 p-4 z-10" label="Add a Video:" style={{ height: "33%" }}>
        <Group className="w-full" direction="row">
          <Input
            icon={<Icon icon="fas:music-note" />}
            id="add-song"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            placeholder="Search or Enter URL..."
            className="flex-grow"
          />
          <Button variant="filled" disabled={!search.startsWith("https://")} onClick={() => addSong()}>
            Add
          </Button>
        </Group>
      </InputWrapper>
      {loading ? (
        <Center className="h-24">
          <Loader variant="bars" />
        </Center>
      ) : (
        <Group direction="column" className="overflow-y-scroll " style={{ maxHeight: "66%" }}>
          {songResults.length === 1 &&
            (songResults as videoInfo[]).map((result: videoInfo) => (
              <ResultView
                type="direct"
                key={result.videoDetails.videoId}
                result={result}
                onAdd={() => console.log("added", result.videoDetails.title)}
              />
            ))}
          {songResults.length > 1 &&
            (songResults as Video[] | Playlist[]).map((result: Video | Playlist) => (
              <ResultView
                type="search"
                key={result.url}
                result={result}
                onAdd={() => {
                  console.log("added", result.title)
                }}
              />
            ))}
        </Group>
      )}
    </div>
  )
}

type ResultViewProps = {
  type: "direct" | "search"
  result: Video | Playlist | videoInfo
  onAdd: (result: Video | Playlist | videoInfo) => void
}

function ResultView({ type, result, onAdd }: ResultViewProps): ReactElement {
  // const [opened, open] = useBooleanToggle(false)
  const [hovering, setHover] = useBooleanToggle(false)
  const res = type === "direct" ? (result as videoInfo).videoDetails : (result as Video | Playlist)
  const imgSrc =
    type === "direct"
      ? (res as videoInfo["videoDetails"])?.thumbnails[0]?.url
      : (res as Video)?.bestThumbnail?.url || (res as Playlist)?.firstVideo?.bestThumbnail.url
  const title = res.title
  const channel =
    type === "direct"
      ? (res as videoInfo["videoDetails"]).author?.name
      : (res as Video).author?.name || (res as Playlist)?.owner?.name
  return (
    <div
      className="flex flex-col p-2 max-w-xl hover:bg-neutral-focus transition-all -z-0"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <div className="flex flex-row h-16 items-center ">
        <div className="h-full min-w-32">
          <img src={imgSrc} className="h-full aspect-video rounded-lg" />
        </div>
        <div className="inline-flex  flex-col p-2 truncate max-w-sm">
          <div className="text-lg">{title}</div>
          <div className="text-sm">{channel}</div>
        </div>
        <div className="flex-grow" />
        <ActionIcon
          variant="filled"
          onClick={
            ((e) => {
              result = result as Video | Playlist
              e.stopPropagation()
              e.preventDefault()
              if (result && result !== null)
                window.electron.music
                  .addSong(result.type === "video" ? result.url : result.firstVideo?.url)
                  .then(() => {
                    onAdd(result)
                  })
            }) as React.MouseEventHandler<HTMLButtonElement>
          }>
          <Icon icon="fas:download" />
        </ActionIcon>
      </div>
      <Collapse in={hovering}>
        <Group direction="column" className="w-full">
          <Text className="text-sm">
            {type === "direct" ? (res as MoreVideoDetails).video_url : (result as Video | Playlist).url}
          </Text>
          <Group direction="row" className="w-full"></Group>
        </Group>
      </Collapse>
    </div>
  )
}
