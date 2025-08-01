'use client'
import { useQuery } from '@tanstack/react-query'
import { atom, useAtom } from 'jotai'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import data from '~/app/dashboard/data.json'
import { AppSidebar } from '~/components/app-sidebar'
import { ChartAreaInteractive } from '~/components/chart-area-interactive'
import { DataTable } from '~/components/data-table'
import { SectionCards } from '~/components/section-cards'
import { SiteHeader } from '~/components/site-header'
import { Button } from '~/components/ui/button'
import { PlaceholdersAndVanishInput } from '~/components/ui/placeholders-and-vanish-input'
import { ScrollArea } from '~/components/ui/scroll-area'
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar'
import { useSession } from '~/lib/auth-client'
import type { Message } from '~/lib/data-interface'
import { addMessage, getThread, getThreadMessages } from '~/server/queries'

export const currentThreadAtom = atom(0)

export default function HomePage() {
  const { data: session } = useSession()
  const [currentThread, _setCurrentThread] = useAtom(currentThreadAtom)
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const data = await getThreadMessages(currentThread)
      setMessages(data)
    }
    fetchData()
  }, [currentThread])
  const query = useQuery({
    queryKey: ['thread', currentThread],
    queryFn: () => getThread(currentThread),
  })
  const thread = query.data ?? null
  if (!session) {
    return (
      <div className="flex h-dvh w-dvw items-center justify-center">
        <span className="flex flex-row gap-5">
          {' '}
          <Link href="/sign-in">
            <Button variant="outline" className="">
              Login
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="default" className="">
              Sign Up
            </Button>
          </Link>
        </span>
      </div>
    )
  }

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="my-0 py-0">
        <SiteHeader title={thread?.title ?? ''} />
        <div className="mx-auto flex h-full max-h-full w-full max-w-3xl flex-col content-between">
          <div className="@container/main flex max-h-full flex-1 flex-col gap-2">
            <ScrollArea className="overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col gap-1 ${
                    message.user_msg ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.user_msg
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </ScrollArea>
          </div>
          <div className="flex flex-col justify-end gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6">
              <PlaceholdersAndVanishInput
                onChange={(e) => setMessage(e.target.value)}
                placeholders={['test']}
                loading={loading}
                onSubmit={async () => {
                  setLoading(true)
                  try {
                    const uMsg = await addMessage(currentThread, message, true)
                    const response = await fetch('/api/generate', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        body: message,
                      }),
                    })
                    const data = await response.json()
                    setMessage('')
                    const cMsg = await addMessage(
                      currentThread,
                      data.output,
                      false,
                    )
                    if (uMsg && cMsg) {
                      setMessages(
                        (prev) => [...prev, uMsg[0], cMsg[0]] as Message[],
                      )
                    }
                  } catch (error) {
                    console.error(error)
                  }
                  setLoading(false)
                }}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
