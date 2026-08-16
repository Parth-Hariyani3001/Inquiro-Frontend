import { motion } from 'motion/react'

const PRIMARY = 'oklch(0.6723 0.1606 244.9955)'
const CHART_2 = 'oklch(0.6907 0.1554 160.3454)'

const AnimatedTextGradientMotion = () => {
  return (
    <motion.p
      className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-center font-display font-extrabold text-3xl text-transparent tracking-tight sm:text-7xl sm:tracking-[-0.04em]"
      animate={{
        backgroundImage: [
          `linear-gradient(to right, ${PRIMARY}, ${CHART_2})`,
          `linear-gradient(to right, ${CHART_2}, ${PRIMARY})`,
        ],
      }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'linear',
      }}
    >
      Inquiro
    </motion.p>
  )
}

export default AnimatedTextGradientMotion
