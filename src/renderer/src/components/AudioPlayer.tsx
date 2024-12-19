import { Icon } from '@iconify/react'
import { ActionIcon, Button, Group, Affix, Progress, Slider, Stack, Text, Tooltip, Box } from '@mantine/core'
import type { MouseEventHandler, ReactElement } from 'react'
import React, { useEffect } from 'react'
import PeepoSings from './PeepoSings'
import { useAppDispatch, useAppSelector } from '../store'
import { setCurrentTime, setPlaying, setRepeat, setShuffle, setVolume } from '../store/slices/player'
import { addUpNext, nextSong, prevSong, setCurrentMood, setCurrentSong } from '../store/slices/currentSong'
import { throttle } from 'lodash'
import { editSong } from '../store/slices/songs'
import peepoShrug from '../assets/peepoShrug.png'
import { getHotkeyHandler, useDisclosure } from '@mantine/hooks'
import { motion } from 'framer-motion'
import EditableText from './EditableText'
import FavoriteButton from './FavoriteButton'
import ProgressSlider from './ProgressSlider'
import { PeepoMeta } from '../../core/src'

function AudioPlayer(): ReactElement {
  const dispatch = useAppDispatch()
  const { currentTime, duration, filter, playing, repeat, shuffle, volume } = useAppSelector((state) => state.player)
  const [{ song: currentSong, mood: curMood, queue, userDefinedQueue }, { moods }] = useAppSelector((state) => [state.currentSong, { moods: state.moods }])
  const songs = useAppSelector(
    (state) => state.songs,
    (a, b) => a.some((song, i) => b[i]?.path !== song?.path)
  )
  const [source, setSource] = React.useState('')
  const audioDevice = useAppSelector((state) => state.config.outputDevice)
  const upNext = songs.find((s) => s.id === [...userDefinedQueue, ...queue][0])

  const currentMood = curMood !== -1 ? moods.find((m) => m.id === curMood) : null

  const song = currentSong !== -1 ? songs.find((song) => song.id === currentSong) : null

  const audio = React.useRef<HTMLAudioElement & { setSinkId(deviceId: string): void }>(null!)
  const audioCtx = React.useRef<AudioContext>()

  const setSinkId = React.useCallback(() => {
    if (!audioDevice) return
    let shouldPlay = false
    if (playing) {
      audio.current.pause()
      shouldPlay = true
    }
    audio.current.setSinkId(audioDevice)
    if (shouldPlay)
      audio.current.play().catch((e) => {
        console.log(e.message)
      })
  }, [audioDevice, playing])

  useEffect(() => {
    audio.current.volume = volume
  }, [volume])
  useEffect(() => {
    setSinkId()
    const onPlay = () => {
      if (!audioCtx.current) {
        audioCtx.current = new AudioContext()
        const source = audioCtx.current.createMediaElementSource(audio.current!)
        const compressor = audioCtx.current.createDynamicsCompressor()
        compressor.threshold.value = -40
        compressor.knee.value = 40
        compressor.ratio.value = 12
        compressor.attack.value = 0
        compressor.release.value = 0.25

        source.connect(compressor)
        compressor.connect(audioCtx.current.destination)
      }
    }
    audio.current.addEventListener('play', onPlay)
    try {
      navigator.mediaSession.setActionHandler('play', (e) => {
        e.action === 'play' && dispatch(setPlaying(true))
      })
      navigator.mediaSession.setActionHandler('pause', () => {
        dispatch(setPlaying(false))
      })
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        dispatch(nextSong())
      })
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        dispatch(prevSong())
      })
    } catch (e) {
      console.log(e)
    } finally {
      return () => {
        if (audio.current) audio.current.removeEventListener('play', onPlay)
      }
    }
  }, [])
  const calcProgress = function (currentTime: number) {
    if (song && audio.current) {
      return (currentTime - song.in) / (song.duration - song.in - (song.duration - song.out))
    }
    return 0
  }

  const calcTime = function (percent: number) {
    if (song) {
      return percent * (song.duration - song.in - (song.duration - song.out)) + song.in
    }
    return 0
  }
  const onProgress = throttle((e: any) => {
    if (audio.current && song) {
      const { currentTime } = audio.current
      if (currentTime >= song.out) {
        advSong()
      }
      dispatch(setCurrentTime(calcProgress(currentTime)))
    }
  }, 750)

  const audioPlay = () => audio.current?.play().catch((e) => console.error(e))

  const advSong = () => {
    if (song && audio.current) {
      dispatch(nextSong())
    }
  }

  const onSeek = (percent: number) => {
    if (audio.current) audio.current.currentTime = calcTime(percent)
  }

  useEffect(() => {
    if (playing) {
      audioPlay()
    } else {
      audio.current.pause()
    }
  }, [playing])

  useEffect(() => {
    if (!song) {
      dispatch(setPlaying(false))
      return
    }
    setSource(`resource://${song.path}`)
    if (playing) {
      audio.current.load()
      dispatch(setPlaying(true))
    }
    dispatch(setCurrentTime(song.in))
    audio.current.currentTime = song.in || 0
  }, [currentSong, song])

  // useEffect(() => {
  //   const listener = getHotkeyHandler([
  //     [
  //       ' ',
  //       (e) => {
  //         if (e.currentTarget instanceof HTMLInputElement) return
  //         if (e.key === ' ') {
  //           dispatch(setPlaying())
  //           console.log('space pressed')
  //         }
  //       },
  //     ],
  //   ])

  //   document.body.addEventListener('keypress', listener)
  //   return () => {
  //     document.removeEventListener('keypress', listener)
  //   }
  // }, [])

  return (
    <>
      <audio ref={audio} src={source} onEnded={() => advSong()} onCanPlayThrough={(e) => playing && e.currentTarget.play()} onTimeUpdate={onProgress}></audio>
      <Stack spacing={0} className="justify-end gap-0 pointer-events-none" style={{ position: 'fixed', width: '100vw', height: '100vh', top: 0, left: 0, zIndex: 9999 }}>
        <PeepoSings talk={playing} />
        {curMood !== -1 && (
          <div
            onClick={() => {
              dispatch(setCurrentMood(-1))
              dispatch(setCurrentSong(-1))
            }}
            className="absolute
            pointer-events-auto cursor-pointer  right-0 bottom-32 bg-slate-700 text-white h-12 rounded-tl-lg p-2">
            <Tooltip className="flex flex-row  items-center" position="top" label="Clear Current Mood?">
              <div className="">
                <span className="font-semibold mr-1">Current Mood:</span>

                <span className="font-bold text-lg bg-slate-800 rounded-lg py-1 px-2" style={{ color: currentMood?.color }}>
                  <Icon className="mr-2  mb-1" style={{ display: 'inline-block' }} icon={currentMood?.icon || 'fas:note'} />
                  {currentMood?.name}
                </span>
              </div>
            </Tooltip>
          </div>
        )}

        <Box sx={{ pointerEvents: 'all', zIndex: 0, overflow: 'hidden' }} className="w-full z-10 h-32 bottom-0  m-0">
          <ProgressSlider
            value={currentTime}
            onChange={(val) => {
              onSeek(val)
            }}
          />

          <Group sx={{ zIndex: 0 }} position="center" className="w-full h-full px-4 flex-nowrap relative">
            <div className="rounded-xl overflow-hidden" style={{ position: 'absolute', width: '100%', zIndex: -5 }}>
              <motion.img
                animate={{
                  // as time goes on, the image shifts to the right
                  x: `${50 - currentTime * 100}%`,
                }}
                style={{
                  position: 'relative',
                  filter: 'blur(10px) brightness(0.5)',
                  scale: 2,
                }}
                src={song?.thumbnail || peepoShrug}></motion.img>
            </div>
            {song && (
              <FavoriteButton
                liked={song.favorite || false}
                onClick={() => {
                  if (song) {
                    dispatch(editSong({ ...song, favorite: !song.favorite }))
                  }
                }}
              />
            )}
            <Group position="center" className="flex-nowrap" spacing={1}>
              <ActionIcon size="lg" className="rounded-full text-lg" onClick={() => dispatch(currentSong !== 0 ? prevSong() : setCurrentSong(queue.length - 1))}>
                <Icon icon="fas:backward-step" />
              </ActionIcon>
              <ActionIcon size="xl" className="rounded-full bg-green-500 text-2xl" onClick={() => song && dispatch(setPlaying())}>
                {playing ? <Icon icon="fas:pause" /> : <Icon icon="fas:play" />}
              </ActionIcon>
              <ActionIcon size="lg" className="rounded-full text-lg" onClick={() => advSong()}>
                <Icon icon="fas:forward-step" />
              </ActionIcon>
            </Group>

            <Stack align="start" className="justify-center gap-0 flex-shrink truncate">
              <EditableText
                onChange={(val) => {
                  dispatch(editSong({ ...song, title: val }))
                }}
                disabled={!song}
                className="text-lg font-bold">
                {song?.title || 'No Song Selected'}
              </EditableText>
              <EditableText
                onChange={(val) => {
                  dispatch(editSong({ ...song, artist: val }))
                }}
                disabled={!song}
                className="text-md font-semibold">
                {song?.artist || 'No Song Selected'}
              </EditableText>
            </Stack>
            <div className="flex-grow" />
            <Group className="justify-center gap-2 flex-nowrap">
              <Tooltip className="w-8 h-8" label="Mark In">
                <Button
                  disabled={!song}
                  className="text-lg w-8 h-8 p-0"
                  onClick={() => song && dispatch(editSong({ ...song, in: song.duration * currentTime }))}
                  onContextMenu={(e: React.MouseEvent) => {
                    e.preventDefault()
                    e.stopPropagation()
                    if (song) dispatch(editSong({ ...song, in: 0 }))
                  }}>
                  <Icon icon="fas:bracket-curly" />
                </Button>
              </Tooltip>
              <Tooltip className="w-8 h-8" label="Mark Out">
                <Button
                  disabled={!song}
                  className="text-lg w-8 h-8 p-0"
                  onClick={() => song && dispatch(editSong({ ...song, out: (song.duration - song.in) * currentTime + song.in }))}
                  onContextMenu={(e: React.MouseEvent) => {
                    e.preventDefault()
                    e.stopPropagation()
                    if (song) dispatch(editSong({ ...song, out: song.duration }))
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
              value={Math.round(volume * 100)}
              onChange={(e) => {
                dispatch(setVolume(e / 100))
                if (audio.current) audio.current.volume = e / 100
              }}
            />
            <Group className="justify-center gap-1 p-1">
              <Tooltip className="w-8 h-8" label="Repeat">
                <Button className="text-lg w-8 h-8 p-0" onClick={() => dispatch(setRepeat())}>
                  <Icon icon={repeat ? 'fas:repeat' : 'fat:repeat'} />
                </Button>
              </Tooltip>
              <Tooltip className="w-8 h-8" label="Shuffle">
                <Button className="text-lg w-8 h-8 p-0" onClick={() => dispatch(setShuffle())}>
                  <Icon icon={shuffle ? 'fas:shuffle' : 'fat:shuffle'} />
                </Button>
              </Tooltip>
            </Group>
            {upNext && <div className="absolute bottom-0 right-2">Up Next: {upNext.title}</div>}
          </Group>
        </Box>
      </Stack>
    </>
    // </Affix>
  )
}

export default AudioPlayer
