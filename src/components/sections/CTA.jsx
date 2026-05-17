import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import MicroLabel from '../ui/MicroLabel'
import RevealText from '../ui/RevealText'
import Footer from '../layout/Footer'

const inView = { once: true, margin: '0px 0px -15% 0px' }

function CTA() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const contacts = t('cta.contacts', { returnObjects: true })

  const accentLine = (
    <>
      {t('cta.headline-pre')}
      <span className="text-sun">{t('cta.headline-accent')}</span>
    </>
  )

  return (
    <section
      id="contact"
      className="relative flex min-h-screen flex-col bg-black"
    >
      <div className="mx-auto flex w-full max-w-content flex-1 flex-col justify-center px-6 py-section-y md:px-12 lg:px-20">
        <MicroLabel className="mb-12 block lg:mb-20">
          {t('cta.micro-label')}
        </MicroLabel>

        <RevealText
          lines={[t('cta.headline-line1'), accentLine]}
          as="h2"
          className="font-archivo text-headline text-white"
        />

        <div className="mt-16 grid grid-cols-1 gap-x-10 md:grid-cols-3">
          {contacts.map((c, i) => (
            <motion.div
              key={c.email}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0 }}
              viewport={inView}
              transition={{
                duration: 0.6,
                delay: reduce ? 0 : 1.4 + i * 0.15,
                ease: 'easeOut',
              }}
              className="border-t border-cream/15 py-10"
            >
              <span className="font-grotesk text-xs font-medium uppercase tracking-micro text-sun">
                {c.label}
              </span>
              <p className="mt-3 max-w-[30ch] font-grotesk text-base text-cream">
                {c.description}
              </p>
              <a
                href={`mailto:${c.email}`}
                className="mt-5 inline-block font-grotesk text-lg font-medium text-white underline-offset-4 transition-colors duration-200 hover:text-sun hover:underline"
              >
                {c.email}
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </section>
  )
}

export default CTA
