import { useEffect, useState } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReducedMotion,
    })
    setLenis(instance)

    let rafId
    const raf = (time) => {
      instance.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return lenis
}
