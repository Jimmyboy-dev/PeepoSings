import { node } from "../../.electron-vendors.cache.json"
import { join } from "path"
import { builtinModules } from "module"
import { defineConfig } from "vite"
import pkg from "../../package.json"

const PACKAGE_ROOT = __dirname

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  envDir: process.cwd(),
  resolve: {
    alias: {
      "/@/": join(PACKAGE_ROOT, "src") + "/",
    },
  },
  build: {
    outDir: "../../dist/main",
    sourcemap: "inline",
    target: `node${node}`,
    assetsDir: ".",
    minify: process.env.MODE !== "development",
    lib: {
      entry: "index.ts",
      formats: ["cjs"],
      fileName: () => "[name].cjs",
    },
    rollupOptions: {
      external: ["electron", "electron-devtools-installer", "fluent-ffmpeg", "@ffmpeg-installer/ffmpeg", "ffmetadata", ...builtinModules.flatMap((p) => [p, `node:${p}`])],

      output: {
        entryFileNames: "[name].cjs",
      },
    },
    emptyOutDir: true,
    brotliSize: false,
  },
})
