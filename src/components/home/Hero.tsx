import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { profile } from '../../data/profile'
import { scrollToId } from '../../lib/scroll'
import { HeroFigure } from './HeroFigure'
import { HeroAura } from './HeroAura'
import { ArrowRight, ArrowUpRight } from '../site/Pill'

const EASE = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const wordY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '35%'])
  const figureY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '12%'])

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 40 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.1, delay, ease: EASE },
        }

  return (
    <section
      id="top"
      ref={ref}
      aria-label="소개"
      className="relative flex min-h-[100svh] flex-col overflow-hidden lg:block lg:h-[100svh] lg:min-h-[680px]"
    >
      {/* 배경 워드마크 */}
      <motion.p
        aria-hidden
        style={{ y: wordY }}
        className="pointer-events-none mt-28 text-center text-[19vw] leading-[0.8] font-black tracking-[-0.06em] text-wordmark select-none lg:absolute lg:inset-x-0 lg:top-[13vh] lg:mt-0 lg:text-[min(16.5vw,17rem)]"
        {...(reduce
          ? {}
          : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 1.6 } })}
      >
        YOONSOO
      </motion.p>

      {/* 중앙 캐릭터 */}
      <motion.div
        style={{ y: figureY }}
        className="relative z-10 mx-auto -mt-[16vw] h-[60svh] w-[min(80vw,360px)] lg:absolute lg:bottom-0 lg:left-1/2 lg:mt-0 lg:h-[80%] lg:w-[min(30vw,420px)] lg:-translate-x-1/2"
        {...enter(0.15)}
      >
        <HeroAura />
        <HeroFigure />
      </motion.div>

      {/* 좌하단 헤드라인 */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-4 pt-8 pb-6 md:px-8 lg:absolute lg:inset-x-0 lg:bottom-0 lg:pb-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <motion.p
              className="font-mono text-[11px] tracking-[0.3em] text-muted uppercase"
              {...enter(0.3)}
            >
              {profile.nameEn} · {profile.fullName}
            </motion.p>
            <motion.h1
              className="mt-4 text-[clamp(3rem,7.4vw,7rem)] leading-[0.88] font-bold tracking-[-0.045em] text-ink"
              {...enter(0.4)}
            >
              Mobile
              <br />
              Developer<span className="font-serif font-normal italic">.</span>
            </motion.h1>
            <motion.p className="mt-5 text-[15px] text-ink-soft md:text-base" {...enter(0.55)}>
              {profile.title}
              <span className="mt-1 block font-mono text-[12px] text-muted">
                Android · iOS · React Native · Web · Web3
              </span>
            </motion.p>
          </div>

          <motion.div className="flex flex-col items-start gap-4 lg:items-end" {...enter(0.7)}>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('work')
              }}
              className="group inline-flex items-center gap-3 rounded-button bg-ink py-2 pr-2 pl-6 text-sm font-medium text-on-ink transition-colors hover:bg-ink-soft"
            >
              Explore work
              <span className="grid size-9 place-items-center rounded-full bg-on-ink text-ink transition-transform group-hover:translate-x-0.5">
                <ArrowRight />
              </span>
            </a>
            <div className="flex items-center gap-5 text-sm text-ink">
              <a href={`mailto:${profile.email}`} className="underline-offset-4 hover:underline">
                Let&apos;s talk
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
              >
                GitHub <ArrowUpRight />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
