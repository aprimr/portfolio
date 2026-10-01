// Pure helpers shared by the React app and the build-time prerender script.

const wordCount = (md = '') =>
  (md.replace(/```[\s\S]*?```/g, ' ').match(/\S+/g) || []).length

// Auto-generate a meta description from the first real paragraph of a post
export function excerpt(md = '', max = 155) {
  const text = md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/^#{1,6}\s.*$/gm, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^\s*(?:[-*>]|\d+\.)\s+/gm, '')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  if (text.length <= max) return text
  return text.slice(0, max).replace(/\s+\S*$/, '') + '…'
}

export function normalizeBlog(blog, site) {
  const content = blog.content || ''
  const firstImage = (content.match(/!\[[^\]]*\]\(([^)\s]+)/) || [])[1]
  return {
    ...blog,
    content,
    tags: blog.tags || [],
    description: blog.description?.trim() || excerpt(content),
    updatedAt: blog.updatedAt || blog.createdAt,
    path: `/blogs/${blog.id}`,
    image: blog.image || firstImage || site.seo.ogImage,
    readingTime: Math.max(1, Math.round(wordCount(content) / 200)),
  }
}

export function normalizeProject(project) {
  return {
    ...project,
    stack: project.stack || [],
    links: project.links || {},
    path: `/projects/${project.id}`,
  }
}
