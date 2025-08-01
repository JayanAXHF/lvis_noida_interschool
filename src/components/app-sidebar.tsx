'use client'

import {
  IconBowl,
  IconBrain,
  IconCamera,
  IconChartBar,
  IconCooker,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInfoHexagon,
  IconInnerShadowTop,
  IconListDetails,
  IconMessage,
  IconPray,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import * as React from 'react'

import { atom, useAtom } from 'jotai'
import { NavDocuments } from '~/components/nav-documents'
import { NavMain } from '~/components/nav-main'
import { NavSecondary } from '~/components/nav-secondary'
import { NavUser } from '~/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '~/components/ui/sidebar'
import { useSession } from '~/lib/auth-client'
import { type NavMainChild, PageData } from '~/lib/data-interface'
import { getUserThreads } from '~/server/queries'

export const threadsAtom = atom<NavMainChild[]>()

const getData = (threads) => {
  console.debug(threads)
  return {
    user: {
      name: 'shadcn',
      email: 'm@example.com',
      avatar: '/avatars/shadcn.jpg',
    },
    navMain: [
      {
        title: 'Chat',
        url: '/',
        icon: IconMessage,
        items: threads
          ? threads.map((thread) => {
              console.table({
                title: thread.title ?? '',
                thread_id: thread.thread_id,
              })
              return {
                title: thread.title ?? '',
                thread_id: thread.id,
              }
            })
          : [],
      },
      {
        title: 'Mindfulness',
        url: '/mindfullness',
        icon: IconBrain,
      },
      {
        title: 'Comfort Foods',
        url: '/cooking',
        icon: IconBowl,
      },
      {
        title: 'Self-help',
        url: '/self-help',
        icon: IconInfoHexagon,
      },
    ],
    navClouds: [
      {
        title: 'Capture',
        icon: IconCamera,
        isActive: true,
        url: '#',
        items: [
          {
            title: 'Active Proposals',
            url: '#',
          },
          {
            title: 'Archived',
            url: '#',
          },
        ],
      },
      {
        title: 'Proposal',
        icon: IconFileDescription,
        url: '#',
        items: [
          {
            title: 'Active Proposals',
            url: '#',
          },
          {
            title: 'Archived',
            url: '#',
          },
        ],
      },
      {
        title: 'Prompts',
        icon: IconFileAi,
        url: '#',
        items: [
          {
            title: 'Active Proposals',
            url: '#',
          },
          {
            title: 'Archived',
            url: '#',
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: 'Settings',
        url: '#',
        icon: IconSettings,
      },
      {
        title: 'Get Help',
        url: '#',
        icon: IconHelp,
      },
      {
				title: (<span>Search Chats&nbsp;<kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
					<span className="text-xs">⌘</span>K
				</kbd></span>),
        url: '#',
        icon: IconSearch,
      },
    ],
  }
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()
  const userId = session?.user?.id ?? ''
  const query = useQuery({
    queryKey: ['user-threads'],
    queryFn: () => getUserThreads(userId),
  })
  const [threads, setThreads] = useAtom(threadsAtom)
  React.useEffect(() => {
    setThreads(
      (_prev) =>
        query.data?.map((thread) => {
          return {
            title: thread.title ?? '',
            thread_id: thread.id,
          }
        }) as NavMainChild[],
    )
  }, [query.data])

  if (query.isLoading) {
    return <div>Loading...</div>
  }
  const data = getData(threads ?? [])

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="font-semibold text-base">
                  Lotus Valley GGN
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {data && (
        <>
          <SidebarContent>
            <NavMain items={data.navMain} />
            <NavSecondary items={data.navSecondary} className="mt-auto" />
          </SidebarContent>
          <SidebarFooter>
            <NavUser user={data.user} />
          </SidebarFooter>
        </>
      )}
    </Sidebar>
  )
}
