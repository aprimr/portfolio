import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CommandPalette from './CommandPalette'
import { site } from '../util/content.js'

// Scroll to top on page change, or to the #section when the URL has a hash
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {site.header.enabled && <Header />}

      <main id="main" className="flex-1 w-full max-w-content mx-auto px-6 md:px-8 py-16 md:py-24">
        <Outlet />
      </main>

      {site.footer.enabled && <Footer />}
      {site.commandPalette.enabled && <CommandPalette />}
      <ScrollManager />
    </div>
  )
}
