const isDev = require("electron-is-dev")
try {
  if (isDev) require("electron-reloader")(module, { ignore: ["src/**/*"] })
} catch (e) {
  console.error(e)
}

console.log("Starting Electron...")
require("./build/main")
