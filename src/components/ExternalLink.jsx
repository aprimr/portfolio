import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";

export default function ExternalLink({ label, url }) {
  return (
    <a
      href={url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-0.5 text-sm font-medium transition-colors hover:text-neutral-600 dark:hover:text-neutral-400">
      {label}
      <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} strokeWidth={1.5} className="transition-transform group-hover:rotate-10"/>
    </a>
  );
}