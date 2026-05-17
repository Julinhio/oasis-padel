import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import MicroLabel from '../ui/MicroLabel'
import RevealText from '../ui/RevealText'
import RevealBlock from '../ui/RevealBlock'
import AnimatedNumber from '../ui/AnimatedNumber'
import ChapterMark from '../ui/ChapterMark'

const PILLARS = [
  { value: 6, suffix: '+' },
  { value: 50, suffix: '%' },
  { value: 20, suffix: '' },
]

const inView = { once: true, margin: '0px 0px -15% 0px' }

function Academy() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const pillars = t('academy.pillars', { returnObjects: true })

  return (
    <section
      id="academy"
      className="relative flex min-h-screen items-center overflow-hidden py-section-y lg:min-h-[120vh]"
    >
      <motion.img
        src="/assets/academy/academy-hero.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        animate={reduce ? {} : { scale: [1, 1.05, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-black/70" />
      <ChapterMark number="04" side="left" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 md:px-12 lg:px-20">
        <MicroLabel className="mb-12 block lg:mb-20">
          {t('academy.micro-label')}
        </MicroLabel>

        <RevealText
          lines={t('academy.headline', { returnObjects: true })}
          as="h2"
          className="font-archivo text-headline text-white"
        />

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={reduce ? {} : { opacity: 1 }}
          viewport={inView}
          transition={{ duration: 0.5, delay: reduce ? 0 : 1.2, ease: 'easeOut' }}
          className="mt-8 max-w-[55ch] font-grotesk text-lg font-medium text-cream"
        >
          {t('academy.subtitle')}
        </motion.p>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={reduce ? {} : { opacity: 1 }}
          viewport={inView}
          transition={{ duration: 0.5, delay: reduce ? 0 : 1.5, ease: 'easeOut' }}
          className="mt-5 max-w-[60ch] font-inter text-base text-cream/80"
        >
          {t('academy.paragraph')}
        </motion.p>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-20">
          {PILLARS.map((p, i) => (
            <RevealBlock
              key={i}
              y={30}
              delay={i * 0.2}
              className="rounded border border-cream/10 bg-black/60 p-8 backdrop-blur-md"
            >
              <span className="font-grotesk text-xs font-medium tracking-micro text-sun">
                {pillars[i].index}
              </span>
              <AnimatedNumber
                value={p.value}
                suffix={p.suffix}
                delay={i * 0.2}
                className="mt-6 block font-archivo text-6xl tabular-nums text-sun"
              />
              <p className="mt-3 font-grotesk text-base text-cream">
                {pillars[i].label}
              </p>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Academy
