import { useTranslation } from 'react-i18next'
import { useLenis } from './hooks/useLenis'
import Nav from './components/layout/Nav'
import MicroLabel from './components/ui/MicroLabel'

function App() {
  useLenis()
  const { t } = useTranslation()

  return (
    <>
      <Nav />
      <main
        id="top"
        className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center"
      >
        <h1 className="font-archivo text-mega leading-none tracking-headline text-white">
          OASIS
        </h1>
        <p className="mt-6 font-grotesk text-lg text-sand">
          {t('hero.subtitle')}
        </p>
      </main>
      <section className="flex min-h-screen items-center justify-center bg-anthracite px-6">
        <MicroLabel>Phase 1 — Design system &amp; i18n foundation</MicroLabel>
      </section>
    </>
  )
}

export default App
