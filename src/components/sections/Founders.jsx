import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { MapPin } from 'lucide-react'
import MicroLabel from '../ui/MicroLabel'
import RevealText from '../ui/RevealText'

const inView = { once: true, margin: '0px 0px -15% 0px' }

function FounderCard({ person, index }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={inView}
      transition={{
        duration: 0.7,
        delay: reduce ? 0 : index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <motion.div
        initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
        whileInView={reduce ? {} : { clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={inView}
        transition={{
          duration: 1,
          delay: reduce ? 0 : index * 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="overflow-hidden rounded-[2px] transition-shadow duration-300 group-hover:shadow-[0_10px_44px_rgba(242,201,76,0.1)]"
      >
        <div className="flex aspect-[4/5] items-center justify-center bg-[#2A2A2A] transition-transform duration-300 ease-out [container-type:size] group-hover:scale-[1.03]">
          <span className="font-archivo text-[85cqh] leading-none text-sun">
            {person.initial}
          </span>
        </div>
      </motion.div>

      <div className="pt-6">
        <span className="font-grotesk text-xs font-medium tracking-micro text-sun">
          {person.index}
        </span>
        <h3 className="mt-2 font-archivo text-xl tracking-name text-white">
          {person.name}
        </h3>
        <p className="mt-1 font-grotesk text-base font-medium text-cream">
          {person.role}
        </p>
        <p className="mt-2 flex items-center gap-1.5 font-grotesk text-sm text-sand">
          <MapPin size={12} strokeWidth={1.5} className="shrink-0" />
          {person.location}
        </p>
      </div>
    </motion.div>
  )
}

function Founders() {
  const { t } = useTranslation()
  const people = t('founders.people', { returnObjects: true })

  return (
    <section id="founders" className="relative bg-black py-section-y">
      <div className="mx-auto w-full max-w-content px-6 md:px-12 lg:px-20">
        <MicroLabel className="mb-12 block lg:mb-20">
          {t('founders.micro-label')}
        </MicroLabel>

        <RevealText
          lines={t('founders.headline', { returnObjects: true })}
          as="h2"
          className="font-archivo text-headline text-white"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={inView}
          transition={{ duration: 0.5, delay: 1.2, ease: 'easeOut' }}
          className="mt-8 max-w-[55ch] font-grotesk text-lg text-sand"
        >
          {t('founders.subtitle')}
        </motion.p>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {people.map((person, i) => (
            <FounderCard key={person.name} person={person} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Founders
