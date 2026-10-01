import { Link } from 'react-router-dom'
import { site } from '../util/content.js'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons'

export default function AuthorBox() {
  const a = site.blog?.author
  if (!a?.enabled) return null

  const socialsConfig = site.footer.links || {}

  // SVG Icons mapping
  const icons = {
    github: (
      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.37 1.23-3.21-.12-.3-.54-1.515.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.635.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.21 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
    linkedin: (
      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
      </svg>
    ),
    x: (
      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.64-.58 1.38-.58 2.17 0 1.49.76 2.81 1.91 3.58-.71 0-1.37-.21-1.95-.53v.05c0 2.08 1.48 3.81 3.44 4.2-.36.1-.74.15-1.13.15-.28 0-.55-.03-.82-.08.55 1.71 2.14 2.95 4.02 2.99-1.47 1.15-3.32 1.84-5.34 1.84-.35 0-.69-.02-1.03-.06C3.87 19.57 6.15 20.31 8.6 20.31c8.84 0 13.67-7.33 13.67-13.67 0-.21 0-.42-.01-.62.94-.68 1.76-1.53 2.41-2.5z"/>
      </svg>
    ),
    website: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M3.6 9h16.8 M3.6 15h16.8 M11.5 3a17 17 0 000 18 M12.5 3a17 17 0 010 18" />
      </svg>
    )
  }

  // Prepare links dynamically from config + hardcoded website link
  const socialLinks = [
    { key: 'github', url: socialsConfig.github?.url, external: true },
    { key: 'linkedin', url: socialsConfig.linkedin?.url, external: true },
    { key: 'x', url: socialsConfig.x?.url, external: true },
    { key: 'website', url: '/', external: false } 
  ].filter((l) => l.url) // Filter out if URL doesn't exist

  return (
    <aside className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between border border-line bg-surface p-6 transition-all">
      <div className="flex flex-col">
        <p className="text-sm tracking-wider text-muted">{a.heading}</p>
        <p className="mt-2 text-2xl font-semibold font-heading tracking-tight text-ink">{site.brand}</p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{a.info}</p>
      </div>

      <div className="flex flex-col items-start gap-1 sm:items-end">
        {/* Social Icons */}
        <nav className="flex items-center gap-2" aria-label="Social links">
          {socialLinks.map(({ key, url, external }) => {
            const Icon = icons[key]
            return external ? (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="grid size-8 place-items-center rounded-md text-muted transition-colors hover:bg-paper hover:text-ink"
                aria-label={key}
              >
                {Icon}
              </a>
            ) : (
              <Link
                key={key}
                to={url}
                className="grid size-8 place-items-center rounded-md text-muted transition-colors hover:bg-paper hover:text-ink"
                aria-label={key}
              >
                {Icon}
              </Link>
            )
          })}
        </nav>

        {/* Email Link */}
        {a.email && (
          <a 
            href={`mailto:${a.email}`} 
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            {a.email}
            <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} strokeWidth={1.5} className="transition-transform group-hover:rotate-[8deg]" />
          </a>
        )}
      </div>
    </aside>
  )
}