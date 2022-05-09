import type { PropsWithChildren } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'

import '../../common.scss'
import './styles.scss'

export type BoxProps = PropsWithChildren<{
  className?: string
  shadow?: boolean
}>

const Box = forwardRef<HTMLDivElement, BoxProps>(({ className, children, shadow = false }, ref) => (
  <div ref={ref} className={cx('.nuclear', '.box', className, { ['.shadow']: shadow })}>
    {children}
  </div>
))

export default Box
