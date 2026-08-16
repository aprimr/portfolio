import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { HugeiconsIcon } from '@hugeicons/react'
import { parseBlog } from '../util/parseBlogs.js'
import { ArrowDown01Icon } from '@hugeicons/core-free-icons'

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

export default function Blogs() {
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState(null)
  const [sortOrder, setSortOrder] = useState('newest')
  const [sortOpen, setSortOpen] = useState(false)

  const allTags = useMemo(() => {
    return [...new Set(
      allBlogs.flatMap((blog) => blog.tags || [])
    )].sort()
  }, [])

  const filteredBlogs = useMemo(() => {
    const lowerSearch = search.toLowerCase().trim()

    let blogs = allBlogs.filter((blog) => {
      const matchesSearch =
        !lowerSearch ||
        blog.title.toLowerCase().includes(lowerSearch) ||
        blog.description.toLowerCase().includes(lowerSearch) ||
        blog.tags?.some((tag) =>
          tag.toLowerCase().includes(lowerSearch)
        )

      const matchesTag =
        !selectedTag ||
        blog.tags?.includes(selectedTag)

      return matchesSearch && matchesTag
    })

    return [...blogs].sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)

      return sortOrder === 'newest'
        ? dateB - dateA
        : dateA - dateB
    })
  }, [search, selectedTag, sortOrder])

  return (
    <div className="space-y-12">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Blogs
        </h1>
      </header>

      {/* Search */}
      <input
        type="text"
        placeholder="Search articles..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border-b border-neutral-300 bg-transparent py-2 transition-colors focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:focus:border-neutral-100"
      />

      {/* Filters */}
      <div className="flex items-center gap-4">
        {/* Tags */}
        <div className="min-w-0 flex-1">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {/* All */}
            <button
              type="button"
              onClick={() => setSelectedTag(null)}
              className={`shrink-0 px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                selectedTag === null
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                  : 'border border-neutral-200 text-neutral-600 hover:border-neutral-400 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600'
              }`}
            >
              All
            </button>

            {/* Tags */}
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() =>
                  setSelectedTag(
                    selectedTag === tag ? null : tag
                  )
                }
                className={`shrink-0 px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                    : 'border border-neutral-200 text-neutral-600 hover:border-neutral-400 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Sort dropdown */}
        <div className="relative shrink-0 mb-2">
          <button
            type="button"
            onClick={() => setSortOpen((open) => !open)}
            className="group flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 transition-colors"
          >
            {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
            <HugeiconsIcon icon={ArrowDown01Icon} size={16} strokeWidth={1.5} className={`transition-transform ${sortOpen ? 'rotate-180' : '' }`}/>
          </button>

          {sortOpen && (
            <div className="absolute right-0 top-full z-20 mt-3 min-w-28 overflow-hidden border border-neutral-200 bg-white p-1 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
              <button
                type="button"
                onClick={() => {
                  setSortOrder('newest')
                  setSortOpen(false)
                }}
                className={`block w-full px-3 py-2 text-left text-xs transition-colors ${
                  sortOrder === 'newest'
                    ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100'
                    : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                }`}
              >
                Newest
              </button>

              <button
                type="button"
                onClick={() => {
                  setSortOrder('oldest')
                  setSortOpen(false)
                }}
                className={`block w-full px-3 py-2 text-left text-xs transition-colors ${
                  sortOrder === 'oldest'
                    ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100'
                    : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                }`}
              >
                Oldest
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Blogs */}
      <div className="space-y-8">
        {filteredBlogs.length === 0 ? (
          <p className="text-neutral-500">
            No articles found
          </p>
        ) : (
          filteredBlogs.map((blog) => (
            <article
              key={blog.id}
              className="border-b border-neutral-200 pb-8 dark:border-neutral-800"
            >
              <Link
                to={`/blogs/${blog.id}`}
                className="group"
              >
                <h2 className="text-xl font-medium group-hover:underline">
                  {blog.title}
                </h2>

                {blog.description && (
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    {blog.description}
                  </p>
                )}

                <p className="mt-3 flex flex-wrap gap-4 text-sm text-neutral-400 dark:text-neutral-500">
                  {blog.tags.map((item)=>(
                    <span key={item}>{item}</span>
                  ))}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-neutral-500">
                  <time dateTime={blog.createdAt}>
                    {new Date(
                      blog.createdAt
                    ).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </Link>
            </article>
          ))
        )}
      </div>
    </div>
  )
}