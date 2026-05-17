import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import MicroLabel from '../ui/MicroLabel'
import RevealText from '../ui/RevealText'
import RevealBlock from '../ui/RevealBlock'
import AnimatedNumber from '../ui/AnimatedNumber'

const STATS = [
  { value: 25, suffix: '+' },
  { value: 80, suffix: '%' },
  { value: 10, years: true },
  { value: 100, suffix: '%' },
]

const inView = { once: true, margin: '0px 0px -15% 0px' }

function Impact() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const stats = t('impact.stats', { returnObjects: true })
  const years = t('impact.years')

  const accentLine = (
    <motion.span
      initial={reduce ? false : { color: '#F2C94C' }}
      whileInView={reduce ? {} : { color: '#FFFFFF' }}
      viewport={{ once: true }}
      transition={{ delay: 1.7, duration: 0.6, ease: 'easeOut' }}
    >
      {t('impact.headline-accent')}
    </motion.span>
  )

  return (
    <section id="impact" className="relative bg-black py-section-y">
      <div className="mx-auto w-full max-w-content px-6 md:px-12 lg:px-20">
        <MicroLabel className="mb-12 block lg:mb-20">
          {t('impact.micro-label')}
        </MicroLabel>

        <RevealText
          lines={[t('impact.headline-line1'), accentLine]}
          as="h2"
          className="font-archivo text-headline text-white"
        />

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={reduce ? {} : { opacity: 1 }}
          viewport={inView}
          transition={{ duration: 0.5, delay: reduce ? 0 : 1.2, ease: 'easeOut' }}
          className="mt-8 max-w-[55ch] font-grotesk text-lg text-sand"
        >
          {t('impact.subtitle')}
        </motion.p>

        <div className="mt-12 grid grid-cols-1 gap-x-12 sm:grid-cols-2">
          {STATS.map((s, i) => (
            <RevealBlock
              key={i}
              y={40}
              delay={i * 0.2}
              className="border-t border-cream/15 py-10"
            >
              <span className="font-grotesk text-xs font-medium tracking-micro text-sun">
                {stats[i].index}
              </span>
              <AnimatedNumber
                value={s.value}
                suffix={s.years ? ` ${years}` : s.suffix || ''}
                delay={i * 0.2 + 0.3}
                className="mt-4 block font-archivo text-[clamp(56px,7vw,80px)] leading-none tabular-nums text-white"
              />
              <p className="mt-5 font-grotesk text-base font-medium text-cream">
                {stats[i].label}
              </p>
              <p className="mt-1 max-w-[30ch] font-grotesk text-sm text-sand">
                {stats[i].sublabel}
              </p>
            </RevealBlock>
          ))}
        </div>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={reduce ? {} : { opacity: 1 }}
          viewport={inView}
          transition={{ duration: 0.6, delay: reduce ? 0 : 1.9, ease: 'easeOut' }}
          className="mt-16 max-w-[60ch] font-inter text-lg italic text-cream"
        >
          {t('impact.closing')}
        </motion.p>
      </div>
    </section>
  )
}

export default Impact
