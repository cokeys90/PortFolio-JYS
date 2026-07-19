import { highlights } from '../../data/highlights'

/**
 * 첫 화면 3초 각인용 임팩트 스트립.
 * 우측 콘텐츠 최상단(About 위)에 배치 — 스크롤 시 가장 먼저 노출.
 * 값은 accent, 라벨은 mono/muted. 픽셀 폰트·애니메이션 없이 라이브 톤 유지.
 */
export function Highlights() {
  return (
    <section aria-label="핵심 성과 지표" className="mb-16 md:mb-24 lg:mb-28">
      <p className="mb-5 font-mono text-xs lowercase tracking-widest text-text-muted">
        cat highlights
      </p>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-7">
        {highlights.map((h) => (
          <li key={h.label}>
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="whitespace-nowrap font-mono text-2xl font-bold leading-none text-accent md:text-4xl">
                {h.value}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                {h.label}
              </span>
            </div>
            <p className="mt-2 text-sm leading-snug text-text-secondary">{h.context}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
