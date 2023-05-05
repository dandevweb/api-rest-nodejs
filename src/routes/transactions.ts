import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'

export async function transactionsRoutes(app: FastifyInstance) {
  // list all
  app.get('/', async () => {
    const transactions = await knex('transactions').select()

    return { transactions }
  })

  // show by id
  app.get('/:id', async (request) => {
    const getTransactionParams = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionParams.parse(request.params)

    const transaction = await knex('transactions').where('id', id).first()

    return { transaction }
  })

  // summary
  app.get('/summary', async (request) => {
    const summary = await knex('transactions')
      .sum('amount', { as: 'total' })
      .first()

    return { summary }
  })

  // create
  app.post('/', async (request, reply) => {
    const createTransactionBody = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBody.parse(request.body)

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    })

    return reply.status(201).send()
  })
}
