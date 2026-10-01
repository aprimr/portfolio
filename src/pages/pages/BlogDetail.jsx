import { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowLeft02Icon } from '@hugeicons/core-free-icons'
import { site, blogs } from '../util/content.js'
import { renderMarkdown, getHeadings } from '../util/markdown.js'
import { blogPage, notFoundPage } from '../util/seo.js'
import Seo from '../components/Seo'
import Markdown from '../components/Markdown'
import AuthorBox from '../components/AuthorBox'
import ReadingProgress from '../components/ReadingProgress'

export default function BlogDetail() {
  const { id } = useParams()
  const [activeId, setActiveId] = useState('')
  const [isHovered, setIsHovered] = useState(false)

  const blog = blogs.find((b) => b.id === id)

  // Blog "#" headings render as <h2> (the post title is the only <h1>)
  const html = useMemo(() => (blog ? renderMarkdown(blog.content, { shift: 1 }) : ''), [blog])
  const headings = useMemo(() => (blog ? getHeadings(blog.content) : []), [blog])

  const related = useMemo(() => {
    if (!blog) return []
    return blogs
      .filter((b) => b.id !== blog.id)
      .map((b) => ({ b, score: b.tags.filter((t) => blog.tags.includes(t)).length }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((x) => x.b)
  }, [blog])

  // Active heading = last heading whose top crossed the offset (works in both scroll directions)
  useEffect(() => {
    if (headings.length === 0) return

    const OFFSET = 100
    let rafId = null

    const compute = () => {
      let current = headings[0].id
      for (const h of headings) {
        const el = document.getElementById(h.id)
        if (!el) continue
        if (el.getBoundingClientRect().top - OFFSET <= 0) current = h.id
        else break
      }
      setActiveId(current)
    }

    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        compute()
        rafId = null
      })
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [headings])

  if (!blog) {
    return (
      <div>
        <Seo page={notFoundPage(site)} />
        <p className="text-lg">This page doesn’t exist or may have been moved to a new location.</p>
        <Link to="/blogs" className="mt-4 inline-block text-muted underline underline-offset-4 transition-colors hover:text-ink">
          Back to blogs
        </Link>
      </div>
    )
  }

  return (
    <div className="relative flex justify-center">
      <Seo page={blogPage(site, blog)} />
      <ReadingProgress />

      <article className="w-full max-w-3xl space-y-12">
        <Link to="/blogs" className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
          <HugeiconsIcon icon={ArrowLeft02Icon} size={16} strokeWidth={1.5} className="transition-transform group-hover:-translate-x-0.5" />
          Back
        </Link>

        <header>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">{blog.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{blog.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted">
            <span>
              By <Link to="/" className="underline underline-offset-2 hover:text-ink">{site.brand}</Link>
            </span>
            <span aria-hidden="true">/</span>
            <time dateTime={blog.createdAt}>
              {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <span aria-hidden="true">/</span>
            <span>{blog.readingTime} min read</span>
            {blog.tags.map((tag) => (
              <span key={tag} className="rounded-md bg-surface px-2 py-0.5">{tag}</span>
            ))}
          </div>
        </header>

        <Markdown html={html} />

        <AuthorBox />

        {related.length > 0 && (
          <section>
            <h2 className="mb-4 text-lg font-semibold tracking-tight">Keep reading</h2>
            <ul className="space-y-3">
              {related.map((r) => (
                <li key={r.id}>
                  <Link to={r.path} className="text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-accent">
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      {/* Table of contents */}
      {headings.length > 0 && (
        <div
          className="fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 items-center xl:flex"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={`absolute right-0 w-64 rounded-lg border border-line bg-paper p-4 shadow-lg transition-all duration-200 ${
              isHovered ? 'pointer-events-auto z-10 translate-x-0 opacity-100' : 'pointer-events-none z-0 translate-x-2 opacity-0'
            }`}
          >
            <nav aria-label="Table of contents" className="scrollbar-none max-h-[80vh] space-y-1 overflow-y-auto pr-1">
              {headings.map((h) => (
                <a
                  key={h.id}
                  href={`#${h.id}`}
                  title={h.text}
                  className={`block truncate py-1 text-xs transition-colors ${h.level === 2 ? 'pl-3' : 'font-medium'} ${
                    activeId === h.id ? 'font-medium text-ink' : 'font-light text-muted hover:text-ink'
                  }`}
                >
                  {h.text}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex cursor-pointer flex-col gap-1.5 px-2 py-4">
            {headings.map((h) => (
              <a
                key={h.id}
                href={`#${h.id}`}
                title={h.text}
                aria-label={h.text}
                className={`block h-0.5 rounded-full transition-all duration-200 ${h.level === 2 ? 'ml-auto w-4' : 'w-6'} ${
                  activeId === h.id ? 'bg-accent' : 'bg-line hover:bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
