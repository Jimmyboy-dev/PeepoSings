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
  win: {
    target: "nsis",
    icon: "build/icon.ico",
    publish: { provider: "github" },
  },

  directories: {
    output: "dist",
    buildResources: "buildResources",
  },
  files: ["packages/**/dist/**"],
  extraMetadata: {
    version: process.env.VITE_APP_VERSION,
  },
}

module.exports = config
