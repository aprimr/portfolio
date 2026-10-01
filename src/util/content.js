// Client-side content loader (uses Vite features, so not used by the build script)
import { parseBlog } from './parseBlogs.js'
import { parseProjects } from './parseProjects.js'
import { normalizeBlog, normalizeProject } from './normalize.js'
import site from '../content/site.json'
import projectsSource from '../content/projects.md?raw'

const blogModules = import.meta.glob('../content/blogs/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export { site }

export const blogs = Object.values(blogModules)
  .map((source) => parseBlog(source))
  .filter((blog) => blog.enabled)
  .map((blog) => normalizeBlog(blog, site))
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

export const projects = parseProjects(projectsSource)
  .filter((p) => p.enabled)
  .map(normalizeProject)
  .sort((a, b) => a.order - b.order)
