// Runs after `vite build`. For every route it writes a real HTML file with the
// correct <title>, meta tags, canonical URL, JSON-LD and readable content, so
// Google and social crawlers see everything without executing JavaScript.
// Also generates sitemap.xml, robots.txt, rss.xml and 404.html.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseBlog } from '../src/util/parseBlogs.js'
import { parseProjects } from '../src/util/parseProjects.js'
import { normalizeBlog, normalizeProject } from '../src/util/normalize.js'
import { renderMarkdown } from '../src/util/markdown.js'
import { themeCss, resolveTheme } from '../src/util/theme.js'
import { absoluteUrl, headTags, homePage, blogsPage, blogPage, projectPage, notFoundPage } from '../src/util/seo.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const read = (...p) => fs.readFileSync(path.join(root, ...p), 'utf8')

const site = JSON.parse(read('src/content/site.json'))
if (site.seo.siteUrl.includes('your-domain')) {
  console.warn('\n⚠  Set "seo.siteUrl" in src/content/site.json to your real domain (canonical URLs, sitemap, OG tags depend on it).\n')
}

const blogDir = path.join(root, 'src/content/blogs')
const blogs = fs
  .readdirSync(blogDir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => parseBlog(fs.readFileSync(path.join(blogDir, f), 'utf8')))
  .filter((b) => b.enabled)
  .map((b) => normalizeBlog(b, site))
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

const projects = parseProjects(read('src/content/projects.md'))
  .filter((p) => p.enabled)
  .map(normalizeProject)
  .sort((a, b) => a.order - b.order)

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const serialize = (t) => {
  const attrs = Object.entries({ ...t.attrs, 'data-seo': '' })
    .map(([k, v]) => (v === '' ? k : `${k}="${esc(v)}"`))
    .join(' ')
  return t.tag === 'script'
    ? `<script ${attrs}>${t.text.replace(/</g, '\\u003c')}</script>`
    : `<${t.tag} ${attrs}>`
}

function writeHtml(file, page, body) {
  const head =
    `<style id="site-theme">${themeCss(site)}</style>\n    ` + headTags(page, site).map(serialize).join('\n    ')
  let html = template.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(page.title)}</title>`)
  html = html.replace(/<html([^>]*)>/, (_, a) => `<html${a} data-default-theme="${resolveTheme(site).defaultMode}">`)
  html = html.includes('<!--app-head-->')
    ? html.replace('<!--app-head-->', () => head)
    : html.replace('</head>', () => `${head}\n  </head>`)
  html = html.includes('<!--app-html-->')
    ? html.replace('<!--app-html-->', () => body)
    : html.replace('<div id="root"></div>', () => `<div id="root">${body}</div>`)

  const out = path.join(dist, file)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, html)
}

const routeFile = (route) => (route === '/' ? 'index.html' : path.join(route, 'index.html'))
const link = (href, text) => `<li><a href="${href}">${esc(text)}</a></li>`
const topNav = `<nav><a href="/">Home</a> <a href="/blogs">Blogs</a></nav>`

// ---- crawler-readable content (React replaces it as soon as JS loads) ----
const homeBody = `${topNav}<main>
<h1>${esc(site.hero.headline.replace('>', ''))}</h1>
<p>${esc(site.hero.secondaryHeadline)}</p>
${site.about?.enabled ? `<h2>${esc(site.about.heading)}</h2>${(site.about.paragraphs || []).map((t) => `<p>${esc(t)}</p>`).join('')}` : ''}
${site.skills?.enabled ? `<h2>${esc(site.skills.heading || 'Skills')}</h2><ul>${(site.skills.items || []).map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` : ''}
<h2>Projects</h2><ul>${projects.map((p) => link(p.path, p.title)).join('')}</ul>
<h2>Latest articles</h2><ul>${blogs.map((b) => link(b.path, b.title)).join('')}</ul>
</main>`

const blogsBody = `${topNav}<main>
<h1>${esc(site.blog.heading)}</h1><p>${esc(site.blog.description)}</p>
${blogs.map((b) => `<article><h2><a href="${b.path}">${esc(b.title)}</a></h2><p>${esc(b.description)}</p></article>`).join('')}
</main>`

// ---- pages ----
writeHtml(routeFile('/'), homePage(site), homeBody)
writeHtml(routeFile('/blogs'), blogsPage(site, blogs), blogsBody)

for (const b of blogs) {
  const body = `${topNav}<main><article>
<h1>${esc(b.title)}</h1><p>${esc(b.description)}</p>
<p>By <a href="/">${esc(site.brand)}</a> - <time datetime="${esc(b.createdAt)}">${esc(b.createdAt)}</time></p>
${renderMarkdown(b.content, { shift: 1 })}
</article></main>`
  writeHtml(routeFile(b.path), blogPage(site, b), body)
}

for (const p of projects) {
  const body = `${topNav}<main><article>
<h1>${esc(p.title)}</h1><p>${esc(p.shortDescription)}</p>
${renderMarkdown(p.content)}
</article></main>`
  writeHtml(routeFile(p.path), projectPage(site, p), body)
}

writeHtml('404.html', notFoundPage(site), '')

// ---- sitemap.xml ----
const urls = [
  { loc: '/', lastmod: blogs[0]?.updatedAt },
  { loc: '/blogs', lastmod: blogs[0]?.updatedAt },
  ...blogs.map((b) => ({ loc: b.path, lastmod: b.updatedAt })),
  ...projects.map((p) => ({ loc: p.path })),
]
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url><loc>${esc(absoluteUrl(site, u.loc))}</loc>${u.lastmod ? `<lastmod>${esc(u.lastmod)}</lastmod>` : ''}</url>`)
  .join('\n')}
</urlset>
`
)

// ---- robots.txt ----
fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl(site, '/sitemap.xml')}\n`
)

// ---- rss.xml ----
fs.writeFileSync(
  path.join(dist, 'rss.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>${esc(site.brand)} - ${esc(site.blog.heading)}</title>
  <link>${esc(absoluteUrl(site, '/blogs'))}</link>
  <description>${esc(site.blog.description)}</description>
${blogs
  .map(
    (b) => `  <item>
    <title>${esc(b.title)}</title>
    <link>${esc(absoluteUrl(site, b.path))}</link>
    <guid>${esc(absoluteUrl(site, b.path))}</guid>
    <pubDate>${new Date(b.createdAt).toUTCString()}</pubDate>
    <description>${esc(b.description)}</description>
  </item>`
  )
  .join('\n')}
</channel></rss>
`
)

console.log(`✓ Prerendered ${2 + blogs.length + projects.length} pages + sitemap.xml, robots.txt, rss.xml, 404.html`)
