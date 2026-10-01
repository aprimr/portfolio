import { useEffect } from 'react'
import { site } from '../util/content.js'
import { headTags } from '../util/seo.js'

// Keeps <head> correct while navigating. The same tags are already written
// into the static HTML at build time (scripts/prerender.js) for crawlers.
export default function Seo({ page }) {
  useEffect(() => {
    document.title = page.title
    document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove())

    for (const t of headTags(page, site)) {
      const el = document.createElement(t.tag)
      Object.entries(t.attrs).forEach(([k, v]) => el.setAttribute(k, v))
      if (t.text) el.textContent = t.text
      el.setAttribute('data-seo', '')
      document.head.appendChild(el)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.path, page.title, page.description, page.noindex])

  return null
}
