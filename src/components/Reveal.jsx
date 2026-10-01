import { useEffect, useRef, useState } from 'react'
import { site } from '../util/content.js'

// Fades an element in when it scrolls into view (site.json -> effects.scrollReveal)
export default function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const enabled = site.effects?.scrollReveal
  const ref = useRef(null)
  const [visible, setVisible] = useState(!enabled)

  useEffect(() => {
    if (visible) return
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [visible])

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`${enabled ? 'reveal' : ''} ${visible ? 'is-visible' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
