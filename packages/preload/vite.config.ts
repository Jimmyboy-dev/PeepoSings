import { builtinModules } from "module"
import { defineConfig } from "vite"
import pkg from "../../package.json"
const PACKAGE_ROOT = __dirname

export default defineConfig({
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  envDir: process.cwd(),
  build: {
    sourcemap: "inline",
    outDir: "../../dist/preload",
    assetsDir: ".",
    lib: {
      entry: "index.ts",
      formats: ["cjs"],
      fileName: () => "[name].cjs",
    },
    /* from mode option */
    minify: process.env.NODE_ENV === "production",
    rollupOptions: {
      external: ["electron", ...builtinModules.flatMap((p) => [p, `node:${p}`])],
    },
    emptyOutDir: true,
    brotliSize: false,
  },
})
