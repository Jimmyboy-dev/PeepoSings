import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin, swcPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    resolve: {
      alias: {
        '@peepo/core': resolve('src/core/src'),
      },
    },
    plugins: [externalizeDepsPlugin(), swcPlugin()],
    build: {
      sourcemap: 'inline',
    },
  },
  preload: {
    resolve: {
      alias: {
        '@peepo/core': resolve('src/core/src'),
      },
    },
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@peepo/core': resolve('src/core/src'),
      },
    },
    plugins: [react()],
  },
})
