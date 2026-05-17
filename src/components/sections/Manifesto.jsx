import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import MicroLabel from '../ui/MicroLabel'
import RevealText from '../ui/RevealText'

const TRIGGER = '0px 0px -30% 0px'
const EASE_OUT = [0.22, 1, 0.36, 1]

function ManifestoBlock({ children }) {
  return (
    <div className="flex min-h-[66vh] items-center">
      <div className="mx-auto w-full max-w-content px-6 md:px-12 lg:px-20">
        <div className="w-full lg:w-4/5">{children}</div>
      </div>
    </div>
  )
}

// Closing block — line 1 reveals in sand then shifts to white,
// line 2 is white and rendered 1.15x larger.
function ManifestoClosing({ lines, reduce }) {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.3 } },
  }
  const line1 = {
    hidden: { opacity: 0, y: reduce ? 0 : 120, color: '#A09080' },
    visible: {
      opacity: 1,
      y: 0,
      color: '#FFFFFF',
      transition: {
        duration: reduce ? 0.3 : 1.5,
        ease: EASE_OUT,
        color: { delay: reduce ? 0 : 1.5, duration: 0.8, ease: 'easeOut' },
      },
    },
  }
  const line2 = {
    hidden: { opacity: 0, y: reduce ? 0 : 120 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.3 : 1.5, ease: EASE_OUT },
    },
  }

  return (
    <motion.p
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: TRIGGER }}
      className="font-archivo text-headline text-white"
    >
      <motion.span variants={line1} className="block">
        {lines[0]}
      </motion.span>
      <motion.span variants={line2} className="block text-[115%]">
        {lines[1]}
      </motion.span>
    </motion.p>
  )
}

function Manifesto() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()

  const block2 = t('manifesto.block2', { returnObjects: true })
  const block3 = t('manifesto.block3', { returnObjects: true })

  const block2Lines = block2.map((seg, i) => (
    <span key={i}>
      {seg.pre}
      <span className="text-sun">{seg.accent}</span>
      {seg.post}
    </span>
  ))

  return (
    <section id="manifesto" className="relative bg-black pt-section-y">
      <div className="pointer-events-none sticky top-24 z-20 mx-auto max-w-content px-6 md:px-12 lg:px-20">
        <MicroLabel className="block">{t('manifesto.micro-label')}</MicroLabel>
      </div>

      <ManifestoBlock>
        <RevealText
          lines={[t('manifesto.block1')]}
          as="h2"
          className="font-archivo text-headline text-cream"
          stagger={0.3}
          viewportMargin={TRIGGER}
        />
      </ManifestoBlock>

      <ManifestoBlock>
        <RevealText
          lines={block2Lines}
          as="p"
          className="font-archivo text-headline text-white"
          stagger={0.3}
          viewportMargin={TRIGGER}
        />
      </ManifestoBlock>

      <ManifestoBlock>
        <ManifestoClosing lines={block3} reduce={reduce} />
      </ManifestoBlock>
    </section>
  )
}

export default Manifesto
