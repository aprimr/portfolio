import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons'
import { site } from '../../util/content.js'
import Reveal from '../Reveal'

export default function Contact({ id }) {
  const c = site.contact
  return (
    <Reveal as="section" id={id} className="scroll-mt-24">
      <p className="mb-2 text-xl text-muted">{c.prompt}</p>
      <h2 className="max-w-4xl text-6xl font-semibold leading-[1.05] tracking-tight md:text-7xl">{c.headline}</h2>
      <a
        href={`mailto:${c.email}`}
        className="group mt-6 font-heading inline-flex items-center gap-2 text-xl underline decoration-line underline-offset-8 transition-colors hover:decoration-accent md:text-3xl"
      >
        {c.email}
        <HugeiconsIcon icon={ArrowUpRight01Icon} size={24} strokeWidth={1.5} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </Reveal>
  )
}
