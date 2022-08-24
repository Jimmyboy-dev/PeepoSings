import { ipcMain } from 'electron-better-ipc'
import EventEmitter from 'events'
import { Container as InversifyContainer } from 'inversify'
import ipcService from '../services/ipc'
import { IPC_EVENT_KEY } from './decorators'
import { Class } from './types'

class Container extends InversifyContainer {
  controllers: Class[]
  services: ServiceProvider['provide' | 'useClass'][]

  constructor({ controllers, services }: AppDependencies) {
    super({ skipBaseClassChecks: true })
    this.controllers = controllers
    this.services = []

    services.forEach(({ provide, useClass, useValue }) => {
      if (useClass) {
        this.bind(provide || useClass)
          .to(useClass)
          .inSingletonScope()
        this.services.push(provide || useClass)
      } else if (useValue) {
        this.bind(provide).toConstantValue(useValue)
        this.services.push(provide)
      }
    })
  }

  async bindAsync({ provide, usePromise }: AsyncServiceProvider): Promise<void> {
    const { default: service } = await usePromise

    console.log(`Async service loaded => ${service.name}`)

    this.bind(provide).to(service).inSingletonScope()
  }

  listen(): void {
    const ipc = this.get<typeof ipcMain>(ipcService)
    // const logger = this.get<Logger>($ipcLogger)

    this.controllers.forEach((Controller) => {
      try {
        this.bind(Controller).to(Controller).inSingletonScope()
        const meta: ControllerMeta[] = Reflect.getMetadata(IPC_EVENT_KEY, Controller.prototype)

        const controller = this.get(Controller)
        meta.forEach(({ eventName, name, once, log }) => {
          const on = once ? ipc.once : ipc.answerRenderer

          on.bind(ipc)(eventName, (e: typeof once extends true ? Electron.IpcMainInvokeEvent : any, d: typeof once extends true ? any : Electron.BrowserWindow) => {
            const event = once ? e : d
            const data = once ? d : e
            if (log)
              console.log(
                'Event',
                eventName,
                'Triggered from',
                once ? event.sender.getTitle() : event.getTitle(),
                'with data',
                typeof data === 'string' ? data : JSON.stringify(data, null, 2)?.substring(0, 25) ?? ''
              )

            const result = controller[name](data, event)

            if (result instanceof Promise) {
              return result.catch((err: any) => {
                console.error(`error in event ${eventName} => ${err.message}`)
                console.error(err.stack)
              })
            }
            return result
          })
        })
      } catch (e) {
        console.error('Service failed to initialize')
        console.error(e)
      }
    })
  }
  async close(): Promise<void> {
    try {
      for (const service of this.services) {
        if (this.isBound(service)) {
          const value = this.get(service)

          const result = value.onModuleDestroy ? value.onModuleDestroy() : Promise.resolve()
          if (result instanceof Promise) {
            await result
          }
          this.unbind(service)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export default Container

interface AppDependencies {
  controllers: Class[]
  services: ServiceProvider[]
}

export interface ServiceProvider {
  provide?: symbol | Class | string
  useClass?: Class
  useValue?: any
}

export interface AsyncServiceProvider {
  provide: symbol | Class | string
  usePromise: Promise<{ default: Class }>
}

export interface ControllerMeta<E = string> {
  eventName: E
  name: string
  once?: boolean
  log?: boolean
}
