import { Box, Sx, Text, TextProps, useMantineTheme } from '@mantine/core'
import React, { ChangeEvent } from 'react'

type Props = {
  children: string
  onChange: (value: string) => void
  className?: string
  styles?: Sx | Sx[]
  disabled?: boolean
}

export default function EditableText({ children, onChange, className, styles, disabled }: Props) {
  const [editing, setEditing] = React.useState(false)
  const theme = useMantineTheme()
  const ref = React.useRef<HTMLDivElement>(null!)
  React.useEffect(() => {
    if (editing) ref.current.focus()
  }, [editing])
  const hoverSx: Sx = {
    backgroundColor: theme.colors.dark[9] + '66',
  }
  return (
    <Box
      sx={{
        ...styles,

        borderRadius: 4,
        cursor: editing || disabled ? 'text' : 'pointer',
        outline: 'none',
        padding: '0 0.5rem',
        transition: 'all 150ms ease-in-out',
        '&:hover': !disabled && hoverSx,
      }}
      suppressContentEditableWarning
      ref={ref}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if (!disabled && !editing) {
          setEditing(true)
        }
      }}
      onKeyDown={(e) => {
        if (disabled || !editing) return
        if (e.key === 'Enter') {
          onChange(e.target.innerText)
          setEditing(false)
        }
      }}
      onBlur={(e) => {
        if (disabled || !editing) return
        onChange(e.target.innerText)
        setEditing(false)
      }}
      className={className}
      contentEditable={editing}>
      {children}
    </Box>
  )
}
