declare namespace NodeJS {
  interface ProcessEnv {
    CLIENT_ID: string
    CLIENT_SECRET: string
    REDIRECT_URI: string
    NODE_ENV: 'development' | 'production'
    readonly VITE_DEV_SERVER_HOST: string
    readonly VITE_DEV_SERVER_PORT: string
  }
}

declare module 'daisyui'
declare module 'logger'
