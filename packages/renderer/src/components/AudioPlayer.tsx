import { Icon } from "@iconify/react";
import { ActionIcon, Button, Group, Portal, Progress, Slider, Text, Tooltip } from "@mantine/core";
import { IpcEvents } from "@peeposings/shared";
import throttle from "lodash.throttle";
import Mousetrap from "mousetrap";
import React, { useEffect } from "react";

import peepoShrug from "../assets/peepoShrug.png";
import { useAppDispatch, useAppSelector } from "../store";
import { nextSong, prevSong, setCurrentMood, setCurrentSong } from "../store/slices/currentSong";
import { setCurrentTime, setPlaying, setRepeat, setShuffle, setVolume } from "../store/slices/player";
import { editSong } from "../store/slices/songs";
import PeepoSings from "./PeepoSings";

import type { ReactElement } from 'react'
function AudioPlayer(): ReactElement {
  const dispatch = useAppDispatch()
  const { currentTime, duration, filter, playing, repeat, shuffle, volume } = useAppSelector((state) => state.player)
  const [{ song: currentSong, mood: curMood }, { songs, moods }] = useAppSelector((state) => [state.currentSong, { songs: state.songs, moods: state.moods }])
  const [source, setSource] = React.useState('')
  const audioDevice = useAppSelector((state) => state.config.outputDevice)

  const queue = curMood !== null ? songs.filter((song) => song.mood.includes(curMood)) : songs
  const currentMood = curMood ? moods[curMood] : null

  const song = currentSong !== -1 && queue.length !== 0 ? queue[currentSong] : null

  const audio = React.useRef<HTMLAudioElement & { setSinkId(deviceId: string): void }>(null)
  useEffect(() => {
    if (audioDevice !== null && audio.current) audio.current.setSinkId(audioDevice)
  }, [audioDevice, audio.current])
  useEffect(() => {
    if (audio.current) {
      audio.current.volume = volume
      audio.current.setSinkId(audioDevice || 'default')
    }
  }, [audio.current])
  const calcProgress = function (currentTime: number) {
    if (song && audio.current) {
      return (currentTime - song.in) / (song.duration - song.in - (song.duration - song.out))
    } else return 0
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
  }, 1)

  const audioPlay = () => audio.current?.play().catch((e) => console.error(e, audio))

  const advSong = () => {
    if (song && audio.current) {
      if (repeat) {
        audio.current.currentTime = song.in
        audioPlay()
      } else if (shuffle) {
        const nextSong = Math.floor(Math.random() * queue.length)
        dispatch(setCurrentSong(nextSong))
        audio.current.currentTime = queue[nextSong].in
        audioPlay()
      } else {
        if (currentSong === queue.length - 1) dispatch(setCurrentSong(0))
        else dispatch(nextSong())
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
    if (!audio.current) return
    if (playing) {
      audioPlay()
    } else {
      audio.current.pause()
    }
  }, [playing])

  useEffect(() => {
    if (!song || !audio.current) {
      dispatch(setPlaying(false))
      return
    }
    setSource(`resource://${song.filePath}`)
    dispatch(setPlaying(false))
    audio.current.load()
    dispatch(setCurrentTime(song.in))
    audio.current.currentTime = song.in || 0
  }, [currentSong, song])

  useEffect(() => {
    const listener = Mousetrap.bind('space', (e) => {
      e.preventDefault()
      dispatch(setPlaying())
      window.logger.log('space pressed')
    })
    const mainProcListener = window.ipc.answerMain(IpcEvents.PLAYPAUSE, () => {
      dispatch(setPlaying())
      window.logger.log('Main func Keybind pressed')
    })
    // const dlListen = window.electron.listeners.onDownloadEnd((_e, download) => {})

    // document.body.addEventListener('keypress', listener, { capture: true, passive: true })
    return () => {
      // document.removeEventListener('keypress', listener)
      mainProcListener()
      listener.unbind('space')
    }
  }, [])

  return (
    <Portal target={document.getElementById('portals') as HTMLDivElement} zIndex={9999}>
      <Group direction="column" spacing={0} className="justify-end gap-0" style={{ position: 'absolute', width: '100vw', height: '100vh' }}>
        <PeepoSings talk={playing} />
        {currentMood && (
          <div
            onClick={() => {
              dispatch(setCurrentMood(null))
              dispatch(setCurrentSong(-1))
            }}
            className="absolute
            pointer-events-auto cursor-pointer  right-0 bottom-32 bg-slate-700 text-white h-12 rounded-tl-lg p-2">
            <Tooltip className="flex flex-row  items-center" position="top" label="Clear Current Mood?">
              <span className="font-semibold mr-1">Current Mood:</span>

              <span className="font-bold text-lg bg-slate-800 rounded-lg py-1 px-2" style={{ color: currentMood.color }}>
                <Icon className="mr-2  mb-1" style={{ display: 'inline-block' }} icon={currentMood.icon || 'fas:music-note'} />
                {currentMood.name}
              </span>
            </Tooltip>
          </div>
        )}

        <div style={{ pointerEvents: 'all' }} className="w-full z-10 bg-neutral h-32 bottom-0  m-0">
          <Progress
            className="absolute z-50 pointer-events-auto cursor-pointer rounded-none w-full m-0"
            value={currentTime * 100}
            styles={{
              label: { display: 'none' },
              root: {
                transition: 'transform 0.2s ease-in-out',
                transformOrigin: 'bottom',
                '&:hover': {
                  transform: 'scaleY(2)',
                },
              },
            }}
            onClick={(e) => song && onSeek(e)}
            style={{ cursor: 'pointer' }}
          />
          <audio ref={audio} src={song ? `resource://${song.filePath}` : ''} onEnded={() => advSong()} onCanPlayThrough={() => dispatch(setPlaying(true))} onTimeUpdate={onProgress}></audio>
          <Group direction="row" className="w-full h-full px-4 flex-nowrap relative">
            <Group direction="row" position="center" className="flex-nowrap" spacing={1}>
              <ActionIcon size="lg" className="rounded-full text-lg" onClick={() => dispatch(currentSong !== 0 ? prevSong() : setCurrentSong(queue.length - 1))}>
                <Icon icon="fas:backward-step" />
              </ActionIcon>
              <ActionIcon size="xl" className="rounded-full bg-green-500 text-2xl" onClick={() => song && dispatch(setPlaying())}>
                {playing ? <Icon icon="fas:pause" /> : <Icon icon="fas:play" />}
              </ActionIcon>
              <ActionIcon size="lg" className="rounded-full text-lg" onClick={() => dispatch(currentSong !== queue.length - 1 ? nextSong() : setCurrentSong(0))}>
                <Icon icon="fas:forward-step" />
              </ActionIcon>
            </Group>
            <div className="rounded-xl overflow-hidden" style={{ minWidth: '6em', minHeight: '6em' }}>
              <img className="w-24 h-24 object-cover" src={song?.albumArt || peepoShrug}></img>
            </div>

            <Group className="justify-center gap-0 flex-shrink truncate" direction="column">
              <Text className="text-lg font-bold">{song?.title || 'No Song Selected'}</Text>
              <Text className="text-md font-semibold">{song?.artist || 'No Song Selected'}</Text>
            </Group>
            <div className="flex-grow" />
            <Group className="justify-center gap-2 flex-nowrap" direction="row">
              <Tooltip className="w-8 h-8" label="Mark In">
                <Button
                  disabled={!song}
                  className="text-lg w-8 h-8 p-0"
                  onClick={() => song && dispatch(editSong({ ...song, in: song.duration * currentTime }))}
                  onContextMenu={
                    ((e) => {
                      if (!song) return
                      e.preventDefault()
                      e.stopPropagation()
                      dispatch(editSong({ ...song, in: 0 }))
                    }) as React.MouseEventHandler<HTMLButtonElement>
                  }>
                  <Icon icon="fas:bracket-curly" />
                </Button>
              </Tooltip>
              <Tooltip className="w-8 h-8" label="Mark Out">
                <Button
                  disabled={!song}
                  className="text-lg w-8 h-8 p-0"
                  onClick={() => song && dispatch(editSong({ ...song, out: (song.duration - song.in) * currentTime + song.in }))}
                  onContextMenu={
                    ((e) => {
                      if (!song) return

                      e.preventDefault()
                      e.stopPropagation()
                      dispatch(editSong({ ...song, out: song.duration }))
                    }) as React.MouseEventHandler<HTMLButtonElement>
                  }>
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
            <Group className="justify-center gap-1 p-1" direction="row">
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
          </Group>
        </div>
      </Group>
    </Portal>
  )
}

export default AudioPlayer
