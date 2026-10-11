import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { bioClosing, bioGreeting, bioOpening, bioSections } from '../data/bio'
import { getLenis } from '../lib/scroll'
import { DisplayHeading, SectionLabel } from '../components/site/SectionHeading'
import { ArrowRight } from '../components/site/Pill'

/** /about — 자세한 소개 (bio.ts 단일 출처) */
export function AboutDetail() {
  // 페이지 진입 시 항상 최상단으로
  useEffect(() => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <article className="pb-12">
      <Link
        to="/#about"
        className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.28em] text-muted uppercase hover:text-ink"
      >
        <ArrowRight className="size-3 rotate-180" /> Home
      </Link>

      <header className="mt-8">
        <SectionLabel index="01">About</SectionLabel>
        <div className="mt-6">
          <DisplayHeading as="h1" lead="Hi, I'm" accent="Yoonsoo." />
        </div>
        <p className="mt-8 text-xl font-semibold text-ink">{bioGreeting}</p>
        <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">{bioOpening}</p>
      </header>

      <section aria-label="기술 영역" className="mt-14 border-t border-line">
        {bioSections.map((section, i) => (
          <article
            key={section.title}
            className="grid gap-3 border-b border-line py-7 md:grid-cols-[48px_1fr] md:gap-6"
          >
            <span className="font-mono text-[12px] text-muted">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <header className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h2 className="text-lg font-bold tracking-tight text-ink">{section.title}</h2>
                {section.duration && (
                  <span className="label-ko shrink-0 font-normal text-muted">
                    {section.duration}
                  </span>
                )}
              </header>
              <p className="mt-3 leading-relaxed text-ink-soft">{section.body}</p>
            </div>
          </article>
        ))}
      </section>

      <section aria-labelledby="working-style" className="mt-14">
        <h2 id="working-style" className="label-ko text-muted">
          일하는 방식
        </h2>
        <div className="mt-4 space-y-4 leading-relaxed text-ink-soft">
          {bioClosing.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>
    </article>
  )
}
