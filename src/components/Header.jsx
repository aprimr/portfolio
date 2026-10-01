import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons'
import { site } from '../util/content.js'
import ThemeToggle from './ThemeToggle'
import { SearchIcon } from './icons.jsx'

export default function Header() {
  const h = site.header
  const [scrolled, setScrolled] = useState(false)
  const [kbd, setKbd] = useState('Ctrl K')

  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform)) setKbd('⌘ K')
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLink =
    'font-medium transition-colors hover:text-neutral-600 dark:hover:text-neutral-400'

  return (
    <header
      className={`z-40 w-full transition-colors duration-200 font-heading ${
        h.sticky ? 'sticky top-0' : ''
      } ${scrolled ? 'bg-paper/60 backdrop-blur-md' : 'bg-transparent'}`}
    >
      <div className="mx-auto flex w-full max-w-content items-center justify-between px-6 md:px-8 py-6">
        <Link
          to="/"
          className="text-xl font-semibold tracking-tight transition-colors hover:text-neutral-600 dark:hover:text-neutral-400"
        >
          {site.brand}
        </Link>

        <nav className="flex items-center gap-6 text-sm" aria-label="Main">
          {h.nav.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-0.5 ${navLink}`}
              >
                {item.label}
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  size={18}
                  strokeWidth={1.5}
                  className="transition-transform group-hover:rotate-[8deg]"
                />
              </a>
            ) : (
              <NavLink
                key={item.label}
                to={item.url}
                end={item.url === '/'}
                className={navLink}
              >
                {item.label}
              </NavLink>
            )
          )}

          <div className="flex items-center gap-2">
            {site.commandPalette.enabled && h.showSearchButton && (
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event('open-palette'))}
                aria-label="Search"
                className="flex h-9 cursor-pointer items-center gap-2 rounded-md border border-line px-2.5 text-muted transition-colors hover:border-ink/30 hover:text-ink"
              >
                <SearchIcon width={15} height={15} />
                <kbd className="hidden font-sans text-[11px] sm:inline">{kbd}</kbd>
              </button>
            )}
            {h.showThemeToggle && <ThemeToggle />}
          </div>
        </nav>
      </div>
    </header>
  )
}