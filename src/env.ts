import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
  STRIPE_API_KEY: z.string(),
  DATABASE_URL: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
})

export const env = envSchema.parse(process.env)
