import fastfy from 'fastify'
import { knex } from './database'

const app = fastfy()

app.get('/hello', async () => {
  const tables = knex('schema').select('*')

  return tables
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Listening on port 3333')
  })
