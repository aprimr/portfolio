import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { site, blogs, projects } from '../util/content.js'
import { homeSections } from '../util/sections.js'
import { toggleTheme } from '../util/theme.js'
import { SearchIcon } from './icons.jsx'

const cfg = site.commandPalette

function buildItems(navigate, notify) {
  const go = (to) => () => navigate(to)
  const open = (url) => () => window.open(url, '_blank', 'noopener,noreferrer')
  const items = [
    { id: 'home', group: 'Pages', label: 'Home', hint: '/', run: go('/') },
    { id: 'blogs', group: 'Pages', label: site.blog.heading, hint: '/blogs', run: go('/blogs') },
  ]

  if (cfg.includeSections) {
    homeSections(site).forEach((s) =>
      items.push({ id: `sec-${s.id}`, group: 'Sections', label: s.label, hint: `Jump to ${s.label}`, run: go({ pathname: '/', hash: `#${s.id}` }) })
    )
  }
  if (cfg.includeArticles) {
    blogs.forEach((b) =>
      items.push({ id: `blog-${b.id}`, group: 'Articles', label: b.title, hint: b.tags.join(', '), run: go(b.path) })
    )
  }
  if (cfg.includeProjects) {
    projects.forEach((p) =>
      items.push({ id: `proj-${p.id}`, group: 'Projects', label: p.title, hint: p.stack.join(', '), run: go(p.path) })
    )
  }
  if (cfg.includeLinks) {
    Object.entries(site.footer.links || {})
      .filter(([, l]) => l.enabled && l.url)
      .forEach(([key, l]) =>
        items.push({ id: `link-${key}`, group: 'Links', label: l.label || key, hint: l.url.replace(/^https?:\/\//, ''), run: open(l.url) })
      )
  }
  if (cfg.includeActions) {
    items.push({ id: 'theme', group: 'Actions', label: 'Toggle light / dark theme', hint: 'Appearance', run: toggleTheme })
    if (site.contact?.email) {
      items.push({
        id: 'copy-email',
        group: 'Actions',
        label: 'Copy email address',
        hint: site.contact.email,
        run: () => navigator.clipboard?.writeText(site.contact.email).then(() => notify('Email copied')),
      })
    }
    if (site.hero?.resumeUrl) {
      items.push({
        id: 'resume',
        group: 'Actions',
        label: 'Download resume',
        hint: 'PDF',
        run: () => {
          const a = document.createElement('a')
          a.href = site.hero.resumeUrl
          a.download = site.hero.resumeFileName || ''
          a.click()
        },
      })
    }
  }
  return items
}

export default function CommandPalette() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const [toast, setToast] = useState('')
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const returnFocus = useRef(null)

  const notify = useCallback((msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 1800)
  }, [])

  const items = useMemo(() => buildItems(navigate, notify), [navigate, notify])

  const results = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return items
    return items.filter((i) => `${i.label} ${i.hint} ${i.group}`.toLowerCase().includes(q))
  }, [items, query])

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setIndex(0)
    returnFocus.current?.focus?.()
  }, [])

  const openPalette = useCallback(() => {
    returnFocus.current = document.activeElement
    setOpen(true)
  }, [])

  // Global shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        open ? close() : openPalette()
      }
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-palette', openPalette)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-palette', openPalette)
    }
  }, [open, close, openPalette])

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => setIndex(0), [query])

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [index, open])

  const run = (item) => {
    close()
    item.run()
  }

  const onInputKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter' && results[index]) {
      e.preventDefault()
      run(results[index])
    } else if (e.key === 'Escape') {
      close()
    }
  }

  let lastGroup = null

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-ink/30 px-4 pt-[12vh] backdrop-blur-sm"
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-xl overflow-hidden rounded-xl border border-line bg-paper shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <SearchIcon className="shrink-0 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder={cfg.placeholder}
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={results[index] ? `pal-${results[index].id}` : undefined}
                className="h-14 w-full bg-transparent text-[15px] outline-none placeholder:text-muted"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">Esc</kbd>
            </div>

            <ul id="palette-list" role="listbox" ref={listRef} className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && <li className="px-3 py-10 text-center text-sm text-muted">Nothing found for “{query}”</li>}
              {results.map((item, i) => {
                const showGroup = item.group !== lastGroup
                lastGroup = item.group
                return (
                  <li key={item.id} role="presentation">
                    {showGroup && <p className="px-3 pb-1 pt-3 text-xs font-medium text-muted">{item.group}</p>}
                    <div
                      id={`pal-${item.id}`}
                      role="option"
                      aria-selected={i === index}
                      onMouseMove={() => setIndex(i)}
                      onClick={() => run(item)}
                      className={`flex cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-2.5 text-sm ${
                        i === index ? 'bg-surface text-ink' : 'text-muted'
                      }`}
                    >
                      <span className={`truncate ${i === index ? 'text-ink' : ''}`}>{item.label}</span>
                      <span className="shrink-0 truncate text-xs text-muted">{item.hint}</span>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 text-xs text-muted">
              <span>↑↓ navigate</span>
              <span>↵ open</span>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div role="status" className="fixed bottom-6 left-1/2 z-[110] -translate-x-1/2 rounded-md bg-ink px-4 py-2 text-sm text-paper shadow-lg">
          {toast}
        </div>
      )}
    </>
  )
}
