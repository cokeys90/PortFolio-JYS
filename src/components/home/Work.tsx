import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { featuredProjects, sortedProjects, type Project } from '../../data/projects'
import { experience } from '../../data/experience'
import { DisplayHeading, SectionLabel } from '../site/SectionHeading'
import { Reveal } from '../site/Reveal'
import { Link } from 'react-router-dom'
import { ArrowRight } from '../site/Pill'
import { LinkCard } from '../site/LinkCard'

const EASE = [0.16, 1, 0.3, 1] as const
/** 세로 탭/모바일 헤더용 짧은 이름 */
const shortName = (p: Project) => p.name.split(' — ')[0].split(' (')[0]
const companyName = (id: string) => experience.find((c) => c.id === id)?.name ?? id
const period = (p: Project) =>
  p.endedAt && p.endedAt !== p.startedAt
    ? `${p.startedAt.replace('-', '.')} – ${p.endedAt.replace('-', '.')}`
    : p.startedAt.replace('-', '.')

/** "DAU 26만 · 4일 개발" → { value: '26만', rest: 'DAU · 4일 개발' } — 숫자가 든 첫 토큰을 대표값으로 */
function splitMetric(metric?: string) {
  if (!metric) return null
  const tokens = metric.split(' ')
  const idx = tokens.findIndex((t) => /\d/.test(t))
  if (idx < 0) return { value: metric, rest: '' }
  const value = tokens[idx]
  const rest = tokens
    .filter((_, i) => i !== idx)
    .join(' ')
    .replace(/^·\s*|\s*·$/g, '')
  return { value, rest }
}

