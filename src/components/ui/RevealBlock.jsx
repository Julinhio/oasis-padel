import { motion, useReducedMotion } from 'framer-motion'

const EASE_OUT = [0.22, 1, 0.36, 1]

function RevealBlock({
  children,
  className = '',
  y = 40,
  duration = 0.7,
  delay = 0,
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{
        duration: reduce ? 0.3 : duration,
        ease: EASE_OUT,
        delay: reduce ? 0 : delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default RevealBlock
