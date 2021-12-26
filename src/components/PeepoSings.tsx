import React, { ReactElement } from "react"
import peepoTalk from "/public/peepoTalk.gif"
import peepoIdle from "/public/peepoTalk-idle.png"
import { Image } from "@mantine/core"
import gsap from "gsap"

interface Props {}

export default function PeepoSings({}: Props): ReactElement {
  return (
    <div className="absolute bottom-0 left-2">
      <div className="relative">
        <img id="peepo-sings" src={peepoTalk} />
      </div>
    </div>
  )
}

interface NoteProps {}

function MusicNote({}: NoteProps): ReactElement {
  return <Image src={peepoIdle} />
}
