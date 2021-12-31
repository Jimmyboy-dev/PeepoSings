declare namespace NodeJS {
  interface Global {

  }
  interface Process {
    env: {
      CLIENT_ID: string,
      CLIENT_SECRET: string,
      REDIRECT_URI: string,
    }
  }
}


declare global {


}