import { Link } from 'react-router-dom'
import { site, blogs } from '../../util/content.js'
import Reveal from '../Reveal'
import { HugeiconsIcon } from '@hugeicons/react'
import { Calendar01Icon, Time04Icon } from '@hugeicons/core-free-icons'

export default function LatestBlogs({ id }) {
  const c = site.latestBlogs
  const latest = blogs.slice(0, c.count || 3)
  if (!latest.length) return null

  return (
    <Reveal as="section" id={id} className="scroll-mt-24">
      <div className="mb-8 flex items-baseline justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">{c.heading}</h2>
      </div>

      <div className="border-t border-line mb-6">
        {latest.map((b) => (
          <article key={b.id} className="group relative grid gap-1 border-b border-line py-6 md:grid-cols-[10rem_1fr] md:gap-8">
            <div className='flex gap-1 md:gap-0 md:flex-col'>
              <time dateTime={b.createdAt} className="text-sm text-muted mb-0.5 md:pt-0.5">
                {new Date(b.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </time>
              <p className="md:hidden text-sm text-muted/40 font-semibold">/</p>
              <p className="flex items-center gap-1 text-sm text-muted mb-0.5">
                <HugeiconsIcon icon={Time04Icon} size={14} />
                {b.readingTime} min read
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium font-heading tracking-tight">
                <Link to={b.path} className="decoration-2 underline-offset-4 group-hover:underline after:absolute after:inset-0">
                  {b.title}
                </Link>
              </h3>
              <p className="mt-1.5 max-w-xl text-base leading-relaxed text-muted">{b.description}</p>
            </div>
          </article>
        ))}
      </div>

      
      <Link to="/blogs" className="w-full flex justify-center text-sm text-muted transition-colors hover:text-ink">
        {c.viewAllLabel}
      </Link>
    </Reveal>
  )
}
