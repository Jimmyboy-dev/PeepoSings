import { injectable } from 'inversify'
import { IpcEvents } from '@peepo/core'
import { ControllerMeta } from './container'
import { Class } from './types'

export const IPC_EVENT_KEY = Symbol('$$ipc-event-prefix')

/**
 * the key of the system media metadata
 */
export const SYSTEM_MEDIA_EVENT_KEY = Symbol('$$system-media-event-prefix')

const eventEmitterControllerFactory =
  (metadataKey: symbol): ClassDecorator =>
  (prefix?: string) => {
    /**
     * Get the metadata attached to the class by event decorator and add the prefix to eventNames if prefix is defined
     * @param target - the instance of the decorated class
     * @returns - the decorated class ready to use with inversify Container
     */
    return (target): Class => {
      const proto = target.prototype
      let events = Reflect.getMetadata(metadataKey, proto) || []

      if (!events.length) {
        throw new Error(`The controller ${proto.constructor.name} has no event registered, you must register at least one`)
      }

      if (prefix) {
        events = events.map((event: ControllerMeta) => ({
          eventName: prefix ? `${prefix}-${event.eventName}` : event.eventName,
          name: event.name,
        }))

        Reflect.defineMetadata(metadataKey, events, proto)
      }

      return injectable()(target)
    }
  }

interface IpcEventOptions {
  once?: boolean
  log?: boolean
}

/**
 *  Decorate a controller method in order to make it an ipc event handler
 * @remark
 * (for js user) if no params id provided, it will trigger an error
 * @param eventName - a string representing the event to be handled by the decorated method
 */
const eventListenerFactory = <T>(metadataKey: symbol): MethodDecorator<T, IpcEventOptions> => {
  console.log('eventListenerFactory', metadataKey)
  return (eventName, options) => {
    console.log('eventListener registered for', eventName)

    /**
     * Define metadata for this method, store the eventName and the handler name
     *
     * @param target - the instance of the class which own the decorated method
     * @param name  - the name of the decorated method
     */
    return (target: Class, name: string): void => {
      if (!eventName) {
        throw new Error(`You must specify an event name for method ${name} of class ${target.constructor.name}`)
      }
      const meta = Reflect.getMetadata(metadataKey, target) || []
      const eventMeta: ControllerMeta<T> = { eventName, name }

      if (options && options.once) {
        eventMeta.once = options.once
      }
      if (options && options.log) {
        eventMeta.log = options.log
      }

      meta.push(eventMeta)
      Reflect.defineMetadata(metadataKey, meta, target)
    }
  }
}

export const ipcController = eventEmitterControllerFactory(IPC_EVENT_KEY)
export const ipcEvent = eventListenerFactory<IpcEvents>(IPC_EVENT_KEY)

export type ClassDecorator<Target = any, Return = void> = (...args: any[]) => (target: Class<Target>) => Return

export type MethodDecorator<T = any, O = any, Return = void> = (arg1: T, arg2?: O) => (target: Class['prototype'], name: string) => Return
