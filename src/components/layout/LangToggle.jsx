import { useTranslation } from 'react-i18next'

function LangToggle() {
  const { i18n } = useTranslation()
  const current = i18n.resolvedLanguage

  const labelClass = (lng) =>
    current === lng
      ? 'font-bold text-cream'
      : 'font-medium text-sand transition-colors duration-200 hover:text-cream'

  return (
    <div className="flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 font-grotesk text-xs uppercase tracking-micro backdrop-blur-sm">
      <button
        type="button"
        onClick={() => i18n.changeLanguage('en')}
        aria-pressed={current === 'en'}
        className={labelClass('en')}
      >
        EN
      </button>
      <span aria-hidden="true" className="text-sand/40">
        /
      </span>
      <button
        type="button"
        onClick={() => i18n.changeLanguage('vi')}
        aria-pressed={current === 'vi'}
        className={labelClass('vi')}
      >
        VI
      </button>
    </div>
  )
}

export default LangToggle
