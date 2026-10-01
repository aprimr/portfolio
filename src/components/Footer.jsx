import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowUp01Icon, ArrowUp02Icon, ArrowUpRight01Icon } from '@hugeicons/core-free-icons'
import { site } from '../util/content.js'

export default function Footer() {
  const { name,showBackToTop, links } = site.footer

  const activeLinks = Object.entries(links || {}).filter(
    ([, link]) => link.enabled && link.url
  )

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative mx-auto mt-16 flex w-full max-w-content flex-col items-start justify-between gap-5 border-t border-neutral-200 px-6 py-8.5 text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400 sm:flex-row sm:items-center md:px-8">
      <span className="text-lg text-neutral-900 dark:text-neutral-100">{name}</span>

      <nav className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Social links">
        {activeLinks.map(([key, link]) => (
          <a
            key={key}
            href={link.url}
            target={key !== 'email' ? '_blank' : undefined}
            rel={key !== 'email' ? 'noopener noreferrer' : undefined}
            className="group flex items-center gap-0.5 capitalize transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            {link.label || key}
            <HugeiconsIcon
              icon={ArrowUpRight01Icon}
              size={14}
              strokeWidth={1.5}
              className="transition-transform group-hover:rotate-[8deg]"
            />
          </a>
        ))}
      </nav>

      {/* Scroll to Top Button */}
      {showBackToTop &&
      <button
        onClick={handleScrollTop}
        aria-label="Scroll to top"
        className="absolute bottom-30 md:bottom-20 right-6 group flex items-center gap-1 border-2 border-neutral-200 bg-neutral-50 px-2 py-1 text-sm font-medium capitalize transition-colors hover:border-neutral-400 hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-500 dark:hover:text-neutral-100 cursor-pointer"
      >
        Scroll To Top
        <HugeiconsIcon
          icon={ArrowUp01Icon}
          size={16}
          strokeWidth={1.5}
          className="transition-transform group-hover:-translate-y-0.5 group-hover:hidden"
        />
        <HugeiconsIcon
          icon={ArrowUp02Icon}
          size={16}
          strokeWidth={1.5}
          className="hidden group-hover:block"
        />
      </button>}
    </footer>
  )
}