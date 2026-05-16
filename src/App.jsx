import { useLenis } from './hooks/useLenis'
import Nav from './components/layout/Nav'
import Hero from './components/sections/Hero'

function App() {
  useLenis()

  return (
    <>
      <Nav />
      <Hero />
      <section className="flex min-h-screen items-center justify-center bg-black px-6">
        <p className="font-grotesk text-sm uppercase tracking-micro text-sand">
          Sections 2–8 — Phase 3
        </p>
      </section>
    </>
  )
}

export default App
