import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json'
import vi from './locales/vi.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      vi: { translation: vi },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'vi'],
    load: 'languageOnly',
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'oasis-lang',
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  })

const applyDocumentLang = (lng) => {
  document.documentElement.lang = lng
}

applyDocumentLang(i18n.resolvedLanguage || 'en')
i18n.on('languageChanged', applyDocumentLang)

export default i18n