function ProjectBody({ p, index }: { p: Project; index: number }) {
  const m = splitMetric(p.metric)
  return (
    <div className="grid h-full gap-8 p-6 md:p-8 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="flex min-w-0 flex-col">
        <p className="label-ko flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
          <span className="font-mono text-[11px]">{String(index + 1).padStart(2, '0')}</span>
          <span aria-hidden>—</span>
          <span>{companyName(p.company)}</span>
          <span aria-hidden>·</span>
          <span>{period(p)}</span>
        </p>
        <h3 className="mt-4 text-[clamp(1.6rem,2.6vw,2.4rem)] leading-tight font-bold tracking-tight text-ink">
          {p.name}
        </h3>
        <p className="mt-3 text-[15px] text-ink-soft">{p.oneLine}</p>
        <ul className="mt-5 space-y-1.5 text-sm text-ink-soft">
          {p.achievements.slice(0, 3).map((a) => (
            <li key={a} className="flex gap-2">
              <span aria-hidden className="text-muted">
                •
              </span>
              {a}
            </li>
          ))}
        </ul>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="사용 기술">
          {p.tech.slice(0, 7).map((t) => (
            <li
              key={t}
              className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-ink-soft"
            >
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-6">
          {p.links && p.links.length > 0 && (
            <ul className="mb-4 grid gap-2 sm:grid-cols-2" aria-label="관련 링크">
              {p.links.slice(0, 2).map((l) => (
                <li key={l.url}>
                  <LinkCard link={l} />
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-surface-2 px-3 py-1.5 text-[12px] text-ink-soft">
              {p.role}
            </span>
            <Link
              to={`/projects/${p.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-1.5 text-[12px] font-medium text-on-ink hover:bg-ink-soft"
            >
              자세히 보기
              {p.links && p.links.length > 2 && (
                <span className="text-on-ink/60">· 링크 {p.links.length}</span>
              )}
              <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>
      </div>

      {m && (
        <div className="relative hidden flex-col justify-between overflow-hidden rounded-2xl border border-line bg-bg p-6 xl:flex">
          <p className="label-ko text-muted">성과</p>
          <p
            aria-hidden
            className="pointer-events-none absolute -right-4 -bottom-10 text-[11rem] leading-none font-black tracking-tighter text-wordmark select-none"
          >
            {String(index + 1).padStart(2, '0')}
          </p>
          <div className="relative">
            <p className="text-[clamp(2.4rem,4vw,3.6rem)] leading-none font-bold tracking-[-0.03em] text-ink tabular-nums">
              {m.value}
            </p>
            <p className="mt-2 text-lg font-medium text-ink-soft">{m.rest}</p>
          </div>
        </div>
      )}
    </div>
  )
}

/** 데스크톱: 가로 아코디언 (펼친 카드 1 + 세로 탭) */
function Accordion() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  return (
    <div className="hidden h-[560px] gap-3 lg:flex">
      {featuredProjects.map((p, i) => {
        const open = i === active
        return (
          <motion.div
            key={p.id}
            layout={!reduce}
            transition={{ duration: 0.7, ease: EASE }}
            className={`relative overflow-hidden rounded-card border border-line ${
              open ? 'flex-1 bg-surface' : 'w-[84px] shrink-0 bg-surface-2 hover:bg-surface'
            }`}
          >
            {open ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={p.id}
                  className="h-full"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: reduce ? 0 : 0.25 }}
                >
                  <ProjectBody p={p} index={i} />
                </motion.div>
              </AnimatePresence>
            ) : (
              <button
                type="button"
                onClick={() => setActive(i)}
                className="flex h-full w-full flex-col items-center justify-between py-6"
                aria-label={`${p.name} 펼치기`}
              >
                <span className="font-mono text-[11px] text-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="writing-vertical text-[15px] font-semibold tracking-tight text-ink">
                  {shortName(p)}
                </span>
                <span
                  aria-hidden
                  className="grid size-8 place-items-center rounded-full border border-line text-ink"
                >
                  +
                </span>
              </button>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

/** 모바일: 세로 아코디언 */
function Stack() {
  const [active, setActive] = useState(0)
  return (
    <ul className="space-y-3 lg:hidden">
      {featuredProjects.map((p, i) => {
        const open = i === active
        const m = splitMetric(p.metric)
        return (
          <li key={p.id} className="overflow-hidden rounded-card border border-line bg-surface">
            <button
              type="button"
              onClick={() => setActive(open ? -1 : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] text-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-semibold text-ink">{shortName(p)}</span>
              </span>
              {m && <span className="label-ko shrink-0 text-ink">{m.value}</span>}
            </button>
            {open && (
              <div className="border-t border-line">
                <ProjectBody p={p} index={i} />
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

const featuredIds = new Set(featuredProjects.map((p) => p.id))
const others = sortedProjects.filter((p) => !featuredIds.has(p.id))

function AllProjects() {
  const [expanded, setExpanded] = useState(false)
  const list = expanded ? others : others.slice(0, 6)
  return (
    <div className="mt-20">
      <div className="flex items-end justify-between border-b border-ink pb-3">
        <h3 className="text-lg font-bold text-ink">
          그 밖의 프로젝트{' '}
          <span className="font-mono text-sm font-normal text-muted">{others.length}</span>
        </h3>
        <span className="label-ko hidden text-muted sm:inline">연도 · 회사 · 역할</span>
      </div>
      <ul>
        {list.map((p) => (
          <li key={p.id} className="group border-b border-line">
            <Link
              to={`/projects/${p.slug}`}
              className="grid grid-cols-[56px_1fr] items-baseline gap-x-4 gap-y-1 px-2 py-4 transition-colors group-hover:bg-ink group-hover:text-on-ink sm:grid-cols-[72px_1.4fr_0.5fr_1fr]"
            >
              <span className="font-mono text-[12px] text-muted group-hover:text-on-ink/70">
                {p.startedAt.slice(0, 4)}
              </span>
              <span className="font-medium text-ink group-hover:text-on-ink">
                {p.name}
                <span className="mt-0.5 block text-[13px] font-normal text-muted group-hover:text-on-ink/70">
                  {p.oneLine}
                </span>
              </span>
              <span className="col-start-2 text-[13px] text-ink-soft group-hover:text-on-ink/80 sm:col-start-auto">
                {companyName(p.company)}
              </span>
              <span className="col-start-2 text-[13px] text-ink-soft group-hover:text-on-ink/80 sm:col-start-auto">
                {p.role}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {others.length > 6 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-6 rounded-full border border-ink px-5 py-2 text-sm font-medium text-ink hover:bg-ink hover:text-on-ink"
        >
          {expanded ? '접기' : `전체 ${others.length}개 보기`}
        </button>
      )}
    </div>
  )
}

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionLabel index="03">Selected work</SectionLabel>
            <div id="work-title" className="mt-6">
              <DisplayHeading lead="Things I've" accent="built." />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm text-muted">
              {sortedProjects.length}개 프로젝트 중 성과가 가장 컸던 {featuredProjects.length}
              개입니다. 항목을 눌러 펼쳐 보세요.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="mt-12">
          <Accordion />
          <Stack />
        </Reveal>
        <AllProjects />
      </div>
    </section>
  )
}
