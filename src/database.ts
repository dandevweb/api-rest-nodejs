import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

const mysqlConnection = {
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
}

export const config: Knex.Config = {
  client: env.DB_CONNECTION,
  connection: env.DB_CONNECTION === 'pg' ? env.DATABASE_URL : mysqlConnection,
  migrations: {
    extension: 'ts',
    directory: './database/migrations',
  },
}

export const knex = setupKnex(config)
