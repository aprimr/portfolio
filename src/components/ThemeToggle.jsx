import { useEffect, useState } from 'react'
import { isDark, toggleTheme } from '../util/theme.js'

export default function ThemeToggle() {
  const [dark, setDark] = useState(isDark)

  useEffect(() => {
    const sync = () => setDark(isDark())
    sync()
    window.addEventListener('themechange', sync)
    return () => window.removeEventListener('themechange', sync)
  }, [])

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="relative cursor-pointer place-items-center rounded-md transition-colors"
    >
      <div
        className={`size-3 rounded-full transition-colors duration-300 ${
          dark ? 'bg-white' : 'bg-black'
        }`}
      />
    </button>
  )
}