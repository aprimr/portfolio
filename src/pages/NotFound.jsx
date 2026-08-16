import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-semibold tracking-tight">404</h1>
      <p className="mt-4 text-neutral-500">This page could not be found.</p>
      <Link to="/" className="mt-8 inline-block underline underline-offset-4">
        Go home
      </Link>
    </div>
  )
}