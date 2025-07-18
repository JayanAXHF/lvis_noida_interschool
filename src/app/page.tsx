'use client'
import Link from 'next/link'
import { AppSidebar } from '~/components/app-sidebar'
import { ChartAreaInteractive } from '~/components/chart-area-interactive'
import { DataTable } from '~/components/data-table'
import { SectionCards } from '~/components/section-cards'
import { SiteHeader } from '~/components/site-header'
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar'
import data from '~/app/dashboard/data.json'
import { PlaceholdersAndVanishInput } from '~/components/ui/placeholders-and-vanish-input'

export default function HomePage() {
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
        <SiteHeader />
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
