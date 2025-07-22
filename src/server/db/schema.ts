// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from 'drizzle-orm'
import { index, pgTableCreator } from 'drizzle-orm/pg-core'
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
  (name) => `lvis_noida_interschool_${name}`,
)

export const messages = createTable(
  'message',
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    text: d.varchar({ length: 4096 }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
    user_id: d.varchar().notNull(),
    user_msg: d.boolean().notNull(),
    thread_id: d.varchar().notNull(),
  }),
  (t) => [index('text_idx').on(t.text)],
)
export const threads = createTable('thread', (d) => ({
  id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
  title: d.varchar({ length: 4096 }),
  createdAt: d
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  user_id: d.varchar().notNull(),
}))
