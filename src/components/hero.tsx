import { ArrowUpRight, CirclePlay } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import AnimatedTextGradientMotion from './animated-text'

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,color-mix(in_oklch,var(--primary)_18%,transparent),transparent_70%)]" />
      </div>

      <motion.div
        className="relative z-10 max-w-3xl text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <AnimatedTextGradientMotion />

        <h1 className="mx-auto mt-4 max-w-xl font-medium text-2xl tracking-tight sm:mt-5 sm:text-3xl md:text-4xl md:tracking-[-0.03em]">
          Ship better UI without&nbsp;the&nbsp;hassle
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-base sm:mt-5 sm:text-lg">
          Instead of starting from scratch every time, use thoughtfully designed
          blocks that give you a solid foundation for any UI.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 sm:mt-10 sm:gap-4">
          <Link
            className={`rounded-full ${buttonVariants({ size: 'lg' })}`}
            to="/sign-up/$"
          >
            Get Started <ArrowUpRight className="h-5! w-5!" />
          </Link>
          <Button
            className="rounded-full shadow-none"
            size="lg"
            variant="outline"
          >
            <CirclePlay className="h-5! w-5!" /> Watch Demo
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
