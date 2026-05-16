import { motion, useReducedMotion } from 'framer-motion'

function MicroLabel({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion()

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: reduce ? 0 : delay }}
      className={`font-grotesk text-xs font-medium uppercase tracking-micro text-sand ${className}`}
    >
      {children}
    </motion.span>
  )
}

export default MicroLabel
