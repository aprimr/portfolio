import { site } from '../../util/content.js'
import Reveal from '../Reveal'

const pill =
  'shrink-0 px-4 py-1.5 text-sm text-muted transition-colors hover:text-ink cursor-pointer'

export default function Skills({ id }) {
  const s = site.skills
  const marquee = s.style === 'marquee' && site.effects?.skillsMarquee

  return (
    <Reveal as="section" id={id} className="scroll-mt-24">

      {marquee ? (
        <div className="marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <ul className="animate-marquee flex w-max gap-4">
            {[...s.items, ...s.items].map((item, i) => (
              <li key={`${item}-${i}`} className={pill} aria-hidden={i >= s.items.length || undefined}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ul className="flex flex-wrap gap-4">
          {s.items.map((item) => (
            <li key={item} className={pill}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </Reveal>
  )
}
