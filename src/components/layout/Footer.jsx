import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation()

  return (
    <div className="border-t border-cream/10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mx-auto grid max-w-content gap-2 px-6 py-8 font-grotesk text-xs text-sand sm:grid-cols-3 md:px-12 lg:px-20"
      >
        <span>{t('cta.footer-left')}</span>
        <span className="sm:text-center">{t('cta.footer-center')}</span>
        <span aria-hidden="true" />
      </motion.div>
    </div>
  )
}

export default Footer
