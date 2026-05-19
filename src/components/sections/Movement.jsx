import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import MicroLabel from '../ui/MicroLabel'
import RevealText from '../ui/RevealText'
import RevealBlock from '../ui/RevealBlock'
import AnimatedNumber from '../ui/AnimatedNumber'
import MapAsia from '../ui/MapAsia'
import ChapterMark from '../ui/ChapterMark'

const STATS = [
  { value: 30, suffix: 'M+' },
  { value: 150, prefix: '+', suffix: '%' },
  { value: 4500 },
  { value: 45 },
  { value: 1, highlight: true },
]

function Movement() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const headline = t('movement.headline', { returnObjects: true })
  const labels = t('movement.stats', { returnObjects: true })

  return (
    <section
      id="movement"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-black py-section-y lg:min-h-[120vh]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 z-0 h-[60vh] w-[60vh] max-h-[700px] max-w-[700px]"
        style={{
          background:
            'radial-gradient(circle at top right, rgba(242,201,76,0.06) 0%, rgba(242,201,76,0) 70%)',
        }}
      />
      <ChapterMark number="02" side="left" />

      <div className="relative z-10 mx-auto w-full max-w-content px-6 md:px-12 lg:px-20">
        <MicroLabel className="mb-12 block lg:mb-20">
          {t('movement.micro-label')}
        </MicroLabel>

        <RevealText
          lines={headline}
          as="h2"
          className="font-archivo text-headline text-white"
        />

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={reduce ? {} : { opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ duration: 0.5, delay: reduce ? 0 : 0.45, ease: 'easeOut' }}
          className="mt-10 max-w-[60ch] font-inter text-lg text-cream"
        >
          {t('movement.paragraph')}
        </motion.p>

        <div className="mt-16 lg:mt-24 lg:flex lg:items-center lg:gap-16">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-12 lg:flex-1">
            {STATS.map((s, i) => (
              <RevealBlock
                key={i}
                delay={i * 0.06}
                className="basis-full text-center sm:basis-[calc(50%_-_1rem)] lg:basis-[calc(33.333%_-_1.34rem)]"
              >
                <AnimatedNumber
                  value={s.value}
                  prefix={s.prefix || ''}
                  suffix={s.suffix || ''}
                  delay={i * 0.06}
                  className={`block font-archivo text-4xl tabular-nums lg:text-6xl ${
                    s.highlight ? 'text-sun' : 'text-white'
                  }`}
                />
                <p className="mt-3 font-grotesk text-sm text-sand">
                  {labels[i]}
                </p>
              </RevealBlock>
            ))}
          </div>

          <div className="mx-auto mt-16 w-full max-w-sm lg:mx-0 lg:mt-0 lg:w-[38%] lg:max-w-none">
            <MapAsia />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Movement
