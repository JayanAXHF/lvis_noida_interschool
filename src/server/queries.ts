'use server'
import { db } from './db'
import {
  messages as messagesSchema,
  threads as threadsSchema,
} from './db/schema'
import { auth } from '~/lib/auth'
import { headers } from 'next/headers'
import { eq } from 'drizzle-orm'

export const getUserThreads = async (userId: string) => {
  try {
    const threads = await db
      .select()
      .from(threadsSchema)
      .where(eq(threadsSchema.user_id, userId))
    return threads
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getThreadMessages = async (threadId: string) => {
  try {
    const messages = await db
      .select()
      .from(messagesSchema)
      .where(eq(messagesSchema.thread_id, threadId))
    return messages
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getThread = async (threadId: number) => {
  try {
    const thread = await db
      .selectDistinct()
      .from(threadsSchema)
      .where(eq(threadsSchema.id, threadId))
    return thread[0] || []
  } catch (error) {
    console.error(error)
    return null
  }
}

export const addThread = async (userId: string, title: string) => {
  try {
    const thread = await db
      .insert(threadsSchema)
      .values({
        user_id: userId,
        title: title,
      })
      .returning()
    return thread
  } catch (error) {
    console.error(error)
    return null
  }
}
