import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons'

export default function ExternalLink({ label, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative z-10 inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-muted`}
    >
      {label}
      <HugeiconsIcon
        icon={ArrowUpRight01Icon}
        size={16}
        strokeWidth={1.5}
        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  )
}
