import { Icon } from '@iconify/react'
import { Group, Input, Button, ActionIcon, Center, Loader, ScrollArea, Tooltip, Stack, Popover } from '@mantine/core'
import type { KeyboardEvent, ReactElement } from 'react'
import React from 'react'
import { debounce } from 'lodash'
import type { Playlist, Video } from 'ytsr'
import { useDisclosure } from '@mantine/hooks'
import { useAppDispatch, useAppSelector } from '../store'
import { addSong } from '../store/slices/songs'
import { showNotification, useNotifications } from '@mantine/notifications'
import type { NotificationsContextProps } from '@mantine/notifications/lib/types'
import { useContextMenu } from 'react-contexify'
import { CTX_MENU, showPreviewSongModal } from './ContextMenus'
import { IpcEvents, PeepoMeta, VideoInfo } from '@peepo/core'

type Results = Video[] | VideoInfo[] | Playlist[]

export default function SongSearch(): ReactElement {
  const [search, setSearch] = React.useState('')
  const [songResults, setResults] = React.useState<Results>([])
  const [loading, toggleLoading] = React.useState(false)

  const notifs = useNotifications()

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
        const video = await window.electron.music.getVideoInfo(search)
        setResults([video])
        toggleLoading(false)

        return
      }
      try {
        const results = await window.electron.music.searchSongs(search)
        setResults(results?.items.filter((res) => res.type === 'video' || res.type === 'playlist') as Video[] | Playlist[])
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
              (songResults as VideoInfo[]).map((result: VideoInfo) => (
                <ResultView
                  notifs={notifs}
                  type="direct"
                  key={result.id}
                  result={result}
                  onAdd={(result) => {
                    console.log('adding song: ', result)
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
  result: Video | Playlist | VideoInfo
  onAdd: (result: PeepoMeta) => void
  notifs: NotificationsContextProps
}

function ResultView({ type, result, onAdd, notifs }: ResultViewProps): ReactElement {
  const { show } = useContextMenu({
    id: CTX_MENU.RESULTS,
  })
  const [opened, { open, close }] = useDisclosure(false)
  const [hovering, setHover] = React.useState(false)
  const res = type === 'direct' ? (result as VideoInfo) : (result as Video | Playlist)
  const imgSrc = type === 'direct' ? (res as VideoInfo)?.thumbnails[0]?.url : (res as Video)?.bestThumbnail?.url || (res as Playlist)?.firstVideo?.bestThumbnail.url
  const title = res.title
  const channel = type === 'direct' ? (res as VideoInfo).channel : (res as Video).author?.name || (res as Playlist)?.owner?.name
  const url = type === 'direct' ? (res as VideoInfo).webpage_url : (result as Video | Playlist).url

  const tooltip = (
    <div className="flex place-content-center w-full h-full" onMouseLeave={close}>
      <Button onClick={() => window.electron.misc.openURL(url)}>Video URL</Button>
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
        show(e, { props: { url, title } })
      }}>
      <div className="flex flex-row transition-all h-16 w-full items-center">
        <Popover position="top" opened={opened} onClose={close} transitionDuration={250} withArrow withinPortal zIndex={9999}>
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
        <ActionIcon variant="filled" onClick={() => showPreviewSongModal({ title, url })}>
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
              result = result as Video | Playlist
              e.stopPropagation()
              e.preventDefault()
              if (result && result !== null) {
                showNotification({
                  id: result.title,
                  title: `Downloading ${result.title}`,
                  loading: true,
                  message: 'Starting Download',
                  autoClose: 10,
                  disallowClose: true,
                })
                ipc
                  .callMain(
                    IpcEvents.MUSIC_ADD,
                    (result as VideoInfo).webpage_url ? (result as VideoInfo).webpage_url : (result as Video).url ? (result as Video).url : (result as Playlist).firstVideo?.url || ''
                  )
                  .then((addedInfo: PeepoMeta) => {
                    onAdd(addedInfo)
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
