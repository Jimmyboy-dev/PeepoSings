import { Group, Text } from "@mantine/core"
import { useListState } from "@mantine/hooks"
import { TwitchPrivateMessage } from "@twurple/chat/lib/commands/TwitchPrivateMessage"
import React, { ReactElement, useEffect } from "react"

interface Props {}

export default function Chat({}: Props): ReactElement {
  const [messages, msgs] = useListState<{ message: string; msg: TwitchPrivateMessage; user: string }>([])
  useEffect(() => {
    const onMessage = (e: DocumentEventMap["chat-message"]) => {
      const { channel, user, message, msg } = e.detail
      msgs.append({ message, msg, user })
      console.log(`message received:${user}: ${message}`, `\nUser Info: `, msg.userInfo)
    }
    document.addEventListener("chat-message", onMessage)
    return () => {
      document.removeEventListener("chat-message", onMessage)
    }
  }, [])
  return (
    <Group direction="column" styles={{ background: "#222222" }}>
      {messages.map(({ message, msg, user }, i) => (
        <Group spacing={2} key={msg.id || i}>
          <Text weight="bold" color={msg.userInfo?.color} className="pr-1">
            {user}:
          </Text>
          <Text>{message}</Text>
        </Group>
      ))}
    </Group>
  )
}
