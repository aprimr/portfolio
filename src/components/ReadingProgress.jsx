import { useEffect, useState } from 'react'
import { site } from '../util/content.js'

export default function ReadingProgress() {
  const [p, setP] = useState(0)

  useEffect(() => {
    const update = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      setP(max > 0 ? Math.min(1, el.scrollTop / max) : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  if (!site.effects?.readingProgress) return null
  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent"
      style={{ transform: `scaleX(${p})` }}
    />
  )
}
