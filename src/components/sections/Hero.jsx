import { useEffect, useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { useTranslation } from 'react-i18next'

function Hero() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) video.play().catch(() => {})
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const opacity = useTransform(scrollYProgress, [0.5, 0.8], [1, 0])

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

        <div className="absolute inset-x-0 top-[45%] flex -translate-y-1/2 flex-col items-center px-6 text-center">
          <motion.h1
            initial={reduce ? false : { opacity: 0, scale: 0.95 }}
            animate={reduce ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="font-syncopate text-[clamp(2.75rem,9vw,7.5rem)] font-bold leading-none text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)]"
          >
            OASIS
          </motion.h1>

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

          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? {} : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
            className="mt-5 font-grotesk text-base text-cream/80 sm:text-lg"
          >
            {t('hero.subtitle')}
          </motion.p>
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
