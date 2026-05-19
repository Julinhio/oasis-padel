import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { useTranslation } from 'react-i18next'

function HeroTagline({ reduce }) {
  const { t } = useTranslation()
  const prefix = t('hero.tagline-prefix')
  const accent = t('hero.tagline-accent')
  const suffix = t('hero.tagline-suffix')

  const chars = [
    ...[...prefix].map((c) => ({ c, accent: false })),
    ...[...accent].map((c) => ({ c, accent: true })),
    ...[...suffix].map((c) => ({ c, accent: false })),
  ]
  const total = chars.length

  const [typed, setTyped] = useState(reduce ? total : 0)
  const [done, setDone] = useState(reduce)

  useEffect(() => {
    if (reduce) {
      setTyped(total)
      setDone(true)
      return
    }
    setTyped(0)
    setDone(false)
    let i = 0
    let intervalId
    const startId = setTimeout(() => {
      intervalId = setInterval(() => {
        i += 1
        setTyped(i)
        if (i >= total) {
          clearInterval(intervalId)
          setDone(true)
        }
      }, 44)
    }, 1400)
    return () => {
      clearTimeout(startId)
      clearInterval(intervalId)
    }
  }, [reduce, total])

  return (
    <p
      aria-label={prefix + accent + suffix}
      className="font-grotesk text-[clamp(16px,1.8vw,24px)] font-medium uppercase tracking-[0.15em] text-cream"
    >
      <span aria-hidden="true">
        {chars.map((ch, i) => (
          <motion.span
            key={i}
            animate={{
              opacity: i < typed ? 1 : 0,
              color: ch.accent && done ? '#F2C94C' : '#F0EAE0',
            }}
            transition={{
              opacity: { duration: 0.06 },
              color: { duration: reduce ? 0 : 0.6, ease: 'easeOut' },
            }}
          >
            {ch.c === ' ' ? ' ' : ch.c}
          </motion.span>
        ))}
      </span>
    </p>
  )
}

function Hero() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [heroHeight, setHeroHeight] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    if (video) video.play().catch(() => {})
  }, [])

  useEffect(() => {
    const measure = () => setHeroHeight(sectionRef.current?.offsetHeight ?? 0)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollY } = useScroll()
  const h = heroHeight || 1
  // Rounded to whole pixels so the parallax never lands on a
  // sub-pixel offset (which left a faint seam at the hero base).
  const yRaw = useTransform(scrollY, [0, h], [0, -0.3 * h])
  const y = useTransform(yRaw, (v) => Math.round(v))
  const opacity = useTransform(scrollY, [h * 0.5, h * 0.8], [1, 0])

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-screen min-h-[600px] overflow-hidden bg-black"
    >
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y, opacity }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/hero/hero-poster.webp"
        >
          <source src="/assets/hero/hero-loop.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_44%,rgba(0,0,0,0.6),transparent_72%)]" />

        {/* Permanent bottom mask — hides the video's Veo watermark,
            even as the hero parallaxes upward on scroll. Overhangs
            the base (clipped by the section) so no edge seam shows. */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-6 h-[154px] bg-[linear-gradient(to_top,#1C1C1C_0%,#1C1C1C_45%,transparent_100%)]" />

        <div className="absolute inset-x-0 top-[45%] flex -translate-y-1/2 flex-col items-center px-6 text-center">
          <motion.img
            src="/assets/brand/oasis-wordmark.png"
            alt="Oasis Padel Academy"
            width="1536"
            height="1024"
            initial={reduce ? false : { opacity: 0, scale: 0.95 }}
            animate={reduce ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="h-auto w-[clamp(200px,41vw,550px)] drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)]"
          />

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? {} : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="flex w-full flex-col items-center"
          >
            <div className="mt-6 h-px w-full max-w-md bg-sun" />
            <p className="mt-4 font-grotesk text-sm font-medium uppercase tracking-baseline text-cream">
              PADEL · ACADEMY · LIFESTYLE
            </p>
          </motion.div>
        </div>

        <div className="absolute inset-x-0 bottom-[180px] flex justify-center px-6 text-center">
          <HeroTagline reduce={reduce} />
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? {} : { opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2, ease: 'easeOut' }}
          className="absolute bottom-8 left-8"
        >
          <span className="font-grotesk text-xs font-medium uppercase tracking-micro text-cream/70">
            {t('hero.micro-label')}
          </span>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? {} : { opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4, ease: 'easeOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={reduce ? {} : { opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-3"
          >
            <span className="font-grotesk text-xs font-medium uppercase tracking-micro text-cream/70">
              {t('hero.scroll')}
            </span>
            <span className="h-10 w-px bg-cream/40" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
