import { site } from '../../util/content.js'
import Reveal from '../Reveal'

export default function Experience({ id }) {
  const e = site.experience
  if (!e.items?.length) return null

  return (
    <Reveal as="section" id={id} className="scroll-mt-24">
      <h2 className="mb-10 text-2xl font-semibold tracking-tight">{e.heading}</h2>
      <ol>
        {e.items.map((item, i) => (
          <li key={`${item.company}-${i}`} className="grid gap-1 md:grid-cols-[10rem_1fr] md:gap-8">
            <p className="pb-2 text-sm text-muted md:pt-0.5">{item.period}</p>
            <div className={`relative border-l border-line pb-12 pl-6 ${i === e.items.length - 1 ? 'pb-0' : ''}`}>
              <span className="absolute left-[-4.5px] top-2 size-2 rounded-full bg-accent ring-4 ring-paper" />
              <h3 className="text-lg font-medium leading-snug tracking-tight">
                {item.role}
                {item.company && (
                  <span className="font-normal text-muted">
                    {' '}at{' '}
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 hover:text-ink hover:decoration-accent">
                        {item.company}
                      </a>
                    ) : (
                      item.company
                    )}
                  </span>
                )}
              </h3>
              {item.description && item.description.length > 0 && (
                <div className="mt-2 max-w-xl space-y-2">
                  {item.description.map((para, i) => (
                    <p key={i} className="leading-relaxed text-muted">{para}</p>
                  ))}
                </div>
              )}
              {item.tags?.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {item.tags.map((t) => (
                    <li key={t} className="bg-surface px-2 py-0.5 text-xs text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Reveal>
  )
}
