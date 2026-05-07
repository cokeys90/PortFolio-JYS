import { useEffect } from 'react'
import { bioClosing, bioGreeting, bioOpening, bioSections } from '../data/bio'

export function AboutDetail() {
  // 페이지 진입 시 항상 최상단으로
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <article className="space-y-12 pb-12">
      {/* Greeting */}
      <header>
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary leading-tight">
          {bioGreeting}
        </h2>
        <p className="mt-6 text-base md:text-lg leading-relaxed text-text-secondary">
          {bioOpening}
        </p>
      </header>

      {/* Sections */}
      <section aria-label="기술 영역" className="space-y-10">
        {bioSections.map((section) => (
          <article key={section.title}>
            <header className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 mb-3">
              <h3 className="text-base md:text-lg font-semibold text-text-primary">
                {section.title}
              </h3>
              {section.duration && (
                <span className="shrink-0 text-xs font-mono font-semibold uppercase tracking-wider text-text-muted">
                  {section.duration}
                </span>
              )}
            </header>
            <p className="leading-relaxed text-text-secondary">{section.body}</p>
          </article>
        ))}
      </section>

      {/* Divider + Closing */}
      <hr className="border-border" />
      <section aria-label="Working style" className="space-y-4 leading-relaxed text-text-secondary">
        {bioClosing.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </section>
    </article>
  )
}
