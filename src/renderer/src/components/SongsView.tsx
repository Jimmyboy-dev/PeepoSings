import { ActionIcon, Badge, Box, Checkbox, Divider, FocusTrap, Group, MultiSelect, Stack, Title, Tooltip } from '@mantine/core'
import type { ReactElement } from 'react'
import React from 'react'
import { Icon } from '@iconify/react'
import { useAppDispatch, useAppSelector } from '../store'
import { setCurrentSong } from '../store/slices/currentSong'
import { editSong, removeSong, setSongMood } from '../store/slices/songs'
import { toggleCompactSongView } from '../store/slices/config'
import { IpcEvents, MoodJSON, PeepoMeta } from '@peepo/core'
import peepoPanic from '../assets/peepoPanic.webp'
import FavoriteButton from './FavoriteButton'
import { useContextMenu } from 'react-contexify'
import { CTX_MENU } from './ContextMenus'
import { useFocusTrap } from '@mantine/hooks'

interface Props {
  songs?: PeepoMeta[]
}

const SongsView = ({ songs: _songs }: Props): ReactElement => {
  const focusTrapRef = useFocusTrap()
  const songList = useAppSelector((store) => store.songs)
  const currentMood = useAppSelector((store) => store.currentSong.mood)
  const compact = useAppSelector((store) => store.config.compactSongView)

  const songs = currentMood !== -1 ? songList.filter((song) => song.mood.some((m) => m.id === currentMood)) : songList
  const dispatch = useAppDispatch()
  return (
    <Box className="flex flex-col gap-1 bg-gray-800 p-2 rounded-lg w-full">
      <div className="flex flex-row px-4">
        <div className="flex-grow" />
        <Checkbox className=" font-semibold" label="Compact View" checked={compact} onChange={(e) => dispatch(toggleCompactSongView(e.target.checked))} />
      </div>
      <Divider className="mt-2 mb-1 -mx-2 rounded-full" size="xs" />
      <Stack className={`w-full ${songs.length !== 0 ? 'mb-24' : ''}`} spacing={compact ? 0 : 16} ref={focusTrapRef}>
        {songs.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <Title order={2} sx={{ textShadow: '-4px 4px 2px rgba(0,0,0,0.6)' }}>
              No songs found
            </Title>
            <img className="mt-6" src={peepoPanic} draggable={false} alt="No songs found" />
          </div>
        ) : (
          songs.map((song, i) => <SongView compact={compact} song={song} setCurSong={() => dispatch(setCurrentSong(song.id))} key={song.id} />)
        )}
      </Stack>
    </Box>
  )
}
export default SongsView

const SongView = ({ song, index, compact, setCurSong }: { song: PeepoMeta; index?: number; compact?: boolean; setCurSong: (song?: number) => void }) => {
  const [canSetCurSong, setCanSetCurSong] = React.useState(true)
  const { show } = useContextMenu({
    id: CTX_MENU.SONG,
    props: song,
  })
  const dispatch = useAppDispatch()
  const moods = useAppSelector((store) => store.moods)
  const currentSong = useAppSelector((store) => store.currentSong.song)

  const isCurrentSong = currentSong === index

  return (
    <div
      tabIndex={0}
      className={`flex flex-row items-center w-full text-gray-100 select-none ${
        compact
          ? 'h-8 p-0 m-0 border-b-2 border-gray-300'
          : 'cursor-pointer p-2 rounded-lg h-24 hover:bg-base-100 transition-colors hover:font-semibold focus:outline outline-2 outline-hidden outline-white'
      } ${isCurrentSong ? 'font-black bg-slate-400' : ''}`}
      onClick={(e) => {
        if (e.isPropagationStopped()) return
        if (canSetCurSong) {
          setCurSong()
        }
      }}
      onDragStart={(event) => {
        event.preventDefault()
        window.electron.file.startDrag(song.path)
      }}
      onContextMenu={(e) =>
        show({
          props: song,
          event: e,
        })
      }>
      <FavoriteButton
        tabIndex={-1}
        liked={song.favorite}
        onMouseEnter={() => setCanSetCurSong(false)}
        onMouseLeave={() => setCanSetCurSong(true)}
        onClick={() => {
          dispatch(
            editSong({
              ...song,
              favorite: !song.favorite,
            })
          )
        }}
      />
      {/* {!compact && (
        <Tooltip label="Open in Explorer" position="left">
          <ActionIcon className="mx-1" onClick={() => window.electron.music.openLocation(song.path)}>
            <Icon icon="fas:arrow-up-right-from-square" />
          </ActionIcon>
        </Tooltip>
      )} */}
      <img src={song.thumbnail} className={`h-full object-cover ${compact ? 'aspect-square rounded-full p-1' : 'rounded-xl'}`} />
      <div className={`flex  ${compact ? 'flex-row gap-2 items-center flex-nowrap ml-2' : 'flex-col ml-4 flex-grow justify-center'}`}>
        <span className="truncate text-sm w-96 transition-all font-medium">{song.title}</span>
        <span className="font-semibold text-sm">{song.artist}</span>
      </div>
      {!compact && (
        <MultiSelect
          tabIndex={-1}
          value={song.mood.map((m) => m.id?.toString())}
          onMouseEnter={() => setCanSetCurSong(false)}
          onMouseLeave={() => setCanSetCurSong(true)}
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
          }}
          onChange={(v) => dispatch(setSongMood({ songId: song.id, moodId: v.map?.((sel) => +sel) }))}
          data={Object.values(moods).map((mood: MoodJSON) => ({ label: mood.name, value: mood.id.toString() }))}
          nothingFound="Nothing found"
        />
      )}
      {!compact && (
        <ActionIcon
          tabIndex={-1}
          className="ml-auto hover:text-red-400"
          onMouseEnter={() => setCanSetCurSong(false)}
          onMouseLeave={() => setCanSetCurSong(true)}
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation()
            e.preventDefault()
            dispatch(setCurrentSong(-1))
            setTimeout(() => {
              dispatch(removeSong(song))
              ipc.callMain(IpcEvents.DB_REMOVE, ['song', { path: song.path }])
            }, 250)
          }}>
          <Icon icon="fas:trash" />
        </ActionIcon>
      )}

      {compact && (
        <>
          <div className="flex-grow" />
          <div className="flex flex-row gap-1 items-center">
            {song.mood?.map(
              (mood, i) =>
                mood.id && (
                  <Badge
                    key={`${song.id}-mood-${i}`}
                    color={chooseRandomArrayValueSeeded(['cyan', 'blue', 'green', 'indigo', 'grape', 'violet', 'teal', 'lime', 'yellow', 'orange', 'pink', 'red'], mood.id)}>
                    {mood.name}
                  </Badge>
                )
            )}
          </div>
        </>
      )}
    </div>
  )
}
const strToNum = (strng: string) => strng.split('').reduce((a, b) => a + b.charCodeAt(0), 0)

function chooseRandomArrayValueSeeded<T>(array: T[], seed: number): T {
  const random = Math.sin(seed) * 10000
  return array[Math.floor(random % array.length)]
}
