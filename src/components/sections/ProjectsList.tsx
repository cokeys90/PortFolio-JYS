import { sortedProjects, type Project } from '../../data/projects'
import { Tag } from '../primitives/Tag'
import { getTechCategory } from '../../data/tech'
import { SectionTitle } from '../primitives/SectionTitle'
import { FeaturedProjects } from './FeaturedProjects'
import { ExternalLinkIcon } from '../primitives/ExternalLinkIcon'

function formatPeriod(start: string, end: string | null): string {
  const fmt = (s: string) => s.replace('-', '.')
  return `${fmt(start)} — ${end ? fmt(end) : 'Present'}`
}

function ProjectCard({ project }: { project: Project }) {
  const primaryLink = project.links?.[0]

  return (
    <li className="mb-12 group/card relative transition-all motion-reduce:transition-none lg:group-hover/list:opacity-50 lg:hover:!opacity-100">
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-card transition motion-reduce:transition-none lg:block lg:opacity-0 lg:group-hover/card:bg-text-primary/[0.03] lg:group-hover/card:opacity-100 lg:group-hover/card:shadow-[inset_0_1px_0_0_rgb(148_163_184_/_0.1)]" />

      <div className="relative z-10 grid grid-cols-1 gap-2 sm:grid-cols-[120px_1fr] sm:gap-4">
        <div className="space-y-1 pt-1">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-text-muted">
            {formatPeriod(project.startedAt, project.endedAt)}
          </div>
          {project.duration && <div className="text-xs text-text-muted">{project.duration}</div>}
        </div>
        <div>
          <h3 className="font-medium leading-snug text-text-primary group-hover/card:text-accent motion-reduce:transition-none transition-colors">
            {primaryLink ? (
              <a
                href={primaryLink.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-baseline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                <span>{project.name}</span>
                <ExternalLinkIcon />
              </a>
            ) : (
              <span className="inline-flex items-baseline">{project.name}</span>
            )}
          </h3>

          <p className="mt-1 text-xs font-mono text-text-muted">
            {project.role} · {project.teamSize}
            {project.contribution && ` · ${project.contribution}`}
            {project.externalCompany && ` · ${project.externalCompany} 연계`}
          </p>

          <p className="mt-2 text-sm leading-normal text-text-secondary">{project.description}</p>

          {project.achievements.length > 0 && (
            <ul className="mt-2 space-y-1 text-sm text-text-secondary">
              {project.achievements.map((a) => (
                <li
                  key={a}
                  className="pl-4 -indent-3 before:mr-1 before:text-accent before:content-['·']"
                >
                  {a}
                </li>
              ))}
            </ul>
          )}

          {project.links && project.links.length > 1 && (
            <ul
              className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-secondary"
              aria-label="Links"
            >
              {project.links.slice(1).map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    ↗ {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}

          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tech stack">
            {project.tech.map((t) => (
              <Tag key={t} category={getTechCategory(t)}>
                {t}
              </Tag>
            ))}
          </ul>
        </div>
      </div>
    </li>
  )
}

export function ProjectsList() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
    >
      <SectionTitle id="projects-heading">Projects</SectionTitle>

      <FeaturedProjects />

      <p className="mb-4 font-mono text-xs uppercase tracking-wider text-text-muted">
        전체 프로젝트
      </p>
      <ol className="group/list" aria-label="All projects, newest first">
        {sortedProjects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </ol>
    </section>
  )
}
