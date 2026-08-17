import { useParams, Link } from 'react-router-dom'
import { marked } from 'marked'
import { parseBlog } from '../util/parseBlogs.js'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowLeft02Icon } from '@hugeicons/core-free-icons'

const blogModules = import.meta.glob(
  '../content/blogs/*.md',
  {
    query: '?raw',
    import: 'default',
    eager: true,
  }
)

const allBlogs = Object.values(blogModules)
  .map((source) => parseBlog(source))
  .filter((blog) => blog.enabled)

export default function BlogDetail() {
  const { id } = useParams()

  const blog = allBlogs.find(
    (blog) => blog.id === id
  )

  if (!blog) {
    return (
      <div>
        <p className="text-lg">
          This page doesn’t exist or may have been moved to a new location.
        </p>

        <Link
          to="/blogs"
          className="mt-4 inline-block text-neutral-600 underline transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          Back to blogs
        </Link>
      </div>
    )
  }

  const html = marked.parse(blog.content || '')

  return (
    <article className="space-y-12">
      {/* Back */}
      <div>
        <Link
          to="/blogs"
          className="group inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
        >
          <HugeiconsIcon
            icon={ArrowLeft02Icon}
            size={16}
            strokeWidth={1.5}
            className="transition-transform group-hover:-translate-x-0.5"
          />

          Back
        </Link>
      </div>

      {/* Header */}
      <header>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {blog.title}
        </h1>

        {blog.description && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            {blog.description}
          </p>
        )}

        {/* Date + Tags */}
        <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-neutral-500">
          {blog.createdAt && (
            <time dateTime={blog.createdAt}>
              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}

          {blog.tags?.length > 0 && (
            <>
              <span className="text-neutral-300 dark:text-neutral-700">
                /
              </span>

              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-neutral-900 px-1.5 py-0.5 text-xs text-white dark:bg-white dark:font-semibold dark:text-neutral-900"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      {/* Content */}
      {blog.content && (
        <div className="border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <div
            className="
              markdown
              max-w-3xl
              text-neutral-800
              dark:text-neutral-200

              [&_h1]:mb-6
              [&_h1]:text-3xl
              [&_h1]:font-semibold
              [&_h1]:tracking-tight

              [&_h2]:mb-4
              [&_h2]:mt-12
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
              [&_a]:transition-colors
              [&_a]:hover:text-neutral-500

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
              [&_table]:text-sm

              [&_th]:border
              [&_th]:border-neutral-200
              [&_th]:px-4
              [&_th]:py-2
              [&_th]:text-left
              [&_th]:font-medium
              dark:[&_th]:border-neutral-800

              [&_td]:border
              [&_td]:border-neutral-200
              [&_td]:px-4
              [&_td]:py-2
              dark:[&_td]:border-neutral-800

              [&_img]:my-6
              [&_img]:h-auto
              [&_img]:max-w-full
            "
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
        </div>
      )}
    </article>
  )
}