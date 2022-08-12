if (process.env.VITE_APP_VERSION === undefined) {
  const now = new Date()
  process.env.VITE_APP_VERSION = `${now.getUTCFullYear() - 2000}.${now.getUTCMonth() + 1}.${now.getUTCDate()}-${now.getUTCHours() * 60 + now.getUTCMinutes()}`
}

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  appId: 'com.devJimmyboy.PeepoSings',
  productName: 'Peepo Sings',
  copyright: 'Copyright © 2021-2022 devJimmyboy',
  icon: 'buildResources/icon.png',
  win: {
    target: 'nsis',
    extraResources: {
      filter: ['**/*'],
      from: './buildResources/bin/windows',
      to: 'bin',
    },
    defaultArch: 'x64',
    icon: 'buildResources/icon.ico',
    artifactName: '${productName}-Setup.${ext}',
  },
  nsis: {
    oneClick: true,
    perMachine: false,
    // allowToChangeInstallationDirectory: true,
    deleteAppDataOnUninstall: false,
  },
  mac: {
    extraResources: {
      filter: ['**/*'],
      from: './buildResources/bin/macos',
      to: 'bin',
    },
    category: 'music',
    target: ['dmg'],
    artifactName: '${productName}-Installer.${ext}',
  },
  linux: {
    extraResources: {
      filter: ['**/*'],
      from: './buildResources/bin/linux',
      to: 'bin',
    },
    category: 'music',
    target: ['AppImage'],
    artifactName: '${productName}-Installer.${ext}',
  },
  directories: {
    output: 'release/${version}',
    buildResources: 'buildResources',
  },
  files: ['dist/**/*', 'buildResources/*', '!buildResources/bin/**/*'],
  publish: {
    provider: 'github',
    owner: 'devJimmyboy',
    repo: 'PeepoSings',
  },
  protocols: {
    name: 'PeepoSings',
    role: 'Viewer',
    schemes: ['irc', 'ircs'],
  },
}

module.exports = config
