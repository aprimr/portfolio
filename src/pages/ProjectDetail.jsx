import { useParams, Link } from 'react-router-dom'
import { marked } from 'marked'
import { parseProjects } from '../util/parseProjects'
import projectsSource from '../content/projects.md?raw'
import ExternalLink from '../components/ExternalLink'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowLeft02Icon} from '@hugeicons/core-free-icons'

export default function ProjectDetail() {
  const { id } = useParams()

  const projects = parseProjects(projectsSource)

  const project = projects.find(
    (p) => p.id === id && p.enabled
  )

  if (!project) {
    return (
      <div>
        <p className="text-lg">
          This page doesn’t exist or may have been moved to a new location.
        </p>

        <Link
          to="/"
          className="mt-4 inline-block text-neutral-600 underline transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          Back home
        </Link>
      </div>
    )
  }

  const { links = {} } = project

  const html = marked.parse(project.content || '')

  return (
    <article className="space-y-12">
      {/* Back */}
      <div>
        <Link to="/" className="flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100">
          <HugeiconsIcon icon={ArrowLeft02Icon} size={16} strokeWidth={1.5} className="transition-transform group-hover:rotate-[8deg]"/>
          Back
        </Link>
      </div>

      {/* Header */}
      <header>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {project.title}
        </h1>

        {project.shortDescription && (
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            {project.shortDescription}
          </p>
        )}

        {project.stack?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((stack) => (
              <span
                key={stack}
                className="bg-neutral-900 px-1.5 py-0.5 text-xs text-white dark:bg-white dark:text-neutral-900 dark:font-semibold"
              >
                {stack}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="mt-4 flex flex-wrap items-center gap-6 text-sm">
          {links.github?.url && (
            <ExternalLink
              label="GitHub"
              url={links.github.url}
            />
          )}

          {links.demo?.url && (
            <ExternalLink
              label="Demo"
              url={links.demo.url}
            />
          )}

          {links.download?.url && (
            <ExternalLink
              label="Download"
              url={links.download.url}
            />
          )}
        </div>
      </header>

      {/* Content */}
      {project.content && (
        <div className="border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <div
            className="
              markdown
              max-w-none
              text-neutral-800
              dark:text-neutral-200

              [&_h1]:mb-6
              [&_h1]:text-3xl
              [&_h1]:font-semibold
              [&_h1]:tracking-tight

              [&_h2]:mb-4
              [&_h2]:mt-10
              [&_h2]:text-2xl
              [&_h2]:font-semibold
              [&_h2]:tracking-tight

              [&_h3]:mb-3
              [&_h3]:mt-8
              [&_h3]:text-xl
              [&_h3]:font-semibold

              [&_p]:mb-5
              [&_p]:leading-7

              [&_a]:underline
              [&_a]:underline-offset-4

              [&_ul]:mb-5
              [&_ul]:list-disc
              [&_ul]:pl-6

              [&_ol]:mb-5
              [&_ol]:list-decimal
              [&_ol]:pl-6

              [&_li]:mb-1.5

              [&_blockquote]:my-6
              [&_blockquote]:border-l-2
              [&_blockquote]:border-neutral-300
              [&_blockquote]:pl-4
              [&_blockquote]:italic
              [&_blockquote]:text-neutral-500
              dark:[&_blockquote]:border-neutral-700

              [&_code]:rounded
              [&_code]:bg-neutral-100
              [&_code]:px-1.5
              [&_code]:py-0.5
              [&_code]:font-mono
              [&_code]:text-sm
              dark:[&_code]:bg-neutral-800

              [&_pre]:my-6
              [&_pre]:overflow-x-auto
              [&_pre]:rounded-lg
              [&_pre]:bg-neutral-100
              [&_pre]:p-4
              dark:[&_pre]:bg-neutral-900

              [&_pre_code]:bg-transparent
              [&_pre_code]:p-0

              [&_hr]:my-10
              [&_hr]:border-neutral-200
              dark:[&_hr]:border-neutral-800

              [&_table]:my-6
              [&_table]:w-full
              [&_table]:border-collapse

              [&_th]:border
              [&_th]:border-neutral-200
              [&_th]:px-4
              [&_th]:py-2
              [&_th]:text-left
              dark:[&_th]:border-neutral-800

              [&_td]:border
              [&_td]:border-neutral-200
              [&_td]:px-4
              [&_td]:py-2
              dark:[&_td]:border-neutral-800

              [&_img]:my-6
            "
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      )}
    </article>
  )
}