import { Icon } from '@iconify/react'
import { Group, Input, Button, ActionIcon, Center, Loader, ScrollArea, Tooltip, Stack } from '@mantine/core'
import type { KeyboardEvent, ReactElement } from 'react'
import React from 'react'
import { debounce } from 'lodash'
import type { Playlist, Video } from 'ytsr'
import { useDisclosure } from '@mantine/hooks'
import type { MoreVideoDetails, videoInfo } from 'ytdl-core'
import { useAppDispatch, useAppSelector } from '../store'
import { addSong } from '../store/slices/songs'
import { showNotification, useNotifications } from '@mantine/notifications'
import type { NotificationsContextProps } from '@mantine/notifications/lib/types'
import { useContextMenu } from 'react-contexify'
import { CTX_MENU } from './ContextMenus'

type Results = Video[] | videoInfo[] | Playlist[]

export default function SongSearch(): ReactElement {
  const [search, setSearch] = React.useState('')
  const [songResults, setResults] = React.useState<Results>([])
  const [loading, { open, close, toggle }] = useDisclosure(false)

  const notifs = useNotifications()

  const addSongFromUrl = (url?: string) => {
    if (url) window.electron.music.addSong(url)
    else window.electron.music.addSong(search)
  }

  const searchSongs = React.useCallback(
    debounce(async (searchText: string) => {
      if (searchText.length === 0) {
        close()
        return
      }
      if (searchText.match(/(?<=(https?:\/\/|youtube\.com))/g)) {
        // window.electron.music.getVideoInfo(
        const video = await window.electron.music.getVideoInfo(searchText)
        setResults([video])
        close()

        return
      }
      try {
        const results = await window.electron.music.searchSongs(searchText)
        setResults(results?.items.filter((res) => res.type === 'video' || res.type === 'playlist') as Video[] | Playlist[])
      } catch (e) {
        console.error(e)
      }
      close()
    }, 500),
    [close]
  )
  const searchBox = React.useRef<HTMLInputElement>(null)

  // React.useEffect(() => {

  // }, [search])

  const currentMood = useAppSelector((state) => state.currentSong.mood)
  const dispatch = useAppDispatch()
  return (
    <div className="rounded-xl transition-all border-2 w-full border-green-500 overflow-hidden">
      <Input.Wrapper className="w-full top-0 bg-base-200 p-4" label="Add a Video:" style={{ height: '33%' }}>
        <Group className="w-full">
          <Input
            icon={<Icon icon="fas:music-note" />}
            id="add-song"
            ref={searchBox}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === ' ') {
                e.stopPropagation()
                e.bubbles = false
                // e.preventDefault()
              } else if (e.key === 'Enter') {
                e.stopPropagation()
                e.preventDefault()
                setSearch(e.currentTarget.value)
                open()
                searchSongs(e.currentTarget.value)
              }
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.preventDefault()
              e.stopPropagation()
              setSearch(e.target.value)
              setResults([])
            }}
            placeholder="Search or Enter URL..."
            className="flex-grow"
            rightSectionWidth={36}
            rightSection={
              searchBox.current &&
              searchBox.current.value.length > 0 && (
                <ActionIcon
                  radius="xl"
                  onClick={() => {
                    setSearch('')
                    searchBox.current!.value = ''
                  }}>
                  <Icon icon="fas:xmark" />
                </ActionIcon>
              )
            }
          />
          <Button
            variant="filled"
            disabled={search.length === 0}
            onClick={() => {
              open()
              searchSongs(searchBox.current!.value)
              // addSongFromUrl()
            }}>
            Search
          </Button>
        </Group>
      </Input.Wrapper>
      <ScrollArea
        type="hover"
        style={{
          display: !loading && songResults.length === 0 ? 'none' : undefined,
          height: 250,
          scrollBehavior: 'smooth',
        }}>
        <div>
          {loading ? (
            <Center className="h-24">
              <Loader variant="bars" />
            </Center>
          ) : (
            <Stack spacing={1}>
              {songResults.length === 1 &&
                (songResults as videoInfo[]).map((result: videoInfo) => (
                  <ResultView
                    notifs={notifs}
                    type="direct"
                    key={result.videoDetails.videoId}
                    result={result}
                    onAdd={(result) => {
                      console.log('added song: ', result)
                      dispatch(addSong({ ...result, mood: currentMood ? [currentMood] : [] }))
                    }}
                  />
                ))}
              {songResults.length > 1 &&
                (songResults as Video[] | Playlist[]).map((result: Video | Playlist) => (
                  <ResultView
                    type="search"
                    notifs={notifs}
                    key={result.url}
                    result={result}
                    onAdd={(result) => {
                      console.log('added song: ', result)

                      dispatch(addSong({ ...result, mood: currentMood ? [currentMood] : [] }))
                    }}
                  />
                ))}
            </Stack>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

type ResultViewProps = {
  type: 'direct' | 'search'
  result: Video | Playlist | videoInfo
  onAdd: (result: SongJSON) => void
  notifs: NotificationsContextProps
}

function ResultView({ type, result, onAdd, notifs }: ResultViewProps): ReactElement {
  const { show } = useContextMenu({
    id: CTX_MENU.RESULTS,
  })
  // const [opened, open] = useBooleanToggle(false)
  const [hovering, setHover] = React.useState(false)
  const res = type === 'direct' ? (result as videoInfo).videoDetails : (result as Video | Playlist)
  const imgSrc = type === 'direct' ? (res as videoInfo['videoDetails'])?.thumbnails[0]?.url : (res as Video)?.bestThumbnail?.url || (res as Playlist)?.firstVideo?.bestThumbnail.url
  const title = res.title
  const channel = type === 'direct' ? (res as videoInfo['videoDetails']).author?.name : (res as Video).author?.name || (res as Playlist)?.owner?.name
  const url = type === 'direct' ? (res as MoreVideoDetails).video_url : (result as Video | Playlist).url

  const tooltip = (
    <div className="">
      <Button onClick={() => window.electron.misc.openURL(url)}>Video URL</Button>
    </div>
  )
  return (
    <div
      className="flex flex-col p-2  hover:bg-neutral-focus transition-all w-full -z-0"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onContextMenu={(e) => {
        e.preventDefault()
        e.stopPropagation()
        show(e, { props: { url, title } })
      }}>
      <div className="flex flex-row transition-all h-16 w-full items-center ">
        <Tooltip label={tooltip} closeDelay={500}>
          <div className="h-16 min-w-32">
            <img src={imgSrc || undefined} className="h-full aspect-video rounded-lg" />
          </div>
        </Tooltip>
        <div className="inline-flex  flex-col p-2 truncate max-w-sm">
          <div className="text-lg">{title}</div>
          <div className="text-sm">{channel}</div>
        </div>
        <div className="flex-grow" />
        <ActionIcon
          mr="10px"
          variant="filled"
          onClick={
            ((e) => {
              result = result as Video | Playlist
              e.stopPropagation()
              e.preventDefault()
              if (result && result !== null) {
                showNotification({
                  id: result.title,
                  title: `Downloading ${result.title}`,
                  loading: true,
                  message: 'Starting Download',
                  autoClose: false,
                  disallowClose: true,
                })
                window.electron.music.addSong(result.type === 'video' ? result.url : result.firstVideo?.url || '').then((addedInfo) => {
                  onAdd(addedInfo)
                })
              }
            }) as React.MouseEventHandler<HTMLButtonElement>
          }>
          <Icon icon="fas:download" />
        </ActionIcon>
      </div>
    </div>
  )
}
