import Hero from '#/components/hero.tsx'
import { ModeToggle } from '#/components/mode-toggle.tsx'
import Navbar from '#/components/navbar.tsx'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  )
}
