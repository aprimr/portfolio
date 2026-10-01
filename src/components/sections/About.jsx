import { site } from '../../util/content.js'
import Reveal from '../Reveal'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons'

export default function About({ id }) {
  const a = site.about
  if (!a.enabled) return null

  const socials = Object.entries(site.footer.links || {}).filter(([, l]) => l.enabled && l.url)

  return (
    <Reveal as="section" id={id} className="scroll-mt-24">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[3fr_1fr] md:gap-16">
        
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">{a.heading}</h2>
          
          {a.paragraphs.map((p, i) => (
            <p 
              key={i} 
              className={
                i === 0
                  ? 'text-xl font-medium font-heading leading-relaxed text-ink tracking-tight'
                  : 'text-lg leading-relaxed text-muted'
              }
            >
              {p}
            </p>
          ))}
        </div>

        <nav aria-label="Social links" className="flex flex-col gap-2 md:mt-10 md:pl-10">
          <p className="mb-4 text-sm font-heading tracking-wider text-muted md:hidden">Connect with me</p>
          {socials.map(([key, l]) => (
            <a
              key={key}
              href={l.url}
              target={key === 'email' ? undefined : '_blank'}
              rel={key === 'email' ? undefined : 'noopener noreferrer'}
              className="group flex items-center justify-between border-b border-line py-3 text-lg font-medium text-ink transition-colors hover:text-muted"
            >
              <span className="capitalize">{l.label || key}</span>
              <HugeiconsIcon 
                icon={ArrowUpRight01Icon} 
                size={20} 
                strokeWidth={1.5} 
                className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-muted" 
              />
            </a>
          ))}
        </nav>

      </div>
    </Reveal>
  )
}