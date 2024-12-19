import { Icon } from '@iconify/react'
import { Group, Input, Button, ActionIcon, Center, Loader, ScrollArea, Stack, Popover } from '@mantine/core'
import type { ReactElement } from 'react'
import React from 'react'
import { debounce } from 'lodash'
import type { VideoSearchResult } from 'yt-search'
import { useDisclosure } from '@mantine/hooks'
// import { useAppDispatch } from '../store'
// import { addSong } from '../store/slices/songs'
import { notifications } from '@mantine/notifications'
import { useContextMenu } from 'react-contexify'
import { CTX_MENU, showPreviewSongModal } from './ContextMenus'
import { IpcEvents, PeepoMeta, VideoInfo } from '@peepo/core'

type Results = VideoSearchResult[]

export default function SongSearch(): ReactElement {
  const [search, setSearch] = React.useState('')
  const [songResults, setResults] = React.useState<Results>([])
  const [loading, toggleLoading] = React.useState(false)
  // const dispatch = useAppDispatch()

  const addSongFromUrl = (url?: string) => {
    if (url) window.electron.music.addSong(url)
    else window.electron.music.addSong(search)
  }

  const searchSongs = React.useCallback(
    debounce(async () => {
      if (search.length === 0) {
        toggleLoading(false)
        return
      }
      if (search.match(/(?<=(https?:\/\/|youtube\.com))/g)) {
        // window.electron.music.getVideoInfo(
        const video = videoInfoToVideoSearch(await window.electron.music.getVideoInfo(search))
        setResults([video])
        toggleLoading(false)

        return
      }
      try {
        console.log('Searching for:', search)
        const results = await window.electron.music.searchSongs(search)
        if (Array.isArray(results)) setResults(results)
        else {
          console.log('Search Results:', results)
          setResults([])
        }
      } catch (e) {
        console.error(e)
      } finally {
        toggleLoading(false)
      }
    }, 500),
    [toggleLoading, search]
  )
  const searchBox = React.useRef<HTMLInputElement>(null)

  // React.useEffect(() => {

  // }, [search])

  // const currentMood = useAppSelector((state) => state.currentSong.mood)
  // const dispatch = useAppDispatch()
  return (
    <div className="rounded-xl transition-all border-2 w-full border-green-500 overflow-hidden">
      <Input.Wrapper className="w-full top-0 bg-base-200 p-4" label="Add a Video:" style={{ height: '33%' }}>
        <Group className="w-full">
          <Input
            icon={<Icon icon="fas:music-note" />}
            id="add-song"
            ref={searchBox}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                e.stopPropagation()
                e.preventDefault()
                setSearch(e.currentTarget.value)
                toggleLoading(true)
                searchSongs()
              }
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.preventDefault()
              e.stopPropagation()
              setSearch(e.target.value)
              setResults([])
            }}
            data-autofocus
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
              toggleLoading(true)
              searchSongs()
              // addSongFromUrl()
            }}>
            Search
          </Button>
        </Group>
      </Input.Wrapper>
      <ScrollArea
        type="always"
        style={{
          display: (!loading && songResults.length === 0) || search.length < 1 ? 'none' : undefined,
          height: 250,
          scrollBehavior: 'smooth',
        }}>
        {loading ? (
          <Center className="h-24">
            <Loader variant="bars" />
          </Center>
        ) : (
          <Stack spacing={1}>
            {songResults.length === 1 &&
              songResults.map((result) => (
                <ResultView
                  // notifs={notifications}
                  type="direct"
                  key={result.videoId}
                  result={result}
                  onAdd={(result) => {
                    console.log('adding song: ', result)
                  }}
                />
              ))}
            {songResults.length > 1 &&
              songResults.map((result) => (
                <ResultView
                  type="search"
                  // notifs={notifs}
                  key={result.url}
                  result={result}
                  onAdd={(result) => {
                    console.log('added song: ', result)

                    // dispatch(addSong({ ...result, mood: currentMood ? [currentMood] : [] }))
                  }}
                />
              ))}
          </Stack>
        )}
      </ScrollArea>
    </div>
  )
}

