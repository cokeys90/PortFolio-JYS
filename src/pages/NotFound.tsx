import { Link, useLocation } from 'react-router-dom'
import { DisplayHeading, SectionLabel } from '../components/site/SectionHeading'
import { ArrowRight } from '../components/site/Pill'

export function NotFound() {
  const { pathname } = useLocation()
  return (
    <section className="relative py-8">
      <p
        aria-hidden
        className="pointer-events-none absolute -top-10 right-0 text-[clamp(7rem,22vw,14rem)] leading-none font-black tracking-tighter text-wordmark select-none"
      >
        404
      </p>
      <div className="relative">
        <SectionLabel index="404">Not found</SectionLabel>
        <div className="mt-6">
          <DisplayHeading as="h1" lead="Lost in the" accent="stack." />
        </div>
        <p className="mt-6 text-ink-soft">찾으시는 페이지가 없어요. 주소를 다시 확인해 주세요.</p>
        <p className="mt-2 font-mono text-[12px] break-all text-muted">{pathname}</p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 rounded-button bg-ink py-2 pr-2 pl-6 text-sm font-medium text-on-ink transition-colors hover:bg-ink-soft"
          >
            Back home
            <span className="grid size-9 place-items-center rounded-full bg-on-ink text-ink transition-transform group-hover:translate-x-0.5">
              <ArrowRight />
            </span>
          </Link>
          <Link to="/#work" className="text-sm text-ink underline-offset-4 hover:underline">
            Explore work
          </Link>
        </div>
      </div>
    </section>
  )
}
