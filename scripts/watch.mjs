import { spawn } from 'child_process'
import { config } from 'dotenv'
import electron from 'electron'
import path from 'path'
import { build, createServer } from 'vite'

config()
const creds = config({ path: path.resolve(process.cwd(), '.env.local') }).parsed

const mainLogExceptions = ['ExtensionLoadWarning']

/**
 * @type {(server: import('vite').ViteDevServer) => Promise<import('rollup').RollupWatcher>}
 */
function watchMain(server) {
  /**
   * @type {import('child_process').ChildProcessWithoutNullStreams | null}
   */
  let electronProcess = null
  const address = server.httpServer.address()
  const env = Object.assign(process.env, {
    ...creds,
    VITE_DEV_SERVER_HOST: address.address,
    VITE_DEV_SERVER_PORT: address.port,
    ELECTRON_DISABLE_SECURITY_WARNINGS: 'yep',
    FORCE_COLOR: 1,
  })

  return build({
    configFile: 'packages/main/vite.config.ts',
    mode: 'development',
    plugins: [
      {
        name: 'electron-main-watcher',
        writeBundle() {
          electronProcess && electronProcess.kill()
          electronProcess = spawn(electron, ['.'], { stdio: 'pipe', env })
          electronProcess.stdout.setEncoding('utf8')

          electronProcess.stdout.on('data', (data) => {
            if (mainLogExceptions.some((filter) => data.toString().trim().match(filter))) return
            console.log(data)
          })
        },
      },
    ],
    build: {
      watch: true,
    },
  })
}

/**
 * @type {(server: import('vite').ViteDevServer) => Promise<import('rollup').RollupWatcher>}
 */
function watchPreload(server) {
  return build({
    configFile: 'packages/preload/vite.config.ts',
    mode: 'development',
    plugins: [
      {
        name: 'electron-preload-watcher',
        writeBundle() {
          server.ws.send({ type: 'full-reload' })
        },
      },
    ],
    build: {
      watch: true,
    },
  })
}

// bootstrap
const server = await createServer({ configFile: 'packages/renderer/vite.config.ts' })

await server.listen()
await watchPreload(server)
await watchMain(server)
