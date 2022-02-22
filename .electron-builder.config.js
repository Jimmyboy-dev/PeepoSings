// const path = require("path")
// process.env = require("dotenv").config()
process.env.VITE_APP_VERSION = require("./package.json").version
if (process.env.VITE_APP_VERSION === undefined) {
  const now = new Date()
  process.env.VITE_APP_VERSION = `${now.getUTCFullYear() - 2000}.${now.getUTCMonth() + 1}.${now.getUTCDate()}-${
    now.getUTCHours() * 60 + now.getUTCMinutes()
  }`
}

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  appId: "com.devJimmyboy.PeepoSings",
  productName: "Peepo Sings",
  copyright: "Copyright © 2021 devJimmyboy",
  icon: "build/icon.png",
  publish: { provider: "github" },
  win: {
    target: "nsis",
    icon: "build/icon.ico",
  },
  nsis: {
    oneClick: false,
    allowElevation: true,
    allowToChangeInstallationDirectory: true,
  },
  mac: {
    category: "music",
  },
  linux: {
    category: "music",
    target: "AppImage",
  },
  directories: {
    output: "dist",
    buildResources: "build",
  },
  files: ["packages/**/dist/**", "build/**/*"],
  publish: {
    provider: "github",
    owner: "devJimmyboy",
    repo: "PeepoSings",
  },
  extraMetadata: {
    version: process.env.VITE_APP_VERSION,
  },
}

module.exports = config
