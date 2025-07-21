'use server'
import { db } from './db'
import {
  messages as messagesSchema,
  threads as threadsSchema,
} from './db/schema'
import { auth } from '~/lib/auth'
import { eq } from 'drizzle-orm'
import { getSession, useSession } from '~/lib/auth-client'
import { headers } from 'next/headers'

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

export const getThreadMessages = async (threadId: number) => {
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

export const addMessage = async (
  threadId: number,
  message: string,
  isUserMessage: boolean,
) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    if (!session) {
      console.error('No session found')
      return null
    }
    const userId = session?.user.id

    const newMessage = await db
      .insert(messagesSchema)
      .values({
        thread_id: String(threadId),
        text: message,
        user_msg: isUserMessage,
        user_id: userId,
      })
      .returning()
    return newMessage
  } catch (error) {
    console.error(error)
    return null
  }
}
