import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import MicroLabel from '../ui/MicroLabel'
import RevealText from '../ui/RevealText'
import ChapterMark from '../ui/ChapterMark'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const SUBSECTIONS = [
  { key: 'courts', image: '/assets/club/courts.png', imageLeft: true, reveal: 'up' },
  { key: 'wellness', image: '/assets/club/wellness.png', imageLeft: false, reveal: 'right' },
  { key: 'lounge', image: '/assets/club/lounge.png', imageLeft: true, reveal: 'left' },
]

// clip-path start state per reveal direction; animates to inset(0)
const CLIP_FROM = {
  up: 'inset(100% 0% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
  left: 'inset(0% 100% 0% 0%)',
}

const inView = { once: true, margin: '0px 0px -15% 0px' }

function ClubSubsection({ data, image, alt, imageLeft, reveal, chapter }) {
  const reduce = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  // Lateral reveals only on desktop; mobile single-column falls back to bottom-up
  const clipFrom = CLIP_FROM[isDesktop ? reveal : 'up']

  return (
    <div className="relative z-10 overflow-hidden py-section-y">
      {chapter && <ChapterMark number={chapter} side="right" />}

      <div className="relative z-10 mx-auto grid w-full max-w-content grid-cols-1 items-center gap-10 px-6 md:px-12 lg:grid-cols-12 lg:gap-16 lg:px-20">
        <motion.div
          initial={reduce ? false : { clipPath: clipFrom }}
          whileInView={reduce ? {} : { clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={inView}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className={`lg:col-span-7 ${imageLeft ? 'lg:order-1' : 'lg:order-2'}`}
        >
          <img
            src={image}
            alt={alt}
            loading="lazy"
            className="aspect-[16/10] w-full rounded-sm object-cover"
          />
        </motion.div>

        <div
          className={`lg:col-span-5 ${imageLeft ? 'lg:order-2' : 'lg:order-1'}`}
        >
          <motion.span
            initial={reduce ? false : { opacity: 0 }}
            whileInView={reduce ? {} : { opacity: 1 }}
            viewport={inView}
            transition={{ duration: 0.3, delay: reduce ? 0 : 0.3, ease: 'easeOut' }}
            className="block font-grotesk text-sm font-medium tracking-micro text-sun"
          >
            {data.index}
          </motion.span>

          <RevealText
            lines={data.headline}
            as="h3"
            className="mt-4 font-archivo text-subhead text-white"
          />

          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            whileInView={reduce ? {} : { opacity: 1 }}
            viewport={inView}
            transition={{ duration: 0.5, delay: reduce ? 0 : 1, ease: 'easeOut' }}
            className="mt-6 font-inter text-base text-cream"
          >
            {data.paragraph}
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            variants={{
              visible: {
                transition: {
                  staggerChildren: reduce ? 0 : 0.2,
                  delayChildren: reduce ? 0 : 1.3,
                },
              },
            }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
          >
            {data.specs.map((spec, i) => (
              <motion.span
                key={i}
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="font-grotesk text-xs font-medium uppercase tracking-micro text-sand"
              >
                {spec}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function Club() {
  const { t } = useTranslation()

  return (
    <section id="club" className="relative bg-black">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-transparent to-anthracite/30"
      />

      <div className="pointer-events-none sticky top-24 z-20 mx-auto max-w-content px-6 md:px-12 lg:px-20">
        <MicroLabel className="block">{t('club.micro-label')}</MicroLabel>
      </div>

      {SUBSECTIONS.map((sub, i) => {
        const data = t(`club.${sub.key}`, { returnObjects: true })
        return (
          <ClubSubsection
            key={sub.key}
            data={data}
            image={sub.image}
            alt={data.headline.join(' ')}
            imageLeft={sub.imageLeft}
            reveal={sub.reveal}
            chapter={i === 0 ? '03' : null}
          />
        )
      })}
    </section>
  )
}

export default Club