type ResultViewProps = {
  type: 'direct' | 'search'
  result: VideoSearchResult | VideoInfo
  onAdd: (result: PeepoMeta) => void
  // notifs: NotificationsContextProps
}

function ResultView({ type, result, onAdd }: ResultViewProps): ReactElement {
  const { show } = useContextMenu({
    id: CTX_MENU.RESULTS,
    props: { result },
  })
  const [opened, { open, close }] = useDisclosure(false)
  const [hovering, setHover] = React.useState(false)
  const res = type === 'direct' ? (result as VideoInfo) : (result as VideoSearchResult)
  const imgSrc = type === 'direct' ? (res as VideoInfo)?.thumbnails?.[0]?.url : (res as VideoSearchResult)?.thumbnail
  const title = res.title
  const channel = type === 'direct' ? (res as VideoInfo).channel : (res as VideoSearchResult).author?.name
  const url = type === 'direct' ? (res as VideoInfo).webpage_url : (result as VideoSearchResult).url

  const tooltip = (
    <div className="flex place-content-center w-full h-full" onMouseLeave={close}>
      <Button onClick={() => window.electron.misc.openURL(url!)}>Video URL</Button>
    </div>
  )
  return (
    <div
      className="flex flex-col p-2 hover:bg-neutral-focus transition-all w-full "
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onContextMenu={(e) => {
        e.preventDefault()
        e.stopPropagation()
        show({ event: e, props: { url, title } })
      }}>
      <div className="flex flex-row transition-all h-16 w-full items-center">
        <Popover position="top" opened={opened} onClose={close} transitionProps={{ duration: 250 }} withArrow withinPortal zIndex={9999}>
          <Popover.Target>
            <div className="h-16 min-w-32" onMouseEnter={open}>
              <img src={imgSrc || undefined} className="h-full aspect-video rounded-lg" />
            </div>
          </Popover.Target>
          <Popover.Dropdown>{tooltip}</Popover.Dropdown>
        </Popover>
        <div className="inline-flex  flex-col p-2 truncate max-w-sm">
          <div className="text-lg">{title}</div>
          <div className="text-sm">{channel}</div>
        </div>
        <div className="flex-grow" />
        <ActionIcon variant="filled" onClick={() => showPreviewSongModal({ title: title!, url: url! })}>
          <Icon icon="fas:play" />
        </ActionIcon>
        <ActionIcon
          mr="10px"
          variant="filled"
          onContextMenu={(e) => {
            e.preventDefault()
            console.log(result)
          }}
          onClick={
            ((e) => {
              result = result
              e.stopPropagation()
              e.preventDefault()
              if (result && result !== null) {
                notifications.show({
                  id: result.title,
                  title: `Downloading ${result.title}`,
                  loading: true,
                  message: 'Starting Download',
                  autoClose: false,
                })
                console.log('URL:', (result as VideoInfo).webpage_url ? (result as VideoInfo).webpage_url : (result as VideoSearchResult).url)
                ipc
                  .callMain(IpcEvents.MUSIC_ADD, (result as VideoInfo).webpage_url ? (result as VideoInfo).webpage_url : (result as VideoSearchResult).url || '')
                  .then((addedInfo) => {
                    onAdd(addedInfo as PeepoMeta)
                  })
                  .catch((err) => {
                    console.error(err)
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

function videoInfoToVideoSearch(video: VideoInfo): VideoSearchResult {
  return {
    title: video.title ?? 'Unknown',
    description: video.description ?? 'No Description',
    type: 'video',
    url: video.webpage_url ?? '',
    thumbnail: video.thumbnails?.[0].url,
    author: {
      name: video.channel ?? 'Unknown',
      url: video.channel_url ?? '',
    },
    ago: video.upload_date ?? 'Unknown',
    views: video.view_count ?? 0,
    duration: {
      seconds: video.duration ?? 0,
      timestamp: video.duration_string ?? '0:00',
    },
    image: video.thumbnails?.[0].url ?? '',
    seconds: video.duration ?? 0,
    timestamp: video.duration_string ?? '0:00',
    videoId: video.id ?? '',
  }
}
