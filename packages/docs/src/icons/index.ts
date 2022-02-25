import type { IconifyJSON } from "@iconify/react"
import { addCollection } from "@iconify/react"

const modules = import.meta.glob("./*.json")

window.iconsLoaded = new Promise((resolve, reject) => {
  for (const path in modules) {
    modules[path]().then((mod: any) => {
      // console.log(path, mod)
      addCollection(mod)
    }).then(resolve).catch(reject)
  }
})

declare global {
  interface Window {
    iconsLoaded: Promise<void>
  }
}