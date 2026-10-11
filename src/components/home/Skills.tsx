import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { chips, elements, type Element, type ToneLevel } from '../../data/periodic'
import { SKILL_ICONS } from '../../data/skillIcons'
import { DisplayHeading, SectionLabel } from '../site/SectionHeading'
import { Reveal } from '../site/Reveal'

const TONE: Record<ToneLevel, string> = {
  1: 'bg-tone-1 text-on-ink',
  2: 'bg-tone-2 text-on-ink',
  3: 'bg-tone-3 text-on-ink',
  4: 'bg-tone-4 text-ink',
  5: 'bg-tone-5 text-ink',
  6: 'bg-tone-6 text-ink ring-1 ring-inset ring-line',
}

function Tile({
  el,
  dim,
  selected,
  onSelect,
}: {
  el: Element
  dim: boolean
  selected: boolean
  onSelect: (el: Element) => void
}) {
  return (
    <button
      type="button"
      onMouseEnter={() => onSelect(el)}
      onFocus={() => onSelect(el)}
      onClick={() => onSelect(el)}
      aria-pressed={selected}
      aria-label={`${el.name} — ${el.chip}`}
      className={`relative flex aspect-square flex-col justify-between rounded-tile p-1.5 text-left transition-[opacity,transform,filter] duration-300 ease-out-expo sm:p-2 ${
        TONE[el.tone]
      } ${dim ? 'scale-[0.94] opacity-[0.18] grayscale' : 'opacity-100'} ${
        selected
          ? 'z-10 scale-[1.06] outline-2 outline-offset-2 outline-ink'
          : 'hover:-translate-y-0.5'
      }`}
    >
      <span className="font-mono text-[9px] leading-none opacity-70 sm:text-[10px]">{el.no}</span>
      <span className="text-[17px] leading-none font-bold tracking-tight sm:text-[22px]">
        {el.symbol}
      </span>
      <span className="truncate text-[8px] leading-none opacity-80 sm:text-[9.5px]">{el.name}</span>
    </button>
  )
}

function Detail({ el }: { el: Element }) {
  const icon = SKILL_ICONS[el.name]
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between">
        <div
          className={`grid size-24 shrink-0 place-items-center rounded-2xl ${TONE[el.tone]}`}
          aria-hidden
        >
          {icon ? (
            <svg viewBox="0 0 24 24" className="size-11 fill-current">
              <path d={icon.path} />
            </svg>
          ) : (
            <span className="text-4xl font-bold">{el.symbol}</span>
          )}
        </div>
        <span className="label-ko font-normal text-muted">{String(el.no).padStart(2, '0')}번</span>
      </div>
      <p className="mt-5 label-ko text-muted">{el.chip}</p>
      <h3 className="mt-1 text-2xl font-bold tracking-tight text-ink">{el.name}</h3>
      <p className="mt-4 text-sm text-ink-soft">
        {el.projects.length > 0 ? (
          <>
            <span className="font-mono font-medium text-ink">{el.projects.length}</span>개
            프로젝트에서 사용
          </>
        ) : (
          '프로젝트 외 업무·학습에서 사용'
        )}
      </p>
      {el.projects.length > 0 && (
        <ul className="mt-3 space-y-2 border-t border-line pt-3">
          {el.projects.slice(0, 4).map((p) => (
            <li key={p.id} className="flex items-baseline justify-between gap-3 text-sm">
              <span className="truncate text-ink">{p.name.split(' — ')[0]}</span>
              <span className="shrink-0 font-mono text-[11px] text-muted">
                {p.startedAt.slice(0, 4)}
              </span>
            </li>
          ))}
          {el.projects.length > 4 && (
            <li className="label-ko font-normal text-muted">외 {el.projects.length - 4}개</li>
          )}
        </ul>
      )}
    </div>
  )
}

export function Skills() {
  const [filter, setFilter] = useState<string | null>(null)
  const [selected, setSelected] = useState<Element>(elements[0])
  const reduce = useReducedMotion()

  const counts = useMemo(() => ({ total: elements.length }), [])

  return (
    <section id="skills" aria-labelledby="skills-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionLabel index="02">Skills</SectionLabel>
            <div id="skills-title" className="mt-6">
              <DisplayHeading lead="The" accent="periodic table" tail="of my stack." />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm text-muted">
              {counts.total}개 기술을 원소처럼 정리했습니다. 분류를 고르거나 칸을 눌러 어떤
              프로젝트에서 썼는지 확인해 보세요.
            </p>
          </Reveal>
        </div>

        {/* 계열 칩 */}
        <Reveal delay={0.1} className="mt-10">
          <div role="group" aria-label="분류 필터" className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilter(null)}
              aria-pressed={filter === null}
              className={`rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors ${
                filter === null
                  ? 'border-ink bg-ink text-on-ink'
                  : 'border-line text-ink hover:border-ink'
              }`}
            >
              전체
            </button>
            {chips.map((c) => {
              const on = filter === c.group
              return (
                <button
                  key={c.group}
                  type="button"
                  onClick={() => setFilter(on ? null : c.group)}
                  aria-pressed={on}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors ${
                    on ? 'border-ink bg-ink text-on-ink' : 'border-line text-ink hover:border-ink'
                  }`}
                >
                  <span aria-hidden className={`size-2.5 rounded-sm ${TONE[c.tone]}`} />
                  {c.label}
                  <span className="font-mono text-[10px] opacity-60">{c.count}</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px] lg:gap-12">
          <Reveal delay={0.15}>
            <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-7 sm:gap-2 lg:grid-cols-9">
              {elements.map((el) => (
                <Tile
                  key={el.name}
                  el={el}
                  dim={filter !== null && el.group !== filter}
                  selected={selected.name === el.name}
                  onSelect={setSelected}
                />
              ))}
            </div>
          </Reveal>

          <aside
            aria-live="polite"
            className="rounded-card border border-line bg-surface p-6 lg:sticky lg:top-28 lg:self-start"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selected.name}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <Detail el={selected} />
              </motion.div>
            </AnimatePresence>
          </aside>
        </div>
      </div>
    </section>
  )
}
