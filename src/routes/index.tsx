import Hero from '#/components/hero.tsx'
import Navbar from '#/components/navbar.tsx'
import { SiteFooter } from '#/components/site-footer.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      <div className="flex-1">
        <Hero />
      </div>
      <SiteFooter />
    </div>
  )
}
