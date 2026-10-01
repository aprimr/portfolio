import { Link } from 'react-router-dom'
import { site } from '../util/content.js'
import { notFoundPage } from '../util/seo.js'
import Seo from '../components/Seo'

export default function NotFound() {
  return (
    <div className="py-20">
      <Seo page={notFoundPage(site)} />
      <p className="font-mono text-sm text-muted">404 Not Found</p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight md:text-7xl">Page not found</h1>
      <p className="mt-5 max-w-md text-lg text-muted">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="mt-8 inline-block rounded-md bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90">
        Go home
      </Link>
    </div>
  )
}
