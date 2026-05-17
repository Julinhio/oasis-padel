import { motion, useReducedMotion } from 'framer-motion'

const EASE_OUT = [0.22, 1, 0.36, 1]

function RevealText({
  lines,
  as: Tag = 'h2',
  className = '',
  lineClassName = '',
  y = 120,
  stagger = 0.2,
  duration = 1.5,
  delayChildren = 0,
  viewportMargin = '0px 0px -20% 0px',
}) {
  const reduce = useReducedMotion()

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduce ? 0 : stagger, delayChildren },
    },
  }

  const line = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.3 : duration, ease: EASE_OUT },
    },
  }

  return (
    <Tag className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: viewportMargin }}
        className="block"
      >
        {lines.map((text, i) => (
          <motion.span
            key={i}
            variants={line}
            className={`block ${lineClassName}`}
          >
            {text}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  )
}

export default RevealText
