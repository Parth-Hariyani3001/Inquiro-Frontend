import { AppSidebar } from '#/components/app-sidebar.tsx'
import { ModeToggle } from '#/components/mode-toggle.tsx'
import { Separator } from '#/components/ui/separator.tsx'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '#/components/ui/sidebar.tsx'
import { requireAuth } from '#/lib/auth.ts'
import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  beforeLoad: async () => {
    return await requireAuth()
  },
})

function RouteComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const title = pathname.startsWith('/dashboard/explore') ? 'Explore' : 'Dashboard'

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-full" />
          <h1 className="font-serif text-sm tracking-tight">{title}</h1>
          <div className="ml-auto">
            <ModeToggle />
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
