import { useLenis } from './hooks/useLenis'
import Nav from './components/layout/Nav'
import Hero from './components/sections/Hero'

const PLACEHOLDER_SECTIONS = ['club', 'academy', 'impact', 'founders', 'contact']

function App() {
  const lenis = useLenis()

  return (
    <>
      <Nav lenis={lenis} />
      <Hero />
      {PLACEHOLDER_SECTIONS.map((id, i) => (
        <section
          key={id}
          id={id}
          className={`flex min-h-screen items-center justify-center px-6 ${
            i % 2 === 0 ? 'bg-black' : 'bg-anthracite'
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
