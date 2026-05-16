import LangToggle from './LangToggle'

function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-5 md:px-12 lg:px-20">
        <a
          href="#top"
          className="font-archivo text-lg leading-none tracking-headline text-cream"
        >
          OASIS
        </a>
        <LangToggle />
      </div>
    </nav>
  )
}

export default Nav
