import { spawn } from 'child_process'
import { createServer, build, createLogger } from 'vite'
import electron from 'electron'

/** Messages on stderr that match any of the contained patterns will be stripped from output */
const stderrFilterPatterns = [
  // warning about devtools extension
  // https://github.com/cawa-93/vite-electron-builder/issues/492
  // https://github.com/MarshallOfSound/electron-devtools-installer/issues/143
  /ExtensionLoadWarning/,
]
/** @type {import('vite').LogLevel} */
const LOG_LEVEL = 'info'

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
    VITE_DEV_SERVER_HOST: address.address,
    VITE_DEV_SERVER_PORT: address.port,
  })

  const logger = createLogger(LOG_LEVEL, {
    prefix: '[main]',
  })

  return build({
    name: 'reload-app-on-main-package-change',
    configFile: 'packages/main/vite.config.ts',
    mode: 'development',
    plugins: [
      {
        name: 'electron-main-watcher',
        writeBundle() {
          if (electronProcess !== null) {
            electronProcess.kill('SIGINT')
            electronProcess = null
          }
          electronProcess = spawn(electron, ['.'], { stdio: 'pipe', env })

          electronProcess.stdout.on('data', (d) => d.toString().trim() && logger.warn(d.toString(), { timestamp: true }))
          electronProcess.stderr.on('data', (d) => {
            const data = d.toString().trim()
            if (!data) return
            const mayIgnore = stderrFilterPatterns.some((r) => r.test(data))
            if (mayIgnore) return
            logger.error(data, { timestamp: true })
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
    name: 'reload-page-on-preload-package-change',
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

// bootstrap:
;(async () => {
  try {
    const viteDevServer = await createServer({
      configFile: 'packages/renderer/vite.config.ts',
    })

    await viteDevServer.listen()

    await watchPreload(viteDevServer)
    await watchMain(viteDevServer)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()
