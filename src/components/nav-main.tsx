'use client'

import { DialogClose } from '@radix-ui/react-dialog'
import { type Icon, IconCirclePlusFilled, IconMail } from '@tabler/icons-react'
import { useAtom } from 'jotai'
import { ChevronRight, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { currentThreadAtom } from '~/app/page'
import { Button } from '~/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/ui/collapsible'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '~/components/ui/sidebar'
import { useSession } from '~/lib/auth-client'
import { addThread } from '~/server/queries'
import { threadsAtom } from './app-sidebar'
import { Input } from './ui/input'
import { SidebarGroupContent } from './ui/sidebar'

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
    items?: {
      title: string
      thread_id: number
    }[]
  }[]
}) {
  const [currentThread, setCurrentThread] = useAtom(currentThreadAtom)
  const [newThreadTitle, setNewThreadTitle] = useState('')
  const [threads, setThreads] = useAtom(threadsAtom)
  const { data: session } = useSession()
  const userId = session?.user?.id ?? ''
  console.debug(items)

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger className="w-full">
                <SidebarMenuButton
                  tooltip="Create new Chat"
                  className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
                >
                  <IconCirclePlusFilled />
                  <span>Create new Chat</span>
                </SidebarMenuButton>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Chat</DialogTitle>
                </DialogHeader>
                <Input
                  onChange={(e) => setNewThreadTitle(e.target.value)}
                  placeholder="Title"
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant="default"
                      className="w-full"
                      onClick={async () => {
                        const thread = await addThread(userId, newThreadTitle)
                        if (thread) {
                          console.debug('TEst:')
                          console.debug(thread)
                          console.table({
                            thread_id: thread[thread.length - 1]?.id ?? 0,
                            title: newThreadTitle,
                          })

                          setThreads((prev) => [
                            ...(prev ?? []),
                            {
                              thread_id: thread[thread.length - 1]?.id ?? 0,
                              title: newThreadTitle,
                            },
                          ])
                        }
                      }}
                    >
                      Create
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={false}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <Link href={item.url}>{item.title}</Link>
                    {item.title === 'Chat' && (
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {item.title === 'Chat' &&
                    threads &&
                    threads?.map((thread) => {
                      return (
                        <SidebarMenuSub key={thread.thread_id}>
                          <SidebarMenuSubButton
                            onClick={() => {
                              setCurrentThread(thread.thread_id)
                              console.debug(`test: ${thread.thread_id}`)
                            }}
                            className="cursor-pointer"
                          >
                            <Link href={item.url}>{thread.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSub>
                      )
                    })}
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
