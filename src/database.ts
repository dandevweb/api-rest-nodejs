import { knex as setupKnex } from 'knex'

export const knex = setupKnex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3307,
    user: 'root',
    password: 'root',
    database: 'api-node',
  },
})
