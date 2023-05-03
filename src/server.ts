import fastfy from 'fastify'
import { knex } from './database'

const app = fastfy()

app.get('/hello', async () => {
  const transaction = await knex('transactions')
    .where('amount', 100)
    .select('*')

  return transaction
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Listening on port 3333')
  })
