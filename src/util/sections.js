// Which home-page sections are shown, and in what order (from site.json).
const KEYS = ['about', 'skills', 'experience', 'projects', 'latestBlogs', 'contact']

export function homeSections(site) {
  const order = site.homeSectionOrder?.length ? site.homeSectionOrder : KEYS
  return order
    .filter((k) => KEYS.includes(k) && site[k]?.enabled)
    .map((k) => ({
      key: k,
      id: k === 'latestBlogs' ? 'articles' : k,
      label: k === 'contact' ? 'Contact' : site[k].heading || k,
    }))
}
