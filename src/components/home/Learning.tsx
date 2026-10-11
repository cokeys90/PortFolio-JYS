import { certifications, schools } from '../../data/education'
import { DisplayHeading, SectionLabel } from '../site/SectionHeading'
import { Reveal } from '../site/Reveal'
import { ArrowRight } from '../site/Pill'

const rows = [
  ...schools.map((s) => ({
    kind: '학력',
    title: s.name,
    sub: `${s.major}${s.daySession ? ` · ${s.daySession}` : ''}`,
    date: s.period.match(/\d{4}/) ? s.period : s.status,
  })),
  ...certifications.map((c) => ({
    kind: '자격증',
    title: c.name,
    sub: c.issuer,
    date: c.acquiredAt,
  })),
]

export function Learning() {
  return (
    <section id="learning" aria-labelledby="learning-title" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <SectionLabel index="04">Education & certificates</SectionLabel>
          <div id="learning-title" className="mt-6">
            <DisplayHeading lead="Always" accent="learning." />
          </div>
          <p className="mt-6 max-w-sm text-sm text-muted">
            컴퓨터공학을 전공하고 교원자격증도 취득했습니다. 지금도 SDK·오픈소스 코드와 기술 문서를
            꾸준히 읽고 있습니다.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="border-t border-line">
            {rows.map((r) => (
              <li key={r.title} className="group border-b border-line">
                <div className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-2xl px-4 py-5 transition-colors duration-300 group-hover:bg-ink md:grid-cols-[120px_1fr_auto_auto] md:px-6">
                  <span className="label-ko hidden text-muted group-hover:text-on-ink/60 md:block">
                    {r.kind}
                  </span>
                  <span>
                    <span className="block text-lg font-semibold text-ink group-hover:text-on-ink">
                      {r.title}
                    </span>
                    <span className="block text-sm text-muted group-hover:text-on-ink/70">
                      {r.sub}
                    </span>
                  </span>
                  <span className="label-ko font-normal text-muted group-hover:text-on-ink/70">
                    {r.date}
                  </span>
                  <span
                    aria-hidden
                    className="hidden size-9 place-items-center rounded-full border border-line text-ink transition-transform group-hover:-rotate-45 group-hover:border-on-ink/40 group-hover:text-on-ink md:grid"
                  >
                    <ArrowRight />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
