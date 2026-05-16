import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import MicroLabel from '../ui/MicroLabel'
import RevealText from '../ui/RevealText'

function Manifesto() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const headlineLines = t('manifesto.headline', { returnObjects: true })

  return (
    <section
      id="manifesto"
      className="relative flex min-h-screen items-center bg-black py-section-y"
    >
      <div className="mx-auto w-full max-w-content px-6 md:px-12 lg:px-20">
        <div className="w-full lg:w-4/5">
          <MicroLabel className="mb-12 block lg:mb-20">
            {t('manifesto.micro-label')}
          </MicroLabel>
          <RevealText
            lines={headlineLines}
            as="h2"
            className="font-archivo text-headline text-white"
            y={40}
            stagger={0.12}
            duration={0.8}
          />
          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            whileInView={reduce ? {} : { opacity: 1 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{
              duration: 0.4,
              delay: reduce ? 0 : 1.2,
              ease: 'easeOut',
            }}
            className="mt-8 text-right font-grotesk text-base font-medium text-sand"
          >
            {t('manifesto.caption')}
          </motion.p>
        </div>
      </div>
    </section>
  )
}

export default Manifesto
