import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

function ChapterMark({ number, side = 'left' }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [80, -80])

  const sidePos = side === 'left' ? 'left-[-0.14em]' : 'right-[-0.14em]'

  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      style={reduce ? undefined : { y }}
      className={`pointer-events-none absolute top-0 z-0 select-none font-archivo text-[clamp(170px,28vw,340px)] leading-none text-cream/[0.06] ${sidePos}`}
    >
      {number}
    </motion.span>
  )
}

export default ChapterMark
