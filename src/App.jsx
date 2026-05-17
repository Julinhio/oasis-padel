import { useLenis } from './hooks/useLenis'
import Nav from './components/layout/Nav'
import Hero from './components/sections/Hero'
import Manifesto from './components/sections/Manifesto'
import Movement from './components/sections/Movement'
import Club from './components/sections/Club'

const PLACEHOLDERS = ['academy', 'impact', 'founders', 'contact']

function App() {
  const lenis = useLenis()

  return (
    <>
      <Nav lenis={lenis} />
      <Hero />
      <Manifesto />
      <Movement />
      <Club />
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
