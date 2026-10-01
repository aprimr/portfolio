// Theme system. Colours come from site.json -> "theme" and become CSS variables.
// themeCss() is also used by scripts/prerender.js so there is no flash on first paint.

export const THEME_DEFAULTS = {
  defaultMode: 'system', // "system" | "light" | "dark"
  accent: { light: '#007a99', dark: '#38c6ea' },
  light: { background: '#ffffff', foreground: '#0a0a0a', muted: '#62626b', border: '#e6e6ea', surface: '#f5f5f6' },
  dark: { background: '#0a0a0a', foreground: '#f4f4f5', muted: '#a1a1aa', border: '#27272a', surface: '#141415' },
}

export function resolveTheme(site) {
  const t = site.theme || {}
  const D = THEME_DEFAULTS
  return {
    ...D,
    ...t,
    accent: { ...D.accent, ...t.accent },
    light: { ...D.light, ...t.light },
    dark: { ...D.dark, ...t.dark },
  }
}

const clean = (v) => String(v).replace(/[;{}<>]/g, '')

export function themeCss(site) {
  const t = resolveTheme(site)
  const vars = (p, accent) =>
    `--c-paper:${clean(p.background)};--c-ink:${clean(p.foreground)};--c-muted:${clean(p.muted)};` +
    `--c-line:${clean(p.border)};--c-surface:${clean(p.surface)};--c-accent:${clean(accent)};`
  return `:root{${vars(t.light, t.accent.light)}}.dark{${vars(t.dark, t.accent.dark)}}`
}

// ---------- browser-only helpers (only called from components) ----------

export function applyTheme(site) {
  let el = document.getElementById('site-theme')
  if (!el) {
    el = document.createElement('style')
    el.id = 'site-theme'
    document.head.appendChild(el)
  }
  el.textContent = themeCss(site)
  document.documentElement.dataset.defaultTheme = resolveTheme(site).defaultMode
  syncThemeColor()
}

export const isDark = () => document.documentElement.classList.contains('dark')

export function syncThemeColor() {
  const bg = getComputedStyle(document.documentElement).getPropertyValue('--c-paper').trim()
  if (bg) document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bg)
}

export function setTheme(mode) {
  document.documentElement.classList.toggle('dark', mode === 'dark')
  try {
    localStorage.setItem('theme', mode)
  } catch {
    /* storage blocked */
  }
  syncThemeColor()
  window.dispatchEvent(new Event('themechange'))
}

export const toggleTheme = () => setTheme(isDark() ? 'light' : 'dark')
