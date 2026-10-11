import { profile } from '../../data/profile'
import { DisplayHeading, SectionLabel } from '../site/SectionHeading'
import { Reveal } from '../site/Reveal'
import { ArrowUpRight } from '../site/Pill'

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <Reveal>
          <SectionLabel index="07">Contact</SectionLabel>
          <div id="contact-title" className="mt-6">
            <DisplayHeading
              lead="Let's"
              accent="talk."
              className="!text-[clamp(3.5rem,11vw,10rem)]"
            />
          </div>
        </Reveal>
        <Reveal
          delay={0.1}
          className="mt-12 grid gap-10 border-t border-ink pt-10 md:grid-cols-[1.4fr_1fr]"
        >
          <div>
            <p className="max-w-md text-[15px] text-ink-soft">
              새로운 프로젝트, 협업, 채용 제안 모두 환영합니다. 메일로 편하게 연락 주세요.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-6 inline-flex items-center gap-3 text-[clamp(1.5rem,3.4vw,2.75rem)] font-semibold tracking-tight text-ink underline decoration-line decoration-2 underline-offset-8 transition-colors hover:decoration-ink"
            >
              {profile.email}
              <ArrowUpRight className="size-6" />
            </a>
          </div>
          <ul className="flex flex-col gap-3 md:items-end md:justify-end">
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-mono text-sm text-ink hover:underline"
              >
                GitHub · {profile.github.replace(/^https?:\/\//, '')} <ArrowUpRight />
              </a>
            </li>
            {profile.linkedin && (
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-sm text-ink hover:underline"
                >
                  LinkedIn <ArrowUpRight />
                </a>
              </li>
            )}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
