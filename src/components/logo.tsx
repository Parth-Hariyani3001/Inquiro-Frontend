import { BrainCircuit } from 'lucide-react'
import { motion } from 'motion/react'

export const Logo = () => (
  <motion.div
    className="flex cursor-default items-center gap-2.5 select-none"
    initial="rest"
    whileHover="hover"
  >
    <motion.span
      className="inline-flex text-foreground"
      variants={{
        rest: { scale: 1, rotate: 0, filter: 'drop-shadow(0 0 0 transparent)' },
        hover: {
          scale: 1.14,
          rotate: -10,
          filter: 'drop-shadow(0 0 8px color-mix(in oklch, var(--primary) 55%, transparent))',
          transition: { type: 'spring', stiffness: 420, damping: 14 },
        },
      }}
    >
      <BrainCircuit className="size-7" strokeWidth={1.75} />
    </motion.span>
    <motion.span
      className="font-display font-semibold text-lg tracking-tight"
      variants={{
        rest: { x: 0, letterSpacing: '-0.025em' },
        hover: {
          x: 3,
          letterSpacing: '0.04em',
          transition: { type: 'spring', stiffness: 320, damping: 18 },
        },
      }}
    >
      Inquiro
    </motion.span>
  </motion.div>
)
