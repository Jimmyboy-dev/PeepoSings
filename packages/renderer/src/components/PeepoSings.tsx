import type { ReactElement } from "react"
import React from "react"
import peepoTalk from "../assets/peepoTalk.gif"
import peepoIdle from "../assets/peepoTalk-idle.png"
import { motion, useAnimation, useAnimationFrame, Variants } from "framer-motion"
import { Icon } from "@iconify/react"

interface Props {
  talk: boolean
}

export default function PeepoSings({ talk }: Props): ReactElement {
  const notes = [
    { x: "50%", y: "35%" },
    { x: "25%", y: "50%" },
    { x: "60%", y: "65%" },
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
          <MusicNote key={i} x={note.x} i={i} paused={!talk} />
        ))}
      </div>
    </div>
  )
}

interface NoteProps {
  x: string
  i: number
  paused: boolean
}

function MusicNote({ i, paused }: NoteProps): ReactElement {
  const ref = React.useRef<HTMLDivElement>(null)
  useAnimationFrame((t) => {
    if (!ref.current) return
    if (paused && ref.current.style.display !== "none") {
      ref.current.style.display = "none"
      return
    }

    const interval = (t - 2000 * i) % 6000
    if (interval < 0) return
    const x = Math.sin(interval / 6000 - i * 5) * 25 + interval * 0.02 + ref.current.offsetWidth * 0.75
    const y = ref.current.offsetHeight * 0.5 + interval / 25
    ref.current.style.transform = `translateY(-${y}px) translateX(${x}px)`
    ref.current.style.opacity = `${1 - interval / 6000}`
  })
  const [size, setSize] = React.useState(Math.random() * 8 + 22)
  return (
    <div ref={ref} className="absolute -z-10 bottom-0 right-2">
      <Icon className="text-green-500" fontSize={size} icon="fas:music-note" />
    </div>
  )
}
