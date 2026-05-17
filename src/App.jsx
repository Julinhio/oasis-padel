import { useLenis } from './hooks/useLenis'
import Nav from './components/layout/Nav'
import Hero from './components/sections/Hero'
import Manifesto from './components/sections/Manifesto'
import Movement from './components/sections/Movement'
import Club from './components/sections/Club'
import Academy from './components/sections/Academy'
import Impact from './components/sections/Impact'
import Founders from './components/sections/Founders'
import CTA from './components/sections/CTA'

function App() {
  const lenis = useLenis()

  return (
    <>
      <Nav lenis={lenis} />
      <Hero />
      <Manifesto />
      <Movement />
      <Club />
      <Academy />
      <Impact />
      <Founders />
      <CTA />
    </>
  )
}

export default App
