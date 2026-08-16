import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";

export default function Header({ nav, brand }) {
  return (
    <header className="w-full max-w-content mx-auto px-6 md:px-8 py-6 flex items-center justify-between">
      <Link
        to="/"
        className="text-xl font-semibold hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors"
      >
        {brand}
      </Link>

      <nav className="flex items-center gap-6 text-sm">
        {nav.map((item, i) =>
          item.external ? (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-0.5 font-medium transition-colors hover:text-neutral-600 dark:hover:text-neutral-400"
            >
              {item.label}

              <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} strokeWidth={1.5} className="transition-transform group-hover:rotate-[8deg]"/>
            </a>
          ) : (
            <NavLink
              key={i}
              to={item.url}
              className="group flex items-center gap-0.5 font-medium transition-colors hover:text-neutral-600 dark:hover:text-neutral-400"
            >
              {item.label}
            </NavLink>
          )
        )}

        <ThemeToggle />
      </nav>
    </header>
  );
}