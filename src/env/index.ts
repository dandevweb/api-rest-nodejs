import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  APP_PORT: z.coerce.number().default(3333),
  DB_CONNECTION: z.string(),
  DATABASE_URL: z.string(),
  DB_HOST: z.string().nullable().optional(),
  DB_PORT: z.coerce.number().default(3306).optional(),
  DB_PASSWORD: z.string().optional(),
  DB_USERNAME: z.string().optional(),
  DB_DATABASE: z.string().optional(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment variables', _env.error.format())

  process.exit(1)
}

export const env = _env.data
