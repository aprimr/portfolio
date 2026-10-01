import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowLeft02Icon } from '@hugeicons/core-free-icons'
import { site, projects } from '../util/content.js'
import { renderMarkdown } from '../util/markdown.js'
import { projectPage, notFoundPage } from '../util/seo.js'
import ExternalLink from '../components/ExternalLink'
import Seo from '../components/Seo'
import Markdown from '../components/Markdown'

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projects.find((p) => p.id === id)
  const html = useMemo(() => (project ? renderMarkdown(project.content) : ''), [project])

  if (!project) {
    return (
      <div>
        <Seo page={notFoundPage(site)} />
        <p className="text-lg">This page doesn’t exist or may have been moved to a new location.</p>
        <Link to="/" className="mt-4 inline-block text-muted underline underline-offset-4 transition-colors hover:text-ink">
          Back home
        </Link>
      </div>
    )
  }

  const { links } = project

  return (
    <article className="mx-auto max-w-3xl space-y-12">
      <Seo page={projectPage(site, project)} />

      <Link to="/" className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
        <HugeiconsIcon icon={ArrowLeft02Icon} size={16} strokeWidth={1.5} className="transition-transform group-hover:-translate-x-0.5" />
        Back
      </Link>

      <header>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">{project.title}</h1>
        {project.shortDescription && <p className="mt-4 text-lg leading-relaxed text-muted">{project.shortDescription}</p>}

        {project.stack.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <li key={s} className="rounded-md bg-surface px-2 py-0.5 text-xs text-muted">{s}</li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {links.github?.url && <ExternalLink variant="button" label="GitHub" url={links.github.url} />}
          {links.demo?.url && <ExternalLink variant="button" label="Demo" url={links.demo.url} />}
          {links.download?.url && <ExternalLink variant="button" label="Download" url={links.download.url} />}
        </div>
      </header>

      {project.content && <Markdown html={html} />}
    </article>
  )
}
