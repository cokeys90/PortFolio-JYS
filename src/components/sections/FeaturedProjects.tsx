import { featuredProjects, type Project } from '../../data/projects'
import { ExternalLinkIcon } from '../primitives/ExternalLinkIcon'

function FeaturedCard({ project }: { project: Project }) {
  const link = project.links?.[0]

  return (
    <li className="group/fcard rounded-card border border-border p-5 transition-colors motion-reduce:transition-none hover:border-accent">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h4 className="font-medium leading-snug text-text-primary group-hover/fcard:text-accent">
          {link ? (
            <a
              href={link.url}
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
        </h4>
        {project.metric && (
          <span className="font-mono text-sm font-semibold text-accent">{project.metric}</span>
        )}
      </div>
      <p className="mt-2 text-sm leading-normal text-text-secondary">{project.oneLine}</p>
    </li>
  )
}

/**
 * Projects 섹션 상단 대표작 하이라이트.
 * 연대순 전체 리스트와 별개로, 임팩트 순서 4개를 성과 지표와 함께 부각.
 */
export function FeaturedProjects() {
  return (
    <div className="mb-10">
      <p className="mb-4 font-mono text-xs uppercase tracking-wider text-text-muted">
        대표 프로젝트
      </p>
      <ul className="space-y-3" aria-label="대표 프로젝트">
        {featuredProjects.map((p) => (
          <FeaturedCard key={p.id} project={p} />
        ))}
      </ul>
    </div>
  )
}
