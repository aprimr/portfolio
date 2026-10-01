import { Marked } from 'marked'

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Strip inline markdown / html so we get a clean heading text
export const stripInline = (s = '') =>
  String(s)
    .replace(/<[^>]*>/g, '')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`~]/g, '')
    .trim()

export const slugify = (s = '') =>
  stripInline(s).toLowerCase().replace(/[^\w]+/g, '-').replace(/^-+|-+$/g, '')

/**
 * Render markdown to HTML.
 * shift: push headings down (blogs use shift=1 so "#" becomes <h2>,
 * because the page title is already the one and only <h1>).
 */
export function renderMarkdown(md = '', { shift = 0 } = {}) {
  const marked = new Marked()
  marked.use({
    renderer: {
      heading(token, level, raw) {
        const isObj = typeof token === 'object' && token !== null
        const depth = Math.min((isObj ? token.depth : level) + shift, 6)
        const id = slugify(isObj ? token.text : raw)
        const inner = isObj && this.parser ? this.parser.parseInline(token.tokens) : token
        return `<h${depth} id="${id}">${inner}</h${depth}>\n`
      },
      image(token, title, text) {
        const isObj = typeof token === 'object' && token !== null
        const href = isObj ? token.href : token
        const alt = isObj ? token.text : text
        const t = isObj ? token.title : title
        return `<img src="${esc(href)}" alt="${esc(alt)}"${t ? ` title="${esc(t)}"` : ''} loading="lazy" decoding="async">`
      },
    },
  })
  return marked.parse(md)
}

// h1/h2 of the ORIGINAL markdown (used for the table of contents).
// Uses the real markdown lexer, so "# comments" inside code blocks are ignored.
export function getHeadings(md = '') {
  return new Marked()
    .lexer(md)
    .filter((t) => t.type === 'heading' && t.depth <= 2)
    .map((t) => ({ level: t.depth, text: stripInline(t.text), id: slugify(t.text) }))
}
