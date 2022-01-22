import React, { ReactElement } from "react"
import peepoTalk from "/assets/peepoTalk.gif"
import peepoIdle from "/assets/peepoTalk-idle.png"
import { Image } from "@mantine/core"
import gsap from "gsap"
import { Icon } from "@iconify/react"

interface Props {
  talk: boolean
}

export default function PeepoSings({ talk }: Props): ReactElement {
  const notes = [
    { x: "50%", y: "35%" },
    { x: "25%", y: "50%" },
    { x: "60%", y: "70%" },
  ]
  return (
    <div className="select-none -z-10 left-2 ">
      <div className="relative">
        <img
          id="peepo-sings"
          style={{ width: "10vw", marginLeft: "1vw", zIndex: 1 }}
          src={talk ? peepoTalk : peepoIdle}
        />
        {notes.map((note, i) => (
          <MusicNote key={i} x={note.x} y={note.y} paused={!talk} />
        ))}
      </div>
    </div>
  )
}

interface NoteProps {
  x: number | string
  y: number | string
  paused: boolean
}

function MusicNote({ x, y, paused }: NoteProps): ReactElement {
  const ref = React.useRef<any>(null)
  const tween = React.useRef<gsap.core.Tween>()
  const [size, setSize] = React.useState(Math.random() * 8 + 22)
  React.useEffect(() => {
    if (!ref.current || tween.current) return
    tween.current = gsap.fromTo(
      ref.current,
      { x, y, autoAlpha: 1 },
      { yPercent: -400, x: "+=20px", autoAlpha: 0, duration: 5, repeat: -1, ease: "linear" }
    )
  }, [ref.current])
  React.useEffect(() => {
    if (!tween.current) return
    tween.current.restart().paused(paused)
  }, [paused])
  return (
    <div className="absolute -z-10" style={{ top: y, left: x }}>
      <Icon className="text-green-500" fontSize={size} icon="fas:music-note" ref={ref} />
    </div>
  )
}
