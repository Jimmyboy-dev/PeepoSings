import type { ReactElement, RefObject } from "react"
import React from "react"
import peepoTalk from "/peepoTalk.gif"
import peepoSprite from "/peepoReal.png"
import { motion, useAnimation, useAnimationFrame, Variants } from "framer-motion"
import { Icon } from "@iconify/react"
import { useSpring, animated } from "react-spring"
import { useDrag } from "@use-gesture/react"
import { useWindowSize } from "react-use"

interface Props {
  talk: boolean
}
const to = () => ({ x: 50, y: window.innerHeight - window.innerWidth * 0.1 * 0.65, scale: 1, rotateZ: 0 })

export default function PeepoSings({ talk }: Props): ReactElement {
  const notes = [
    { x: "50%", y: "35%" },
    { x: "25%", y: "50%" },
    { x: "60%", y: "65%" },
  ]
  const { width: windowWidth, height: windowHeight } = useWindowSize()
  const [style, api] = useSpring(() => ({
    from: { x: 50, y: windowHeight, scale: 0.9, rotateZ: 5 },
    to: to(),
    config: { duration: 500, mass: 1, tension: 500, friction: 50 },
    delay: 1000,
  }))
  const ref = React.useRef<HTMLDivElement>(null)
  // useDrag<MouseEvent, { readonly target: HTMLDivElement }>(
  //   ({
  //     values: [px, py],
  //     movement: [mx, my],
  //     lastOffset: [lx, ly],
  //     direction: [xDir, yDir],
  //     velocity: [vx, vy],
  //     scrolling,
  //     event,
  //     active,
  //     first,
  //   }) => {
  //     const target = event.target as HTMLDivElement
  //     const currentX = style.x.get()
  //     const currentY = style.y.get()
  //     if (first) console.log(target.className)

  //     const scale = active ? 1.1 : 1 // Active cards lift up a bit

  //     api.start((t, c) => {
  //       const x = currentX + mx
  //       const y = currentY + my
  //       const rotateZ = (Math.atan2(vy, vx) * 180) / Math.PI
  //       const scaleX = xDir === 0 ? 1 : xDir

  //       return { x, y, rotateZ, scaleX }
  //     })
  //   },
  //   { target: ref }
  // )

  return (
    <div className="select-none z-10 fixed w-screen h-screen pointer-events-none top-0 left-0">
      <animated.div ref={ref} style={{ ...style, width: "10vw" }} className="absolute pointer-events-auto  touch-none">
        <img className="select-none pointer-events-none" id="peepo-sings" style={{ zIndex: 1 }} src={peepoSprite} />
      </animated.div>
      {notes.map((note, i) => (
        <MusicNote key={i} x={note.x} i={i} peepoRef={ref} paused={!talk} />
      ))}
    </div>
  )
}

interface NoteProps {
  x: string
  i: number
  paused: boolean
  peepoRef: RefObject<HTMLDivElement>
}

function MusicNote({ i, paused, peepoRef }: NoteProps): ReactElement {
  const ref = React.useRef<HTMLDivElement>(null)
  useAnimationFrame((t) => {
    if (!ref.current) return
    if (paused && ref.current.style.display !== "none") {
      ref.current.style.display = "none"
      return
    } else if (ref.current.style.display !== "block") {
      ref.current.style.display = "block"
    }
    if (t - 2000 * i < 0) {
      ref.current.style.opacity = "0"
    }

    const interval = (t - 2000 * i) % 6000
    if (interval < 0) return
    const x =
      (Math.sin(interval / 6000 - i * 5) * 25 + interval * 0.02) * (interval / 6000) +
      (peepoRef.current?.clientWidth ?? 0) * 0.75
    const y = ref.current.clientHeight * 0.5 + interval / 25
    ref.current.style.transform = `translateY(-${y}px) translateX(${x}px)`
    ref.current.style.opacity = `${1 - interval / 6000}`
  })
  const [size, setSize] = React.useState(Math.random() * 8 + 22)
  return (
    <div ref={ref} className="absolute -z-10 bottom-0 left-0">
      <Icon className="text-green-500" fontSize={size} icon="fas:music-note" />
    </div>
  )
}
