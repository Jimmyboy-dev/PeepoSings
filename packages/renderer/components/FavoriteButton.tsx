import React from 'react'
import styled from '@emotion/styled'
import { ActionIcon, MantineTheme } from '@mantine/core'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

declare module '@emotion/react' {
  export interface Theme extends MantineTheme {}
}

const LikeButton = styled(motion.button)`
  padding: 0.25rem;
  margin-right: 0.5rem;
  &.liked {
    /* heart red */
    color: #ff3344;
  }
`
type Props = {
  liked: boolean
  onClick: () => void
}

export default function FavoriteButton({ liked, onClick }: Props) {
  return (
    <LikeButton
      whileTap={{ scale: 0.9 }}
      className={liked ? 'liked' : ''}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick()
      }}>
      <Icon icon={liked ? 'fa-solid:heart' : 'fa-regular:heart'} />
    </LikeButton>
  )
}
