import { Title } from "@mantine/core"
import { motion, useAnimation, useCycle } from "framer-motion"
import React, { useState } from "react"
import { useInterval } from "react-use"

type Props = {}

export default function PromoMessage({}: Props) {
  const [text, cycle] = useCycle("Moods.", "Playlists.", "Music.", "Memes.", "Content.", "Cum.")
  const api = useAnimation()
  useInterval(async () => {
    await api.start({ y: -100, transition: { duration: 0.5, ease: "easeIn" } })
    cycle()
    api.set({ y: 100 })
    await api.start({ y: 0, transition: { duration: 0.5, ease: "easeOut" } })
  }, 3000)
  return (
    <>
      <div className="flex flex-row items-center h-min gap-2 relative">
        <Title order={2}>Stream Better With </Title>
        <div
          className="text-twitch-accent-legend  inline-block overflow-hidden w-28 h-12 font-bold relative"
          style={{ fontFamily: "Segoe UI", fontSize: 26 }}>
          <motion.span style={{ position: "absolute", left: 0, bottom: 3 }} initial={{ y: 0 }} animate={api}>
            {text}
          </motion.span>
        </div>
      </div>
    </>
  )
}
