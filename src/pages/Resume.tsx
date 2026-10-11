import { useEffect, type ReactNode } from 'react'
import { profile } from '../data/profile'
import { experience } from '../data/experience'
import { featuredProjects, sortedProjects } from '../data/projects'
import { highlights } from '../data/highlights'
import { skillCategories } from '../data/skills'
import { certifications, schools } from '../data/education'
import { getLenis } from '../lib/scroll'

/**
 * /resume — 화면 데이터(data/*)로 만드는 이력서.
 * "PDF로 저장" = 브라우저 인쇄(A4). 별도 PDF 파일을 두지 않아 사이트와 항상 같은 내용.
 * 공개 페이지이므로 이메일·GitHub 외 연락처(전화·주소)는 넣지 않는다.
 */
const SITE = 'portfolio.cokeys90.dev'
const ym = (v: string | null) => (v ? v.replace('-', '.') : '현재')
const companyName = (id: string) => experience.find((c) => c.id === id)?.name ?? id
const featuredIds = new Set(featuredProjects.map((p) => p.id))
const otherProjects = sortedProjects.filter((p) => !featuredIds.has(p.id))
const github = profile.github.replace(/^https?:\/\//, '')

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-9 print:mt-6">
      <h2 className="label-ko border-b border-ink pb-1.5 text-ink">{title}</h2>
      <div className="mt-4 print:mt-3">{children}</div>
    </section>
  )
}

export function Resume() {
  useEffect(() => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo({ top: 0, behavior: 'auto' })
    const prev = document.title
    // 인쇄 시 기본 파일명으로 쓰인다
    document.title = `정윤수_이력서_${new Date().toISOString().slice(0, 10)}`
    return () => {
      document.title = prev
    }
  }, [])

  const today = new Date().toISOString().slice(0, 10).replaceAll('-', '.')

  return (
    <div className="resume">
      {/* 화면 전용 툴바 */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <p className="font-mono text-[11px] tracking-[0.28em] text-muted uppercase">Resume</p>
        <div className="flex items-center gap-3">
          <span className="hidden text-[12px] text-muted sm:inline">
            인쇄 창에서 대상을 &lsquo;PDF로 저장&rsquo;으로 고르세요
          </span>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-button bg-ink px-5 py-2.5 text-sm font-medium text-on-ink transition-colors hover:bg-ink-soft"
          >
            PDF로 저장
          </button>
        </div>
      </div>

      <article className="rounded-card border border-line bg-surface px-6 py-8 text-[13.5px] leading-relaxed text-ink-soft sm:px-10 sm:py-10 print:rounded-none print:border-0 print:p-0 print:text-[10pt]">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-5">
          <div>
            <h1 className="text-[30px] leading-none font-bold tracking-[-0.03em] text-ink">
              {profile.fullName}
              <span className="ml-3 font-mono text-[12px] font-normal tracking-[0.2em] text-muted uppercase">
                Jeong Yunsu
              </span>
            </h1>
            <p className="mt-3 text-[15px] font-semibold text-ink">
              Mobile Developer · {profile.title}
            </p>
          </div>
          <ul className="text-right text-[12px] leading-6 text-ink-soft">
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <a href={profile.github}>{github}</a>
            </li>
            <li>
              <a href={`https://${SITE}`}>{SITE}</a>
            </li>
          </ul>
        </header>

        <p className="mt-5 text-[14px] text-ink">{profile.tagline}</p>

        <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {highlights.map((h) => (
            <li key={h.label} className="rounded-xl bg-surface-2 px-3 py-2.5 print:bg-surface-2">
              <span className="block text-[18px] font-bold tracking-tight text-ink">{h.value}</span>
              <span className="block text-[11.5px] leading-snug text-muted">
                {h.label} · {h.context}
              </span>
            </li>
          ))}
        </ul>

        <Section title="경력">
          <ol className="space-y-5">
            {experience.map((c) => (
              <li key={c.id} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className="text-[15px] font-bold text-ink">
                    {c.fullName}
                    <span className="ml-2 text-[13px] font-medium text-ink-soft">
                      {c.department} · {c.role}
                    </span>
                  </p>
                  <p className="font-mono text-[11.5px] text-muted">
                    {ym(c.startedAt)} – {ym(c.endedAt)}
                    {c.duration ? ` · ${c.duration}` : ''}
                  </p>
                </div>
                <p className="mt-1.5">{c.summary}</p>
                {c.note && <p className="mt-1 text-[12px] text-muted">— {c.note}</p>}
              </li>
            ))}
          </ol>
        </Section>

        <Section title="대표 프로젝트">
          <ol className="space-y-5">
            {featuredProjects.map((p) => (
              <li key={p.id} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className="text-[15px] font-bold text-ink">
                    {p.name}
                    <span className="ml-2 text-[13px] font-medium text-ink-soft">
                      {companyName(p.company)}
                    </span>
                  </p>
                  <p className="font-mono text-[11.5px] text-muted">
                    {ym(p.startedAt)}
                    {p.endedAt && p.endedAt !== p.startedAt ? ` – ${ym(p.endedAt)}` : ''}
                  </p>
                </div>
                <p className="mt-1 text-[12.5px] text-muted">
                  {p.role} · {p.tech.slice(0, 6).join(', ')}
                </p>
                <ul className="mt-1.5 space-y-0.5">
                  {[p.description, ...p.achievements].map((a) => (
                    <li key={a} className="flex gap-2">
                      <span aria-hidden className="text-muted">
                        ·
                      </span>
                      {a}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        <Section title={`그 밖의 프로젝트 ${otherProjects.length}`}>
          <table className="w-full text-left text-[12.5px]">
            <tbody>
              {otherProjects.map((p) => (
                <tr key={p.id} className="break-inside-avoid border-b border-line align-top">
                  <td className="w-14 py-1.5 font-mono text-[11.5px] text-muted">
                    {p.startedAt.slice(0, 4)}
                  </td>
                  <td className="py-1.5 pr-3 font-medium text-ink">{p.name}</td>
                  <td className="w-16 py-1.5 pr-3 text-ink-soft">{companyName(p.company)}</td>
                  <td className="py-1.5 text-ink-soft">{p.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section title="기술">
          <dl className="space-y-1.5">
            {skillCategories.map((s) => (
              <div key={s.name} className="grid grid-cols-[130px_1fr] gap-3">
                <dt className="font-semibold text-ink">{s.name}</dt>
                <dd>{s.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="학력 · 자격">
          <ul className="space-y-1.5">
            {schools.map((s) => (
              <li key={s.name} className="flex flex-wrap justify-between gap-x-4">
                <span>
                  <span className="font-semibold text-ink">{s.name}</span> {s.major}
                  {s.daySession ? ` · ${s.daySession}` : ''}
                </span>
                <span className="font-mono text-[11.5px] text-muted">
                  {/\d{4}/.test(s.period) ? s.period : s.status}
                </span>
              </li>
            ))}
            {certifications.map((c) => (
              <li key={c.name} className="flex flex-wrap justify-between gap-x-4">
                <span>
                  <span className="font-semibold text-ink">{c.name}</span> {c.issuer}
                </span>
                <span className="font-mono text-[11.5px] text-muted">{c.acquiredAt}</span>
              </li>
            ))}
          </ul>
        </Section>

        <p className="mt-10 border-t border-line pt-3 text-right font-mono text-[10.5px] text-muted">
          {SITE}/resume · {today} 기준
        </p>
      </article>
    </div>
  )
}
