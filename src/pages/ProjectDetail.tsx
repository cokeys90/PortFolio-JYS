import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { sortedProjects } from '../data/projects'
import { experience } from '../data/experience'
import { getLenis } from '../lib/scroll'
import { LinkCard } from '../components/site/LinkCard'
import { ArrowRight } from '../components/site/Pill'
import { NotFound } from './NotFound'

const companyName = (id: string) => experience.find((c) => c.id === id)?.name ?? id
const ym = (v: string) => v.replace('-', '.')

/** /projects/:slug — 프로젝트 상세 (projects.ts 단일 출처) */
export function ProjectDetail() {
  const { slug } = useParams()
  const index = sortedProjects.findIndex((p) => p.slug === slug)
  const p = sortedProjects[index]

  useEffect(() => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo({ top: 0, behavior: 'auto' })
  }, [slug])

  if (!p) return <NotFound />

  const period =
    p.endedAt && p.endedAt !== p.startedAt
      ? `${ym(p.startedAt)} – ${ym(p.endedAt)}`
      : ym(p.startedAt)
  const facts = [
    { k: '회사', v: [companyName(p.company), p.externalCompany].filter(Boolean).join(' · ') },
    { k: '기간', v: p.duration ? `${period} · ${p.duration}` : period },
    { k: '역할', v: p.role },
    { k: '기여', v: p.contribution },
    { k: '인원', v: p.teamSize },
  ].filter((f) => f.v)
  const prev = sortedProjects[index - 1]
  const next = sortedProjects[index + 1]

  return (
    <article className="pb-12">
      <Link
        to="/#work"
        className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.28em] text-muted uppercase hover:text-ink"
      >
        <ArrowRight className="size-3 rotate-180" /> Selected work
      </Link>

      <header className="mt-8">
        <h1 className="text-[clamp(2rem,5vw,3.25rem)] leading-tight font-bold tracking-[-0.03em] text-ink">
          {p.name}
        </h1>
        <p className="mt-4 text-lg text-ink-soft">{p.oneLine}</p>
      </header>

      <dl className="mt-10 divide-y divide-line border-y border-line">
        {facts.map(({ k, v }) => (
          <div key={k} className="grid grid-cols-[80px_1fr] gap-4 py-3 text-sm">
            <dt className="label-ko text-muted">{k}</dt>
            <dd className="text-ink">{v}</dd>
          </div>
        ))}
      </dl>

      <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="사용 기술">
        {p.tech.map((t) => (
          <li
            key={t}
            className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-ink-soft"
          >
            {t}
          </li>
        ))}
      </ul>

      <section className="mt-12" aria-labelledby="desc">
        <h2 id="desc" className="label-ko text-muted">
          소개
        </h2>
        <p className="mt-3 text-[17px] leading-relaxed text-ink-soft">{p.description}</p>
      </section>

      {p.achievements.length > 0 && (
        <section className="mt-10" aria-labelledby="ach">
          <h2 id="ach" className="label-ko text-muted">
            성과
          </h2>
          <ul className="mt-3 space-y-2 text-[15px] text-ink">
            {p.achievements.map((a) => (
              <li key={a} className="flex gap-2">
                <span aria-hidden className="text-muted">
                  —
                </span>
                {a}
              </li>
            ))}
          </ul>
        </section>
      )}

      {p.links && p.links.length > 0 && (
        <section className="mt-12" aria-labelledby="links">
          <h2 id="links" className="label-ko text-muted">
            관련 링크
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {p.links.map((l) => (
              <li key={l.url}>
                <LinkCard link={l} size="full" />
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav
        aria-label="다른 프로젝트"
        className="mt-16 grid gap-3 border-t border-line pt-6 sm:grid-cols-2"
      >
        {prev ? (
          <Link to={`/projects/${prev.slug}`} className="rounded-2xl p-3 hover:bg-surface">
            <span className="label-ko font-normal text-muted">← 최근 프로젝트</span>
            <span className="mt-1 block font-semibold text-ink">{prev.name}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            to={`/projects/${next.slug}`}
            className="rounded-2xl p-3 text-right hover:bg-surface"
          >
            <span className="label-ko font-normal text-muted">이전 프로젝트 →</span>
            <span className="mt-1 block font-semibold text-ink">{next.name}</span>
          </Link>
        )}
      </nav>
    </article>
  )
}
