import { useLenis } from './hooks/useLenis'
import Nav from './components/layout/Nav'
import Hero from './components/sections/Hero'
import Manifesto from './components/sections/Manifesto'

const PLACEHOLDERS = ['movement', 'club', 'academy', 'impact', 'founders', 'contact']

function App() {
  const lenis = useLenis()

  return (
    <>
      <Nav lenis={lenis} />
      <Hero />
      <Manifesto />
      {PLACEHOLDERS.map((id, i) => (
        <section
          key={id}
          id={id}
          className={`flex min-h-screen items-center justify-center px-6 ${
            i % 2 === 0 ? 'bg-anthracite' : 'bg-black'
          }`}
        >
          <p className="font-grotesk text-sm uppercase tracking-micro text-sand">
            {id} — Phase 3
          </p>
        </section>
      ))}
    </>
  )
}

export default App
