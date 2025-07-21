'use client'

import * as React from 'react'
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from 'lucide-react'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '~/components/ui/command'
import { useQuery } from '@tanstack/react-query'
import { getUserThreads } from '~/server/queries'
import { useSession } from '~/lib/auth-client'
import { useRouter } from 'next/navigation'
import { currentThreadAtom } from '~/app/page'
import { useAtom } from 'jotai'

export function GlobalSearch() {
  const [open, setOpen] = React.useState(false)
  const { data: session } = useSession()
  const userId = session?.user?.id ?? ''
  const router = useRouter()
  const { data: threads, isSuccess } = useQuery({
    queryKey: ['user-threads'],
    queryFn: () => getUserThreads(userId),
  })
  const [_, setCurrentThread] = useAtom(currentThreadAtom)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <p className="text-muted-foreground text-sm">
        Press{' '}
        <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
          <span className="text-xs">⌘</span>J
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Chats">
            {isSuccess &&
              threads?.map((thread) => {
                return (
                  <CommandItem
                    key={thread.id}
                    onSelect={() => {
                      setCurrentThread(thread.id)
                      router.push(`/`)
											setOpen(false)
                    }}
                  >
                    <span>{thread.title}</span>
                  </CommandItem>
                )
              })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
