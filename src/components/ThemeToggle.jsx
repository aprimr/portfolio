import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  )

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");

    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", isDark ? "#0a0a0a" : "#ffffff");
  }, [isDark]);

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setIsDark(!isDark)}
      className={`w-3 h-3 ${isDark? 'bg-white' : 'bg-black'} rounded-full transition-colors`}
    >
    </button>
  )
}