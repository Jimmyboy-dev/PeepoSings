import { Title } from "@mantine/core"
import { motion, useCycle } from "framer-motion"
import React, { useState } from "react"

type Props = {}

export default function PromoMessage({}: Props) {
  const [text, cycle] = useCycle(["Moods.", "Playlists.", "Music.", "Streams.", "Content.", "Cum."])
  return (
    <>
      <div className="flex flex-row items-center h-min gap-2 relative">
        <Title order={2}>Stream Better With </Title>
        <div
          className="text-twitch-accent-legend  inline-block overflow-hidden w-24 font-bold relative"
          style={{ fontFamily: "Segoe UI", fontSize: 26 }}>
          <motion.span style={{ bottom: 0, height: "100%", left: 0, textAlign: "center", verticalAlign: "baseline" }}>
            {text}
          </motion.span>
        </div>
      </div>
    </>
  )
}
