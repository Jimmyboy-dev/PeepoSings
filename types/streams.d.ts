declare module 'stream-filter' {
  import type { Transform } from 'stream'

  const filter: (cb: (item: any) => boolean) => Transform

  export default filter
}

declare module 'stream-reduce' {
  import type { Transform } from 'stream'

  const reducer: (cb: (acc: any, item: any) => any, acc: any) => Transform

  export default reducer
}

declare module 'event-stream'
