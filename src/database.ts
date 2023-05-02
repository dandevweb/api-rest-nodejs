import { knex as setupKnex, Knex } from 'knex'

export const config: Knex.Config = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3307,
    user: 'root',
    password: 'root',
    database: 'api-node',
  },
  migrations: {
    extension: 'ts',
    directory: './database/migrations',
  },
}

export const knex = setupKnex(config)
