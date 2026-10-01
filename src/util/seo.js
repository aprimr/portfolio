// Single source of truth for SEO. Used by:
//  - <Seo /> component (updates <head> while navigating)
//  - scripts/prerender.js (writes real <head> tags into static HTML at build time)

const base = (site) => site.seo.siteUrl.replace(/\/+$/, '')

export const absoluteUrl = (site, p = '/') =>
  /^https?:\/\//.test(p) ? p : base(site) + (p.startsWith('/') ? p : '/' + p)

const withSuffix = (site, t) => site.seo.titleTemplate.replace('%s', t)

const sameAs = (site) =>
  Object.values(site.footer?.links || {})
    .filter((l) => l.enabled && /^https?:/.test(l.url || ''))
    .map((l) => l.url)

const person = (site) => ({
  '@type': 'Person',
  '@id': absoluteUrl(site, '/') + '#person',
  name: site.brand,
  url: absoluteUrl(site, '/'),
  jobTitle: site.seo.jobTitle,
  sameAs: sameAs(site),
})

const crumbs = (site, items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: absoluteUrl(site, path),
  })),
})

export const homePage = (site) => ({
  path: '/',
  title: site.seo.title,
  description: site.seo.description,
  image: site.seo.ogImage,
  type: 'website',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: site.brand,
      url: absoluteUrl(site, '/'),
      description: site.seo.description,
      inLanguage: 'en',
    },
    { '@context': 'https://schema.org', ...person(site), knowsAbout: site.skills?.items || [] },
  ],
})

export const blogsPage = (site, blogs = []) => ({
  path: '/blogs',
  title: withSuffix(site, site.blog.seoTitle || site.blog.heading),
  description: site.blog.description,
  image: site.seo.ogImage,
  type: 'website',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: site.blog.seoTitle || site.blog.heading,
      url: absoluteUrl(site, '/blogs'),
      description: site.blog.description,
      author: { '@id': person(site)['@id'] },
      blogPost: blogs.map((b) => ({
        '@type': 'BlogPosting',
        headline: b.title,
        url: absoluteUrl(site, b.path),
        datePublished: b.createdAt,
      })),
    },
    crumbs(site, [['Home', '/'], ['Blogs', '/blogs']]),
  ],
})

export const blogPage = (site, blog) => ({
  path: blog.path,
  title: withSuffix(site, blog.title),
  description: blog.description,
  image: blog.image,
  type: 'article',
  published: blog.createdAt,
  modified: blog.updatedAt,
  tags: blog.tags,
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: blog.title,
      description: blog.description,
      image: [absoluteUrl(site, blog.image)],
      datePublished: blog.createdAt,
      dateModified: blog.updatedAt,
      keywords: blog.tags.join(', '),
      inLanguage: 'en',
      author: person(site),
      publisher: { '@id': person(site)['@id'] },
      mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(site, blog.path) },
    },
    crumbs(site, [['Home', '/'], ['Blogs', '/blogs'], [blog.title, blog.path]]),
  ],
})

export const projectPage = (site, project) => ({
  path: project.path,
  title: withSuffix(site, `${project.title} - Project`),
  description: project.shortDescription,
  image: project.image || site.seo.ogImage,
  type: 'website',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareSourceCode',
      name: project.title,
      description: project.shortDescription,
      url: absoluteUrl(site, project.path),
      codeRepository: project.links?.github?.url || undefined,
      programmingLanguage: project.stack,
      author: { '@id': person(site)['@id'] },
    },
    crumbs(site, [['Home', '/'], [project.title, project.path]]),
  ],
})

export const notFoundPage = (site) => ({
  path: '/404',
  title: withSuffix(site, 'Page not found'),
  description: 'This page could not be found.',
  image: site.seo.ogImage,
  noindex: true,
  jsonLd: [],
})

// Turn a page description into a list of <head> tag descriptors
export function headTags(page, site) {
  const s = site.seo
  const url = absoluteUrl(site, page.path)
  const image = absoluteUrl(site, page.image || s.ogImage)
  const m = (k, v, content) => ({ tag: 'meta', attrs: { [k]: v, content } })

  const tags = [
    m('name', 'description', page.description),
    { tag: 'link', attrs: { rel: 'canonical', href: url } },
    m('name', 'robots', page.noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1'),
    m('name', 'author', site.brand),
    m('property', 'og:site_name', site.brand),
    m('property', 'og:type', page.type || 'website'),
    m('property', 'og:title', page.title),
    m('property', 'og:description', page.description),
    m('property', 'og:url', url),
    m('property', 'og:image', image),
    m('property', 'og:locale', s.locale || 'en_US'),
    m('name', 'twitter:card', 'summary_large_image'),
    m('name', 'twitter:title', page.title),
    m('name', 'twitter:description', page.description),
    m('name', 'twitter:image', image),
    {
      tag: 'link',
      attrs: { rel: 'alternate', type: 'application/rss+xml', title: `${site.brand} - Blog`, href: absoluteUrl(site, '/rss.xml') },
    },
  ]
  if (s.twitterHandle) tags.push(m('name', 'twitter:site', s.twitterHandle))

  if (page.type === 'article') {
    tags.push(m('property', 'article:published_time', page.published))
    tags.push(m('property', 'article:modified_time', page.modified || page.published))
    tags.push(m('property', 'article:author', site.brand))
    ;(page.tags || []).forEach((t) => tags.push(m('property', 'article:tag', t)))
  }

  ;(page.jsonLd || []).forEach((ld) =>
    tags.push({ tag: 'script', attrs: { type: 'application/ld+json' }, text: JSON.stringify(ld) })
  )
  return tags
}
