import react from '@vitejs/plugin-react'
import { builtinModules } from 'module'
import { join } from 'path'
import { defineConfig, Plugin } from 'vite'
import resolve from 'vite-plugin-resolve'

import pkg from '../../package.json'

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  mode: process.env.NODE_ENV,
  root: __dirname,

  plugins: [
    react(),
    resolveElectron(),
    /**
     * Here you can specify other modules
     * 🚧 You have to make sure that your module is in `dependencies` and not in the` devDependencies`,
     *    which will ensure that the electron-builder can package it correctly
     * @example
     * {
      // @ts-ignore
      'electron-timber': 'const logger = require("electron-timber"); export default logger;',
    },
     */
  ],
  base: './',
  build: {
    sourcemap: 'inline',
    outDir: '../../dist/renderer',
    emptyOutDir: true,
    // rollupOptions: {
    //   external: [...builtinModules],
    // },
  },
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
  server: {
    host: process.env.VITE_DEV_SERVER_HOST || 'localhost',
    port: Number(process.env.VITE_DEV_SERVER_PORT || 3000),
  },
})

/**
 * For usage of Electron and NodeJS APIs in the Renderer process
 * @see https://github.com/caoxiemeihao/electron-vue-vite/issues/52
 */
export function resolveElectron(resolves: Parameters<typeof resolve>[0] = {}): Plugin {
  const builtins = builtinModules.filter((t) => !t.startsWith('_'))

  /**
   * @see https://github.com/caoxiemeihao/vite-plugins/tree/main/packages/resolve#readme
   */
  return {
    name: 'electron-resolve',
    ...resolve({
      electron: electronExport(),
      ...builtinModulesExport(builtins),
      ...resolves,
    }),
  }

  function electronExport() {
    return `
/**
 * For all exported modules see https://www.electronjs.org/docs/latest/api/clipboard -> Renderer Process Modules
 */
const electron = require("electron");
const {
  clipboard,
  nativeImage,
  shell,
  contextBridge,
  crashReporter,
  ipcRenderer,
  webFrame,
  desktopCapturer,
  deprecate,
} = electron;

export {
  electron as default,
  clipboard,
  nativeImage,
  shell,
  contextBridge,
  crashReporter,
  ipcRenderer,
  webFrame,
  desktopCapturer,
  deprecate,
}
`
  }

  function builtinModulesExport(modules: string[]) {
    return modules
      .map((moduleId) => {
        const nodeModule = require(moduleId)
        const requireModule = `const M = require("${moduleId}");`
        const exportDefault = `export default M;`
        const exportMembers =
          Object.keys(nodeModule)
            .map((attr) => `export const ${attr} = M.${attr}`)
            .join(';\n') + ';'
        const nodeModuleCode = `
${requireModule}

${exportDefault}

${exportMembers}
`

        return { [moduleId]: nodeModuleCode }
      })
      .reduce((memo, item) => Object.assign(memo, item), {})
  }
}
