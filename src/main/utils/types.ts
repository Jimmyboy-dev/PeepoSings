/**
Matches a [`class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).
@category Class
*/
export type Class<T = unknown, Arguments extends any[] = any[]> = new (...arguments_: Arguments) => T

export interface onModuleDestroy {
  onModuleDestroy(): void | Promise<void>
}
