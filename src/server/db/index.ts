import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '~/env'
import * as auth_schema from './auth_schema'
import * as app_schema from './schema'

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined
}

const conn = globalForDb.conn ?? postgres(env.DATABASE_URL)
if (env.NODE_ENV !== 'production') globalForDb.conn = conn

const schema = { ...app_schema, ...auth_schema }

export const db = drizzle(conn, { schema })
