import { IpcEvents } from '@peepo/core'
import { ipcController, ipcEvent } from '../utils/decorators.js'
import chalk from 'chalk'
@ipcController()
export class LoggerCtrl {
  constructor() {}

  @ipcEvent(IpcEvents.RENDERER_LOG)
  onLog(args: any[]) {
    // console.log(chalk.bold.green('[RENDERER]:'), ...args)
  }
}
