/**
 * Essential module for creating/loading the app config
 */

import path from 'path';
import electron from 'electron';
import teeny from 'teeny-conf';

import Module from './module';
import { PeepoSingConfig, Repeat, SortBy, SortOrder } from "../../../shared/types/peepo-sings";

const { app } = electron;

class ConfigModule extends Module {
  protected workArea: Electron.Rectangle;
  protected conf: teeny | undefined;

  constructor() {
    super();

    this.workArea = electron.screen.getPrimaryDisplay().workArea;
  }

  async load(): Promise<void> {
    const defaultConfig: Partial<PeepoSingConfig> = this.getDefaultConfig();
    const pathUserData = app.getPath('userData');

    this.conf = new teeny(path.join(pathUserData, 'config.json'), defaultConfig);

    // Check if config update
    let configChanged = false;

    (Object.keys(defaultConfig) as (keyof PeepoSingConfig)[]).forEach((key) => {
      if (this.conf && this.conf.get(key) === undefined) {
        this.conf.set(key, defaultConfig[key]);
        configChanged = true;
      }
    });

    // save config if changed
    if (configChanged) this.conf.save();
  }

  getDefaultConfig(): PeepoSingConfig {
    const config: PeepoSingConfig = {
      theme: '__system',
      audioVolume: 1,
      audioPlaybackRate: 1,
      audioOutputDevice: 'default',
      audioMuted: false,
      audioShuffle: false,
      audioRepeat: Repeat.NONE,
      defaultView: 'library',
      librarySort: {
        by: SortBy.ARTIST,
        order: SortOrder.ASC,
      },
      // musicFolders: [],
      sleepBlocker: false,
      autoUpdateChecker: true,
      minimizeToTray: false,
      displayNotifications: true,
      autoPlay: true,
      runOnStartup: false,
      scrobblerKeys: {
        apiKey: null,
        apiSecret: null,
      }
    };

    return config;
  }

  getConfig(): PeepoSingConfig {
    if (!this.conf) {
      throw new Error('Config not loaded');
    }

    return this.conf.get() as PeepoSingConfig; // Maybe possible to type TeenyConf with Generics?
  }

  get<T extends keyof PeepoSingConfig>(key: T): PeepoSingConfig[T] {
    if (!this.conf) {
      throw new Error('Config not loaded');
    }

    return this.conf.get(key);
  }

  set<T extends keyof PeepoSingConfig>(key: T, value: PeepoSingConfig[T]): void {
    if (!this.conf) {
      throw new Error('Config not loaded');
    }

    return this.conf.set(key, value);
  }

  save(): void {
    if (!this.conf) {
      throw new Error('Config not loaded');
    }

    return this.conf.save();
  }

  reload(): void {
    if (!this.conf) {
      throw new Error('Config not loaded');
    }

    this.conf.reload();
  }
}

export default ConfigModule;
