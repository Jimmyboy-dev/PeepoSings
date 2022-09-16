enum IpcEvents {
  STARTED = 'started',

  PLAY = 'play',
  PAUSE = 'pause',
  STOP = 'stop',
  PLAYPAUSE = 'playpause',
  NEXT = 'next',
  PREVIOUS = 'previous',
  VOLUME = 'volume',
  MUTE = 'mute',
  SEEK = 'seek',
  PLAYING_STATUS = 'playing-status',
  SONG_CHANGE = 'song-change',

  WINDOW_MINIMIZE = 'minimize',
  WINDOW_MAXIMIZE = 'maximize',
  WINDOW_CLOSE = 'close',
  WINDOW_OPEN_DEVTOOLS = 'open-devtools',

  MUSIC_ADD = 'music-add',
  MUSIC_ERROR = 'music-error',
  MUSIC_PROGRESS = 'music-progress',
  MUSIC_FINISHED = 'music-finished',
  MUSIC_INFO = 'music-info',
  MUSIC_SEARCH = 'music-search',
  MUSIC_PREVIEW = 'music-preview',

  LOCALFOLDER_REMOVE = 'remove-localfolder',
  LOCALFOLDERS_REFRESH = 'refresh-localfolders',
  LOCALFOLDERS_GET = 'get-localfolders',
  LOCALFOLDERS_SET = 'set-localfolders',
  LOCAL_METAS = 'get-metas',

  QUEUE_CLEAR = 'clear-queue',
  QUEUE = 'queue',
  QUEUE_ADD = 'queue-add',
  QUEUE_DROP = 'queue_drop',

  LOCAL_FILES = 'local-files',
  LOCAL_FILES_PROGRESS = 'local-files-progress',
  LOCAL_FILES_ERROR = 'local-files-error',

  WINDOW_CMD = 'window-cmd',
  RENDERER_LOG = 'renderer-log',

  FILE_START_DRAG = 'file-start-drag',

  GET_OPTION = 'get-option',
  SET_OPTION = 'set-option',
  SET_OPTION_SENSITIVE = 'set-option-sensitive',
  LASTFM_LOGIN = 'lastfm-login',
  LASTFM_SESSION = 'lastfm-session',
  INITIAL_INFO = 'initial-info',
  MUSIC_OPEN_EDITOR = 'music-open-editor',
  DB_UPDATE = 'db-update',
  DB_REMOVE = 'db-remove',
  MUSIC_BACK = 'music-back',
  MUSIC_PLAY = 'music-play',
  MUSIC_FORWARD = 'music-forward',
  MUSIC_MOOD = 'music-mood',

  MOOD_ADD = 'mood-add',
  MANUAL_UPDATE = 'manual-update',
}

export default IpcEvents
