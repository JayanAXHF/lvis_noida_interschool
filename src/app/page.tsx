'use client'
import Link from 'next/link'
import { AppSidebar } from '~/components/app-sidebar'
import { atom, useAtom } from 'jotai'
import { ChartAreaInteractive } from '~/components/chart-area-interactive'
import { DataTable } from '~/components/data-table'
import { SectionCards } from '~/components/section-cards'
import { SiteHeader } from '~/components/site-header'
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar'
import data from '~/app/dashboard/data.json'
import { PlaceholdersAndVanishInput } from '~/components/ui/placeholders-and-vanish-input'
import { useSession } from '~/lib/auth-client'
import { Button } from '~/components/ui/button'
import { getThread } from '~/server/queries'
import { useQuery } from '@tanstack/react-query'

export const currentThreadAtom = atom(0)

export default function HomePage() {
  const { data: session } = useSession()
  const [currentThread, setCurrentThread] = useAtom(currentThreadAtom)
  const query = useQuery({
    queryKey: ['thread', currentThread],
    queryFn: () => getThread(currentThread),
  })
  const thread = query.data ?? null
  if (!session) {
    return (
      <div className="h-dvh w-dvw flex justify-center items-center">
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
      <SidebarInset>
        <SiteHeader title={thread?.title ?? ''} />
        <div className="flex flex-col content-between h-full">
          <div className="@container/main flex flex-1 flex-col gap-2 h-full">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6"></div>
          </div>
          <div className="flex justify-end flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <PlaceholdersAndVanishInput
                onChange={() => {}}
                placeholders={['test']}
                onSubmit={() => {}}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
