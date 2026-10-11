import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { achievements, type Achievement } from '../../data/achievements'
import { DisplayHeading, SectionLabel } from '../site/SectionHeading'
import { CountUp } from '../site/CountUp'

function Card({ a, i }: { a: Achievement; i: number }) {
  return (
    <article className="flex h-[300px] w-[78vw] shrink-0 snap-start flex-col justify-between rounded-card border border-line bg-surface p-7 sm:w-[380px] lg:h-[340px] lg:w-[420px]">
      <div className="flex items-start justify-between">
        <span className="grid size-11 place-items-center rounded-xl bg-ink font-mono text-[12px] text-on-ink">
          {String(i + 1).padStart(2, '0')}
        </span>
        <span className="label-ko text-muted">{a.label}</span>
      </div>
      <div>
        <CountUp
          value={a.value}
          className="block text-[clamp(3.2rem,6vw,5.2rem)] leading-none font-bold tracking-[-0.04em] text-ink"
        />
        <p className="mt-4 text-[15px] text-ink-soft">{a.context}</p>
      </div>
    </article>
  )
}

function Header() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 md:px-8 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <SectionLabel index="06">Achievements</SectionLabel>
        <div id="achievements-title" className="mt-6">
          <DisplayHeading lead="Proud" accent="moments." />
        </div>
      </div>
      <p className="max-w-sm text-sm text-muted">
        숫자로 남은 결과입니다. 스크롤하면 옆으로 넘어갑니다.
      </p>
    </div>
  )
}

/** lg 이상: 세로 스크롤을 가로 이동으로 변환하는 pinned 트랙 */
function PinnedTrack() {
  const section = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (track.current) ro.observe(track.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance])

  return (
    <div ref={section} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-14 overflow-hidden">
        <Header />
        <motion.div
          ref={track}
          style={{ x }}
          className="flex w-max gap-5 px-4 md:px-8 lg:pl-[max(2rem,calc((100vw-1440px)/2+2rem))]"
        >
          {achievements.map((a, i) => (
            <Card key={a.value + a.label} a={a} i={i} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export function Achievements() {
  const reduce = useReducedMotion()
  const [wide] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches,
  )
  const pinned = wide && !reduce

  return (
    <section
      id="achievements"
      aria-labelledby="achievements-title"
      className="py-20 md:py-28 lg:py-0"
    >
      {pinned ? (
        <PinnedTrack />
      ) : (
        <>
          <Header />
          <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:px-8">
            {achievements.map((a, i) => (
              <Card key={a.value + a.label} a={a} i={i} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
