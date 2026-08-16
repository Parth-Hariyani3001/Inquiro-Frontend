import { buttonVariants } from '#/components/ui/button.tsx'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,color-mix(in_oklch,var(--primary)_20%,transparent),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_90%_15%,color-mix(in_oklch,var(--chart-2)_14%,transparent),transparent_60%)]" />
      </div>

      <div className="absolute top-6 left-6 z-20 sm:top-10 sm:left-10">
        <Link to="/" className={buttonVariants({ variant: 'secondary' })}>
          <ArrowLeft /> Back to home
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-md py-20">
        <Outlet />
      </div>
    </div>
  )
}
