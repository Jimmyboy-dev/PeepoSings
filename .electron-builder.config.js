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
  asar: true,
  win: {
    target: "nsis",
    defaultArch: "x64",
    icon: "build/icon.ico",
    artifactName: "${productName}-${version}-Setup.${ext}",
  },
  nsis: {
    oneClick: false,
    perMachine: false,
    allowToChangeInstallationDirectory: true,
    deleteAppDataOnUninstall: false,
  },
  mac: {
    category: "music",
    target: ["dmg"],
    artifactName: "${productName}-${version}-Installer.${ext}",
  },
  linux: {
    category: "music",
    target: ["AppImage"],
    artifactName: "${productName}-${version}-Installer.${ext}",
  },
  directories: {
    output: "release/${version}",
    buildResources: "build",
  },
  files: ["dist", "build/**/*"],
  publish: {
    provider: "github",
    owner: "devJimmyboy",
    repo: "PeepoSings",
  },
}

module.exports = config
