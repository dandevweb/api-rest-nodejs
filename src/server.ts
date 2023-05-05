import fastfy from 'fastify'
import { transactionsRoutes } from './routes/transactions'

const app = fastfy()

app.register(transactionsRoutes, {
  prefix: '/transactions',
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Listening on port 3333')
  })
