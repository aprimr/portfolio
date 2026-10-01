import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowDown01Icon } from '@hugeicons/core-free-icons'
import { site, blogs as allBlogs } from '../util/content.js'
import { blogsPage } from '../util/seo.js'
import Seo from '../components/Seo'
import { SearchIcon } from '../components/icons.jsx'

const chip = (active) =>
  `shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
    active ? 'bg-ink text-paper' : 'border border-line text-muted hover:border-ink/30 hover:text-ink'
  }`

export default function Blogs() {
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState(null)
  const [sortOrder, setSortOrder] = useState('newest')
  const [sortOpen, setSortOpen] = useState(false)

  const allTags = useMemo(() => [...new Set(allBlogs.flatMap((b) => b.tags))].sort(), [])

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    const list = allBlogs.filter((b) => {
      const okSearch = !q || b.title.toLowerCase().includes(q) || b.description.toLowerCase().includes(q) || b.tags.some((t) => t.toLowerCase().includes(q))
      return okSearch && (!selectedTag || b.tags.includes(selectedTag))
    })
    return list.sort((a, b) => {
      const diff = new Date(b.createdAt) - new Date(a.createdAt)
      return sortOrder === 'newest' ? diff : -diff
    })
  }, [search, selectedTag, sortOrder])

  return (
    <div className="space-y-10">
      <Seo page={blogsPage(site, allBlogs)} />

      <header>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{site.blog.heading}</h1>
        {site.blog.description && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{site.blog.description}</p>}
      </header>

      <div className="space-y-5">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" width={16} height={16} />
          <input
            type="search"
            aria-label="Search articles"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-line bg-transparent py-2.5 pl-10 pr-4 text-sm transition-colors placeholder:text-muted focus:border-ink/40 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <div className="scrollbar-none flex gap-2 overflow-x-auto">
              <button type="button" onClick={() => setSelectedTag(null)} className={chip(selectedTag === null)}>All</button>
              {allTags.map((tag) => (
                <button key={tag} type="button" onClick={() => setSelectedTag(selectedTag === tag ? null : tag)} className={chip(selectedTag === tag)}>
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setSortOpen((o) => !o)}
              className="flex cursor-pointer items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
            >
              {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
              <HugeiconsIcon icon={ArrowDown01Icon} size={16} strokeWidth={1.5} className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
            </button>

            {sortOpen && (
              <div className="absolute right-0 top-full z-20 mt-2 min-w-28 overflow-hidden rounded-lg border border-line bg-paper p-1 shadow-lg">
                {['newest', 'oldest'].map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => {
                      setSortOrder(o)
                      setSortOpen(false)
                    }}
                    className={`block w-full cursor-pointer rounded-md px-3 py-2 text-left text-xs transition-colors hover:bg-surface ${sortOrder === o ? 'bg-surface text-ink' : 'text-muted'}`}
                  >
                    {o === 'newest' ? 'Newest' : 'Oldest'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        {filtered.length === 0 ? (
          <p className="py-10 text-muted">No articles found</p>
        ) : (
          filtered.map((b) => (
            <article key={b.id} className="group relative border-b border-line py-8">
              <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                <Link to={b.path} className="decoration-1 underline-offset-4 group-hover:underline after:absolute after:inset-0">
                  {b.title}
                </Link>
              </h2>
              <p className="mt-2 max-w-2xl leading-relaxed text-muted">{b.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
                <time dateTime={b.createdAt}>
                  {new Date(b.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                <span>{b.readingTime} min read</span>
                {b.tags.map((t) => (
                  <span key={t} className="rounded-md bg-surface px-2 py-0.5">{t}</span>
                ))}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  )
}
