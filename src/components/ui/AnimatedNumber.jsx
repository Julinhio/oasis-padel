import { useEffect, useState } from 'react'
import { animate, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../../hooks/useReveal'

function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  duration = 1.5,
  delay = 0,
  className = '',
}) {
  const { ref, inView } = useReveal()
  const { i18n } = useTranslation()
  const reduce = useReducedMotion()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setCurrent(value)
      return
    }
    const controls = animate(0, value, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setCurrent(v),
    })
    return () => controls.stop()
  }, [inView, value, duration, delay, reduce])

  const formatted = new Intl.NumberFormat(i18n.resolvedLanguage).format(
    Math.round(current),
  )

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}

export default AnimatedNumber
