import { rmSync } from 'fs'
import path from 'path'
import { createLogger } from 'vite'
import { defineConfig, externalizeDepsPlugin, swcPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'
// import { customStart, loadViteEnv } from 'vite-electron-plugin/plugin'
// import renderer from 'vite-plugin-electron-renderer'
import tsconfigPaths from 'vite-tsconfig-paths'
// import swc from 'unplugin-swc'

// import babel from 'vite-plugin-babel'

import pkg from './package.json'

rmSync(path.join(__dirname, 'dist'), { recursive: true, force: true }) // v14.14.0

// https://vitejs.dev/config/
export default defineConfig({
  main: {
    resolve: {
      alias: {
        // '@/': path.join(__dirname, 'packages/renderer/src'),
        // styles: path.join(__dirname, 'packages/renderer/assets/styles'),
        '@peepo/core': path.join(__dirname, 'packages/core'),
      },
    },

    build: {
      rollupOptions: {
        input: { index: path.resolve(__dirname, 'packages/main/index.ts') },
      },
      sourcemap: true,
      outDir: './dist/main',
    },
    plugins: [
      externalizeDepsPlugin(),
      swcPlugin({
        transformOptions: {
          decoratorMetadata: true,
          // useDefineForClassFields: true,
          // legacyDecorator: true,
        },
      }),
    ],
  },
  preload: {
    resolve: {
      alias: {
        '@peepo/core': path.join(__dirname, 'packages/core'),
      },
    },
    build: {
      rollupOptions: {
        input: { index: path.resolve(__dirname, 'packages/preload/index.ts') },
      },
      sourcemap: 'inline',
      outDir: './dist/preload',
    },
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        '@/': path.join(__dirname, 'packages/renderer/src'),
        styles: path.join(__dirname, 'packages/renderer/assets/styles'),
        '@peepo/core': path.join(__dirname, 'packages/core'),
      },
    },
    customLogger: createLogger('info', {
      allowClearScreen: false,
      prefix: '[vite]',
    }),
    plugins: [react(), tsconfigPaths()],
    // server: {
    //   host: pkg.env.VITE_DEV_SERVER_HOST,
    //   port: pkg.env.VITE_DEV_SERVER_PORT,
    // },
    build: {
      minify: process.env.NODE_ENV !== 'development',
      rollupOptions: {
        input: { index: path.resolve(__dirname, 'index.html'), splash: path.resolve(__dirname, 'splash.html') },
        external: ['better-sqlite3', 'fluent-ffmpeg'],
      },
      outDir: '../dist',
    },
    clearScreen: false,
  },
})
