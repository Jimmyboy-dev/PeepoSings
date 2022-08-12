import React from 'react'
import { KBarProvider as KBar, Action, KBarPortal, KBarPositioner, KBarAnimator, KBarSearch } from 'kbar'
import { Icon } from '@iconify/react'

interface Props {}

const searchStyle = {
  padding: '12px 16px',
  fontSize: '16px',
  width: '100%',
  boxSizing: 'border-box' as React.CSSProperties['boxSizing'],
  outline: 'none',
  border: 'none',
  background: 'var(--background)',
  color: 'var(--foreground)',
}

const animatorStyle = {
  maxWidth: '600px',
  width: '100%',
  background: 'var(--background)',
  color: 'var(--foreground)',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: 'var(--shadow)',
}

const groupNameStyle = {
  padding: '8px 16px',
  fontSize: '10px',
  textTransform: 'uppercase' as const,
  opacity: 0.5,
}

export default function KBarProvider({ children }: React.PropsWithChildren<Props>) {
  const actions: Action[] = [{ id: 'search-yt', name: 'Search YouTube', icon: <Icon color="red" icon="fab:youtube" /> }]
  return (
    <KBar actions={actions}>
      <KBarPortal>
        <KBarPositioner>
          <KBarAnimator style={animatorStyle}>
            <KBarSearch style={searchStyle} />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBar>
  )
}

import {
  // ...
  KBarResults,
  useMatches,
  NO_GROUP,
} from 'kbar'

// ...
// <KBarAnimator>
//   <KBarSearch />
{
  /* <RenderResults />; */
}
// ...

function RenderResults() {
  const { results, rootActionId } = useMatches()

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <div>{item}</div>
        ) : (
          <div
            style={{
              background: active ? '#eee' : 'transparent',
            }}>
            {item.name}
          </div>
        )
      }
    />
  )
}
