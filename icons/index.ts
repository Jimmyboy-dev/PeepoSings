import { addCollection } from "@iconify/react"

const modules = import.meta.glob("./*.json")

for (const path in modules) {
  modules[path]().then((mod) => {
    // console.log(path, mod)
    addCollection(mod)
  })
}