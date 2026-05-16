import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import LangToggle from './LangToggle'

const SECTIONS = ['club', 'academy', 'impact', 'founders', 'contact']

function Nav({ lenis }) {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = SECTIONS.map((id) => ({ id, label: t(`nav.${id}`) }))

  const openMenu = () => {
    setMenuOpen(true)
    lenis?.stop()
  }

  const closeMenu = () => {
    setMenuOpen(false)
    lenis?.start()
  }

  const goTo = (e, target) => {
    e.preventDefault()
    closeMenu()
    if (lenis) {
      lenis.scrollTo(target, { offset: -72, immediate: reduce })
    } else if (typeof target === 'string') {
      document.querySelector(target)?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeMenu()
    }
    const onResize = () => {
      if (window.innerWidth >= 768) closeMenu()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuOpen])

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-content items-center justify-between px-6 py-5 md:px-12 lg:px-20">
          <a
            href="#top"
            onClick={(e) => goTo(e, 0)}
            className="font-archivo text-lg leading-none tracking-headline text-cream"
          >
            OASIS
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => goTo(e, `#${l.id}`)}
                  className="font-grotesk text-xs font-medium uppercase tracking-micro text-cream/70 transition-colors duration-200 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <LangToggle />
            <button
              type="button"
              onClick={openMenu}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="text-cream md:hidden"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-[60] flex flex-col bg-black md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-archivo text-lg leading-none tracking-headline text-cream">
                OASIS
              </span>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="text-cream"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <ul className="flex flex-1 flex-col justify-center gap-6 px-6">
              {links.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: reduce ? 0 : 0.1 + i * 0.06,
                    ease: 'easeOut',
                  }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => goTo(e, `#${l.id}`)}
                    className="font-archivo text-2xl uppercase tracking-headline text-cream transition-colors duration-200 hover:text-sun sm:text-4xl"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Nav
