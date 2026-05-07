import { experience, type Company } from '../../data/experience'
import { Tag } from '../primitives/Tag'
import { getTechCategory } from '../../data/tech'
import { SectionTitle } from '../primitives/SectionTitle'

function formatPeriod(start: string, end: string | null): string {
  const fmt = (s: string) => s.replace('-', '.')
  return `${fmt(start)} — ${end ? fmt(end) : 'Present'}`
}

function ArrowIcon() {
  return (
    <span
      aria-hidden="true"
      className="ml-1 inline-block translate-y-px transition-transform group-hover/card:-translate-y-1 group-hover/card:translate-x-1 motion-reduce:transition-none"
    >
      →
    </span>
  )
}

function ExperienceCard({ company }: { company: Company }) {
  return (
    <li className="mb-12 group/card relative transition-all motion-reduce:transition-none lg:group-hover/list:opacity-50 lg:hover:!opacity-100">
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-card transition motion-reduce:transition-none lg:block lg:opacity-0 lg:group-hover/card:bg-text-primary/[0.03] lg:group-hover/card:opacity-100 lg:group-hover/card:shadow-[inset_0_1px_0_0_rgb(148_163_184_/_0.1)]" />

      <div className="relative z-10 grid grid-cols-1 gap-2 sm:grid-cols-[120px_1fr] sm:gap-4">
        <div className="space-y-1 pt-1">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-text-muted">
            {formatPeriod(company.startedAt, company.endedAt)}
          </div>
          <div className="text-xs text-text-muted">{company.duration}</div>
        </div>
        <div>
          <h3 className="font-medium leading-snug text-text-primary group-hover/card:text-accent motion-reduce:transition-none transition-colors">
            {company.role} · {company.fullName}
            <ArrowIcon />
          </h3>
          <p className="mt-2 text-sm leading-normal text-text-secondary">{company.summary}</p>
          {company.note && <p className="mt-1 text-xs italic text-text-muted">{company.note}</p>}
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tech stack">
            {company.tech.map((t) => (
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

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
    >
      <SectionTitle id="experience-heading">Experience</SectionTitle>

      <ol className="group/list" aria-label="Career history">
        {experience.map((c) => (
          <ExperienceCard key={c.id} company={c} />
        ))}
      </ol>
    </section>
  )
}
