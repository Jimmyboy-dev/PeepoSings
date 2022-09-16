const path = require('path')
const { DataSource } = require('typeorm')

const dbPath = `C:\\Users\\jimmy\\AppData\\Roaming\\peepo-sings\\music.db`
const db = new DataSource({
  type: 'better-sqlite3',
  database: dbPath,
  entities: ['packages/main/services/Database/entities/*.ts'],
  migrations: [path.join('packages/main/services/Database/', 'migrations', '*.ts')],
  migrationsTableName: 'peepo_migrations',
  driver: (file, opts) => require('better-sqlite3')(file, { ...opts, nativeBinding: path.join(__dirname, 'node_modules', 'better-sqlite3', 'build', 'Debug/better_sqlite3.node') }),
})

export default db
