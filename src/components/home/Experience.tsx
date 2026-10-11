import { experience } from '../../data/experience'
import { DisplayHeading, SectionLabel } from '../site/SectionHeading'
import { Reveal } from '../site/Reveal'

/** 한글 칩은 Mono 대신 본문 서체 (Mono 에 한글 글리프 없음) */
const HANGUL = /[가-힣]/

const fmt = (ym: string | null) => (ym ? ym.replace('-', '.') : '현재')

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <Reveal className="text-center">
          <SectionLabel index="05" className="justify-center">
            Experience
          </SectionLabel>
          <div id="experience-title" className="mt-6">
            <DisplayHeading lead="Where I've" accent="worked." />
          </div>
        </Reveal>

        <ol className="relative mt-20">
          {/* 중앙(모바일은 좌측) 세로선 */}
          <span
            aria-hidden
            className="absolute top-0 bottom-0 left-[11px] w-px bg-line lg:left-1/2"
          />
          {experience.map((c, i) => {
            const right = i % 2 === 1
            return (
              <li key={c.id} className="relative pb-20 last:pb-0 lg:grid lg:grid-cols-2 lg:gap-16">
                {/* 노드 */}
                <span
                  aria-hidden
                  className="absolute top-3 left-[6px] size-[11px] rounded-full border-2 border-ink bg-bg lg:left-1/2 lg:-translate-x-1/2"
                />
                {/* 연도 */}
                <Reveal
                  className={`pl-10 lg:pl-0 ${right ? 'lg:col-start-1 lg:row-start-1 lg:text-right' : 'lg:col-start-2'}`}
                >
                  <p className="text-[clamp(3.5rem,8vw,7rem)] leading-[0.85] font-bold tracking-[-0.05em] text-ink">
                    {c.startedAt.slice(0, 4)}
                  </p>
                  <p className="label-ko mt-2 font-normal text-muted">
                    {fmt(c.startedAt)} – {fmt(c.endedAt)}
                    {c.endedAt ? ` · ${c.duration}` : ''}
                  </p>
                </Reveal>
                {/* 카드 */}
                <Reveal
                  delay={0.1}
                  className={`mt-6 pl-10 lg:mt-0 lg:pl-0 ${right ? 'lg:col-start-2 lg:row-start-1' : 'lg:col-start-1 lg:row-start-1'}`}
                >
                  <article className="rounded-card border border-line bg-surface p-6 md:p-7">
                    <p className="label-ko text-muted">
                      {c.department} · {c.location}
                    </p>
                    <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                      {c.fullName}
                    </h3>
                    <p className="mt-1 text-lg font-medium text-ink-soft">{c.role}</p>
                    <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{c.summary}</p>
                    {c.note && <p className="mt-3 text-[13px] text-muted">— {c.note}</p>}
                    <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="주요 키워드">
                      {c.tech.map((t) => (
                        <li
                          key={t}
                          className={`rounded-full border border-line px-2.5 py-1 text-ink-soft ${HANGUL.test(t) ? 'text-[12px]' : 'font-mono text-[11px]'}`}
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
