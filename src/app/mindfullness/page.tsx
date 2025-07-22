import Link from 'next/link'
import data from '~/app/dashboard/data.json'
import { AppSidebar } from '~/components/app-sidebar'
import { ChartAreaInteractive } from '~/components/chart-area-interactive'
import { CircularTimer } from '~/components/circular-timer'
import { DataTable } from '~/components/data-table'
import { SectionCards } from '~/components/section-cards'
import { SiteHeader } from '~/components/site-header'
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar'

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
        <div className="flex size-full flex-1 flex-col">
          <div className="@container/main flex size-full flex-1 flex-col gap-2">
            <div className="flex size-full flex-col items-center justify-center gap-4 py-4 md:gap-6 md:py-6">
              <CircularTimer />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
