import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import MicroLabel from '../ui/MicroLabel'

const TRIGGER = '0px 0px -30% 0px'
const EASE_OUT = [0.22, 1, 0.36, 1]

function Manifesto() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()

  const accent = t('manifesto.headline-line-1-accent')
  const rest = t('manifesto.headline-line-1-rest')
  const line2 = t('manifesto.headline-line-2')

  const line = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 80 },
    whileInView: reduce ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: TRIGGER },
    transition: { duration: 1.2, delay, ease: EASE_OUT },
  })

  return (
    <section
      id="manifesto"
      className="flex min-h-[50vh] flex-col bg-black py-[clamp(48px,8vw,96px)] lg:min-h-[60vh]"
    >
      <div className="mx-auto flex w-full max-w-content flex-1 flex-col px-6 md:px-12 lg:px-20">
        <MicroLabel className="mb-12 block lg:mb-16">
          {t('manifesto.micro-label')}
        </MicroLabel>

        <p className="flex flex-1 flex-col justify-center font-archivo text-[clamp(40px,5.5vw,80px)] leading-none tracking-headline">
          <motion.span {...line(0)} className="block text-white">
            {reduce ? (
              <span className="text-sun">{accent}</span>
            ) : (
              <motion.span
                initial={{ color: '#FFFFFF' }}
                whileInView={{ color: '#F2C94C' }}
                viewport={{ once: true, margin: TRIGGER }}
                transition={{ delay: 1.3, duration: 0.4, ease: 'easeOut' }}
              >
                {accent}
              </motion.span>
            )}
            {rest}
          </motion.span>

          <motion.span {...line(reduce ? 0 : 0.2)} className="block text-cream">
            {line2}
          </motion.span>
        </p>
      </div>
    </section>
  )
}

export default Manifesto
