import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";

export default function Footer({ footer }) {
  const { name, links } = footer;

  const activeLinks = Object.entries(links).filter(
    ([_, link]) => link.enabled && link.url
  );

  return (
    <footer className="mx-auto mt-16 flex w-full max-w-content flex-col items-start justify-between gap-5 border-t border-neutral-200 px-6 py-8 text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400 sm:flex-row sm:items-center md:px-8">
      <span className="font-medium">{name}</span>

      <nav className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Social links">
        {activeLinks.map(([key, link]) => (
          <a
            key={key}
            href={link.url}
            target={key !== "email" ? "_blank" : undefined}
            rel={key !== "email" ? "noopener noreferrer" : undefined}
            className="group capitalize flex items-center gap-0.5 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            {key}
            <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} strokeWidth={1.5} className="transition-transform group-hover:rotate-[8deg]"/>
          </a>
        ))}
      </nav>
    </footer>
  );
}