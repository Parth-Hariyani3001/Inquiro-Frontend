import { requireAuth } from '#/lib/auth.ts'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  beforeLoad: async () => {
    return await requireAuth()
  },
})

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
