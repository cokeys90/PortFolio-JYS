import { Link } from 'react-router-dom'
import { profile } from '../../data/profile'
import { experience } from '../../data/experience'
import { schools } from '../../data/education'
import { strengthKeywords } from '../../data/skills'
import { highlights } from '../../data/highlights'
import { DisplayHeading, SectionLabel } from '../site/SectionHeading'
import { Reveal } from '../site/Reveal'
import { ArrowRight, ArrowUpRight, PillLink } from '../site/Pill'
import { IdBadge } from '../badge/IdBadge'

const since = [...experience].map((c) => c.startedAt).sort()[0] ?? '2015-08'
const career = highlights.find((h) => h.label === '경력')
const current = experience.find((c) => c.endedAt === null)

const FACTS: { k: string; v: string }[] = [
  { k: '이름', v: `${profile.fullName} · ${profile.nameEn} (${profile.nickname})` },
  ...(current ? [{ k: '현재', v: `${current.name} · ${current.role}` }] : []),
  { k: '경력', v: `${career?.value ?? ''} 차 · ${since.replace('-', '.')}부터` },
  { k: '주력', v: 'Android Native (Java · Kotlin)' },
  { k: '그 외', v: 'iOS · React Native · Web · Web3' },
  {
    k: '규모',
    v: `${highlights[0].context} · ${highlights[0].value.replace('+', ' 명+')}`,
  },
  { k: '학력', v: `${schools[0]?.name.replace(/\s*\(.*\)/, '')} ${schools[0]?.major}` },
]

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative scroll-mt-0 py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 md:px-8 lg:grid-cols-[1.1fr_0.9fr_1fr] lg:gap-8">
        {/* 좌: 인사 */}
        <div className="lg:pt-10">
          <Reveal>
            <SectionLabel index="01">About</SectionLabel>
            <div id="about-title" className="mt-6">
              <DisplayHeading lead="Hi, I'm" accent="Yoonsoo." />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-ink-soft md:text-base">
              {profile.tagline}
            </p>
            <ul className="mt-5 max-w-md space-y-1.5 text-sm text-muted">
              {strengthKeywords.slice(1, 4).map((k) => (
                <li key={k} className="flex gap-2">
                  <span aria-hidden>—</span>
                  {k}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-button bg-ink px-5 py-2.5 text-sm font-medium text-on-ink transition-colors hover:bg-ink-soft"
            >
              자세한 소개 <ArrowRight />
            </Link>
            <PillLink variant="outline" href={profile.github} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight />
            </PillLink>
            <PillLink variant="outline" href={`mailto:${profile.email}`}>
              Email
            </PillLink>
            <Link
              to="/resume"
              className="inline-flex items-center gap-2 rounded-button border border-ink/80 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-on-ink"
            >
              Resume
            </Link>
          </Reveal>
        </div>

        {/* 중앙: 랜야드 사원증 */}
        <div className="relative min-h-[460px] lg:min-h-[620px]">
          <IdBadge />
        </div>

        {/* 우: 인적사항 */}
        <div className="lg:pt-10">
          <Reveal delay={0.15}>
            <p className="label-ko text-muted">한눈에 보기</p>
            <dl className="mt-4 divide-y divide-line border-y border-line">
              {FACTS.map(({ k, v }) => (
                <div key={k} className="grid grid-cols-[110px_1fr] gap-4 py-3.5 text-sm">
                  <dt className="label-ko text-muted">{k}</dt>
                  <dd className="text-right text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 font-serif text-2xl leading-snug text-ink-soft italic md:text-[28px]">
              &ldquo;Native first,
              <br />
              full-stack when needed.&rdquo;
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
