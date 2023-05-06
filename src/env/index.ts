import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  DB_CONNECTION: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number().default(3306),
  DB_PASSWORD: z.string(),
  DB_USERNAME: z.string(),
  DB_DATABASE: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment variables', _env.error.format())

  process.exit(1)
}

export const env = _env.data
