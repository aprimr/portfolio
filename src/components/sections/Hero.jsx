import { site } from '../../util/content.js'
import ExternalLink from '../ExternalLink'
import Gopher from '../../assets/gopher.png'
import Go from '../../assets/go.png'

export default function Hero() {
  const { hero, openToWork, currentCompanyRole, effects } = site
  
  const [before, highlight] = hero.headline.split('>>')
  let n = 0
  const step = () => ({ '--i': n++ })

  // Helper to render text and wrap [[...]] in a selection box
  const renderHeroTitle = (text) => {
    if (!text) return null
    const parts = text.split(/(\[\[.*?\]\])/g)
    return parts.map((part, i) => {
      if (part.startsWith('[[') && part.endsWith(']]')) {
        const innerText = part.slice(2, -2)
        return (
          <span 
            key={i} 
            className="relative inline-block mx-1 mt-1 px-2 pb-0.5 align-baseline border-2 border-accent tracking-normal"
          >
            <span className="absolute -top-1 -left-1 size-1.5 md:size-2 bg-accent"></span>
            <span className="absolute -top-1 -right-1 size-1.5 md:size-2 bg-accent"></span>
            <span className="absolute -bottom-1 -left-1 size-1.5 md:size-2 bg-accent"></span>
            <span className="absolute -bottom-1 -right-1 size-1.5 md:size-2 bg-accent"></span>
            {innerText}
          </span>
        )
      }
      return <span key={i}>{part}</span>
    })
  }

  return (
    <section className={`pt-12 sm:pt-16 md:pt-20 ${effects?.heroIntro ? 'hero-in' : ''}`}>
      {openToWork && (
        <p style={step()} className="mb-2 text-sm sm:text-base text-neutral-500 dark:text-neutral-400">
          {hero.availabilityLabel || 'Open To Work'}
        </p>
      )}
      {currentCompanyRole && (
        <p style={step()} className="mb-2 text-sm sm:text-base text-neutral-500 dark:text-neutral-400">
          {currentCompanyRole}
        </p>
      )}

      <h1 
        style={step()} 
        className="text-3xl sm:text-4xl md:text-5xl font-semibold font-heading tracking-tight leading-tight cursor-pointer"
      >
        {renderHeroTitle(before)}
        {highlight && (
          <span className="group relative inline-block align-baseline">
            <img
              src={Gopher}
              alt="Go"
              aria-hidden="true"
              className="h-8 sm:h-10 md:h-12 hidden md:block align-[-0.2em] transition-opacity duration-150 group-hover:opacity-0"
            />
            <img
              src={Go}
              alt=""
              aria-hidden="true"
              className="h-9 sm:h-10 md:h-12 block md:hidden align-[-0.2em] transition-opacity duration-150 group-hover:opacity-0"
            />
            <span className="absolute left-0 top-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
              {highlight}
            </span>
          </span>
        )}
      </h1>

      <p 
        style={step()} 
        className="mt-4 text-base sm:text-lg md:text-xl leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-xl"
      >
        {hero.secondaryHeadline}
      </p>

      <div style={step()} className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8">
        <a
          href={hero.resumeUrl}
          download={hero.resumeFileName || true}
          className="border-2 border-neutral-900 px-5 py-1.5 text-sm font-medium transition-colors bg-neutral-900 text-white hover:bg-white hover:text-neutral-900 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-900 dark:hover:text-white cursor-pointer"
        >
          Resume
        </a>
        <ExternalLink label="GitHub" url={hero.githubUrl} />
      </div>
    </section>
  )
}