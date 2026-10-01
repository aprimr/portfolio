import { Link } from 'react-router-dom'
import { site, projects } from '../../util/content.js'
import ExternalLink from '../ExternalLink'
import Reveal from '../Reveal'

export default function Projects({ id }) {
  if (!projects.length) return null

  return (
    <Reveal as="section" id={id} className="scroll-mt-24">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight">{site.projects.heading}</h2>

      <div className="border-t border-line">
        {projects.map((p) => (
          <article key={p.id} className="relative flex flex-col items-start justify-between gap-6 border-b border-line py-8 md:py-10">
            <div className="min-w-0 group">
              <h3 className="text-xl font-medium font-heading tracking-tight md:text-2xl">
                <Link to={p.path} className="decoration-2 underline-offset-4 group-hover:underline after:absolute after:inset-0">
                  {p.title}
                </Link>
              </h3>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">{p.shortDescription}</p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <li key={s} className="bg-surface px-2 py-0.5 text-sm text-muted">
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-5">
              {p.links.github?.url && <ExternalLink label="GitHub" url={p.links.github.url} />}
              {p.links.demo?.url && <ExternalLink label="Demo" url={p.links.demo.url} />}
              {p.links.download?.url && <ExternalLink label="Download" url={p.links.download.url} />}
            </div>
          </article>
        ))}
      </div>
    </Reveal>
  )
}
