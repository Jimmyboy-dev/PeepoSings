import RPC from 'discord-rpc'

// const scopes = ['rpc']
const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID as string
const clientSecret = import.meta.env.VITE_DISCORD_CLIENT_SECRET as string

export default function initRPC() {
  RPC.register(clientId)
  const client = new RPC.Client({ transport: 'ipc' })
  client.on('ready', () => {
    console.log('Discord RPC ready')
    console.log('RPC Logged in as', client.application?.name)
    console.log('RPC Authenticated for', client.user?.username)
  })
  // console.log(clientId, clientSecret)
  client
    .login({ clientId, clientSecret })
    .then(() => {
      console.log('Discord RPC connected')
      console.log(client.user?.id)
    })
    .catch((err) => {
      console.error('Discord RPC error:', err)
    })
  return client
}
