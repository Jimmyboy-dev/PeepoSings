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
    category: 'public.app-category.music',
    target: ['dmg'],
    artifactName: '${productName}-Installer.${ext}',
  },
  linux: {
    extraResources: {
      filter: ['**/*'],
      from: './buildResources/bin/linux',
      to: 'bin',
    },
    desktop: {
      Name: 'Peepo Sings',
    },
    category: 'Audio;AudioVideo;Network;Player;Music',
    target: ['AppImage'],
    artifactName: '${productName}-Installer.${ext}',
  },
  directories: {
    output: 'release/${version}',
    buildResources: 'buildResources',
  },
  fileAssociations: [
    {
      ext: 'mp3',
      mimeType: 'audio/mp3',
    },
    {
      ext: 'mp3',
      mimeType: 'audio/mpeg',
    },
    {
      ext: 'ogg',
      mimeType: 'audio/ogg',
    },
    {
      ext: 'opus',
      mimeType: 'audio/ogg',
    },
    {
      ext: 'aac',
      mimeType: 'audio/aac',
    },
    {
      ext: 'flac',
      mimeType: 'audio/flac',
    },
    {
      ext: 'wav',
      mimeType: 'audio/x-wav',
    },
    {
      ext: 'm4a',
      mimeType: 'audio/m4a',
    },
    {
      ext: 'weba',
      mimeType: 'audio/weba',
    },
    {
      ext: 'mp4',
      mimeType: 'audio/mp4',
    },
    {
      ext: 'webm',
      mimeType: 'audio/webm',
    },
  ],
  files: ['dist/**/*', 'buildResources/*', 'buildResources/icons/*', '!buildResources/bin/**/*'],
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
