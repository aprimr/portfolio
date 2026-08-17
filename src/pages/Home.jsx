import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons'
import { Link } from 'react-router-dom'
import { parseProjects } from "../util/parseProjects";
import siteData from '../content/site.json'
import projectsSource from '../content/projects.md?raw'
import ExternalLink from '../components/ExternalLink'
import Gopher from "../assets/gopher.png"
import Go from "../assets/go.png"

export default function Home() {
  const { openToWork, currentCompanyRole, hero, skills, contact } = siteData;
  
  const projects = parseProjects(projectsSource)
  const enabledProjects = projects
    .filter(p => p.enabled)
    .sort((a, b) => a.order - b.order);

  const headlineParts = hero.headline.split('>');

  return (
    <div className="space-y-24 md:space-y-32">
      
      {/* HERO */}
      <section className="pt-16 sm:pt-12 md:pt-20">
        {openToWork && <p className="mb-2 text-sm text-neutral-500 dark:text-neutral-400">Open To Work</p>}
        {currentCompanyRole && <p className="mb-2 text-base text-neutral-500 dark:text-neutral-400">{currentCompanyRole}</p>}
        
        {/* Headline text */}
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
          {headlineParts[0]}
          <span className="group relative inline-block align-baseline">
            <img src={Gopher} alt="Go" className="h-10 hidden md:block md:h-12 transition-opacity duration-150 group-hover:opacity-0"/>
            <img src={Go} alt="Go" className="h-10 block md:hidden md:h-12 transition-opacity duration-150 group-hover:opacity-0"/>
            <span className="absolute left-0 top-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100">{headlineParts[1]}</span>
          </span>
          {hero.headline.split('[Gopher]')[1]}
        </h1>

        {/* Secondary Headline Text */}
        <p className="mt-4 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">{hero.secondaryHeadline}</p>
        
        {/* Buttons */}
        <div className="mt-10 flex items-center gap-8 sm:gap-12">
          <a
            href={hero.resumeUrl}
            download="Aprim-Regmi-Resume.pdf"
            className="border-2 border-neutral-900 px-5 py-1.5 text-sm font-medium transition-colors bg-neutral-900 text-white hover:bg-white hover:text-neutral-900 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-900 dark:hover:text-white cursor-pointer"
          >
            Resume
          </a>
          <ExternalLink label="GitHub" url={hero.githubUrl} />
        </div>
      </section>

      {/* Skills */}
      <section className="overflow-hidden">
        <div className="flex w-max animate-scroll hover:animate-none gap-12 whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-400 cursor-pointer">
          {[...skills, ...skills].map((skill, index) => (
            <span key={`${skill}-${index}`} className="shrink-0 hover:text-neutral-900 dark:hover:text-neutral-300">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section className="pt-16 sm:pt-12">
        <h2 className="mb-8 text-xl font-semibold">Projects</h2>

        <div className="border-t border-neutral-200 dark:border-neutral-800">
          {enabledProjects.map((project, index) => (
            <article
              key={project.id}
              className="py-10 md:py-12 border-b border-neutral-200 dark:border-neutral-800"
            >
              {/* Project */}
              <div>
                <Link to={`/projects/${project.id}`} className="text-2xl font-semibold tracking-tight transition-colors hover:underline">
                  {project.title}
                </Link>

                <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {project.shortDescription}
                </p>

                <p className="mt-5 flex flex-wrap gap-4 text-sm text-neutral-400 dark:text-neutral-500">
                  {project.stack.map((item)=>(
                    <span key={item}>{item}</span>
                  ))}
                </p>

                {/* Links */}
                <div className="mt-5 flex flex-wrap items-center gap-6 text-sm">
                  {project.links.github.url && (
                    <ExternalLink
                      label="GitHub"
                      url={project.links.github.url}
                    />
                  )}

                  {project.links.demo.url && (
                    <ExternalLink
                      label="Demo"
                      url={project.links.demo.url}
                    />
                  )}

                  {project.links.download.url && (
                    <ExternalLink
                      label="Download"
                      url={project.links.download.url}
                    />
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="pt-16 sm:pt-12">
        <p className="mb-2 text-xl text-neutral-600 dark:text-neutral-400">
          Have a project in mind?
        </p>

        <h2 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
          {contact.headline}
        </h2>

        <a
          href={`mailto:${contact.email}`}
          className="group mt-4 inline-flex items-center gap-2 text-lg transition-colors hover:text-neutral-600 dark:hover:text-neutral-300 md:text-2xl"
        >
          {contact.email}
          <HugeiconsIcon icon={ArrowUpRight01Icon} size={22} strokeWidth={1.5} className="group-hover:rotate-10 transition-transform"/>
        </a>
      </section>

    </div>
  )
}