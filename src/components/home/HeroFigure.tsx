import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { heroMedia } from '../../lib/heroMedia'

/** 브라우저당 평생 1회 자동 재생 기록 */
const AUTOPLAY_KEY = 'hero-intro-autoplayed:v1'

type Phase = 'idle' | 'countdown' | 'loading' | 'playing'

/** Safari / iOS 는 VP9 알파를 투명하게 그리지 못하므로 크림 배경 mp4 를 쓴다 */
function prefersMp4() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  const ios = /iPad|iPhone|iPod/.test(ua) || (ua.includes('Mac') && navigator.maxTouchPoints > 1)
  const safari = /^((?!chrome|android|crios|fxios|edg).)*safari/i.test(ua)
  return ios || safari
}

function canAutoplay() {
  if (typeof window === 'undefined') return false
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    ?.saveData
  return !reduce && !saveData
}

function readAutoplayed() {
  try {
    return localStorage.getItem(AUTOPLAY_KEY) === '1'
  } catch {
    return true // 저장소를 못 쓰면 자동 재생하지 않음
  }
}

function markAutoplayed() {
  try {
    localStorage.setItem(AUTOPLAY_KEY, '1')
  } catch {
    /* ignore */
  }
}

// mp4(불투명) 재생 시 가장자리를 배경에 녹이는 마스크
const SOFT_EDGE = {
  maskImage:
    'linear-gradient(to right, transparent 0, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0, black 6%, black 94%, transparent 100%)',
  maskComposite: 'intersect',
  WebkitMaskImage:
    'linear-gradient(to right, transparent 0, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0, black 6%, black 94%, transparent 100%)',
  WebkitMaskComposite: 'source-in',
} as const

const LAYER = 'absolute inset-0 size-full object-contain object-bottom'
const FADE = 'transition-[opacity,filter] duration-300 ease-out'

/** 원형 카운트다운 링 */
function CountdownRing({ remaining, total }: { remaining: number; total: number }) {
  const r = 9
  const c = 2 * Math.PI * r
  const progress = Math.max(0, Math.min(1, remaining / total))
  return (
    <span className="relative grid size-6 place-items-center" aria-hidden>
      <svg viewBox="0 0 24 24" className="absolute inset-0 size-6 -rotate-90">
        <circle
          cx="12"
          cy="12"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.15"
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="12"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress)}
        />
      </svg>
      <span className="font-mono text-[10px] font-medium tabular-nums">{Math.ceil(remaining)}</span>
    </span>
  )
}

function SpeakerIcon({ off = false }: { off?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
      <path d="M2.5 6v4h2.5l3.5 3V3L5 6H2.5Z" fill="currentColor" />
      {off ? (
        <path d="m11 6 3 4m0-4-3 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      ) : (
        <path
          d="M11 5.5a3.5 3.5 0 0 1 0 5M12.8 3.8a6 6 0 0 1 0 8.4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}

/**
 * 히어로 중앙 3D 캐릭터.
 * - 첫 방문(브라우저당 1회): 화면에 보이는 동안 5초 카운트다운 → 자동 재생. 카운트다운 중 영상 미리 받기
 * - 소리 자동재생은 브라우저가 막으므로, 방문자가 아직 페이지를 누른 적이 없으면 무음 + 자막으로 재생
 * - 깜빡임 방지: poster 를 깔아둔 채 영상의 "첫 프레임이 실제로 그려진 뒤" 페이드 인, 끝날 땐 poster 먼저 복귀
 */
export function HeroFigure() {
  const reduce = useReducedMotion()
  const wrap = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLVideoElement>(null)
  const visibleRef = useRef(false)

  const [mp4] = useState(prefersMp4)
  const [phase, setPhase] = useState<Phase>(() =>
    heroMedia.intro && canAutoplay() && !readAutoplayed() ? 'countdown' : 'idle',
  )
  const [remaining, setRemaining] = useState(heroMedia.autoplayDelay)
  const [muted, setMuted] = useState(false)
  const [videoShown, setVideoShown] = useState(false)
  const [posterShown, setPosterShown] = useState(true)
  const [caption, setCaption] = useState<string | null>(null)

  const intro = heroMedia.intro

  const ensureSource = useCallback(() => {
    const el = introRef.current
    if (!el || !intro) return null
    if (!el.getAttribute('src')) {
      el.src = mp4 ? intro.mp4 : intro.webm
      el.preload = 'auto'
      el.load()
    }
    return el
  }, [intro, mp4])

  /** poster 를 먼저 보이게 한 뒤 영상을 걷어낸다 (중간 정지·종료 공통) */
  const backToPoster = useCallback(() => {
    const el = introRef.current
    setPosterShown(true)
    setVideoShown(false)
    setCaption(null)
    setPhase('idle')
    window.setTimeout(() => {
      if (!el) return
      el.pause()
      el.currentTime = 0
    }, 320)
  }, [])

  const startPlayback = useCallback(async () => {
    const el = ensureSource()
    if (!el || !intro) return
    // 항상 소리와 함께 먼저 시도한다. 브라우저가 막으면(상호작용 전 자동 재생) 무음 + 자막으로 재시도
    el.currentTime = 0
    el.muted = false
    setMuted(false)
    setPhase('loading')

    const tryPlay = async () => {
      try {
        await el.play()
        return true
      } catch {
        return false
      }
    }
    let ok = await tryPlay()
    if (!ok && !el.muted) {
      // 소리 재생이 막히면 무음으로 재시도
      el.muted = true
      setMuted(true)
      ok = await tryPlay()
    }
    if (!ok) {
      // 코덱 문제 등 → 다른 형식으로 한 번 더
      const other = el.currentSrc.endsWith('.mp4') ? intro.webm : intro.mp4
      if (!el.currentSrc.endsWith(other)) {
        el.src = other
        ok = await tryPlay()
      }
    }
    if (!ok) {
      setPhase('idle')
      return
    }

    // 첫 프레임이 실제로 화면에 그려진 뒤에 영상 레이어를 드러낸다
    const reveal = () => {
      setVideoShown(true)
      setPhase('playing')
      window.setTimeout(() => setPosterShown(false), 200)
    }
    const v = el as HTMLVideoElement & {
      requestVideoFrameCallback?: (cb: () => void) => number
    }
    if (v.requestVideoFrameCallback) v.requestVideoFrameCallback(reveal)
    else el.addEventListener('playing', reveal, { once: true })
  }, [ensureSource, intro])

  // 히어로 가시성 추적 + 화면 밖이면 재생 정지
  useEffect(() => {
    const node = wrap.current
    if (!node) return
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
        const el = introRef.current
        if (!entry.isIntersecting && el && !el.paused) backToPoster()
      },
      { threshold: 0.35 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [backToPoster])

  // 카운트다운: 히어로가 보이고 탭이 활성일 때만 줄어든다. 시작하자마자 영상 미리 받기
  useEffect(() => {
    if (phase !== 'countdown') return
    ensureSource()
    let last = performance.now()
    let left = heroMedia.autoplayDelay
    let raf = 0
    const tick = (now: number) => {
      const dt = (now - last) / 1000
      last = now
      if (visibleRef.current && !document.hidden) left -= dt
      setRemaining(Math.max(0, left))
      if (left <= 0) {
        markAutoplayed()
        void startPlayback()
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [phase, ensureSource, startPlayback])

  // 무음으로 재생 중이면 페이지 어디든 첫 클릭·터치·키 입력에서 바로 소리를 켠다
  // (소리 켜기는 사용자 입력 이벤트 안에서만 허용됨). 히어로 버튼은 자체 동작이 있으므로 제외
  useEffect(() => {
    if (phase !== 'playing' || !muted) return
    const unmute = (e: Event) => {
      const t = e.target as Element | null
      if (t?.closest?.('[data-hero-ctl]')) return
      const el = introRef.current
      if (!el) return
      el.muted = false
      setMuted(false)
    }
    const evs = ['pointerdown', 'pointerup', 'touchend', 'keydown'] as const
    evs.forEach((ev) => window.addEventListener(ev, unmute, { capture: true }))
    return () => evs.forEach((ev) => window.removeEventListener(ev, unmute, { capture: true }))
  }, [phase, muted])

  // 자막 동기화 (무음 재생일 때만 표시)
  useEffect(() => {
    if (phase !== 'playing' || !muted) return
    let raf = 0
    const loop = () => {
      const t = introRef.current?.currentTime ?? 0
      const cue = heroMedia.captions.find((c) => t >= c.start && t <= c.end)
      setCaption((prev) => (prev === (cue?.text ?? null) ? prev : (cue?.text ?? null)))
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [phase, muted])

  const onButton = () => {
    const el = introRef.current
    if (phase === 'countdown') {
      markAutoplayed()
      setPhase('idle')
      return
    }
    if (phase === 'idle') {
      void startPlayback()
      return
    }
    if (phase === 'playing' && muted && el) {
      el.muted = false
      setMuted(false)
      return
    }
    backToPoster()
  }

  const shownCaption = phase === 'playing' && muted ? caption : null

  const label =
    phase === 'countdown'
      ? '곧 인사해요 · 취소'
      : phase === 'loading'
        ? '불러오는 중…'
        : phase === 'playing'
          ? muted
            ? '소리 켜기'
            : '멈추기'
          : '인사 듣기'

  const ariaLabel =
    phase === 'countdown'
      ? `${Math.ceil(remaining)}초 뒤 자기소개 영상이 재생됩니다. 누르면 취소합니다`
      : label

  return (
    <div ref={wrap} className="relative mx-auto h-full w-full">
      {/* poster — 대기 상태. 숨쉬기 모션은 reduced-motion 이면 정지 */}
      <motion.img
        src={heroMedia.poster}
        alt="정윤수 3D 캐릭터"
        fetchPriority="high"
        className={`${LAYER} ${FADE} origin-bottom ${posterShown ? 'opacity-100 blur-0' : 'opacity-0 blur-[2px]'}`}
        animate={reduce || videoShown ? undefined : { scaleY: [1, 1.006, 1], y: [0, -1.5, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {intro && (
        <video
          ref={introRef}
          playsInline
          preload="none"
          onEnded={backToPoster}
          aria-label="정윤수 캐릭터 자기소개 영상"
          style={mp4 ? SOFT_EDGE : undefined}
          className={`${LAYER} ${FADE} ${videoShown ? 'opacity-100 blur-0' : 'opacity-0 blur-[2px]'}`}
        />
      )}

      {/* 무음 재생 자막 */}
      <div
        aria-live="polite"
        className={`pointer-events-none absolute inset-x-0 bottom-[7%] z-10 flex justify-center px-2 transition-opacity duration-200 ${
          shownCaption ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {shownCaption && (
          <p className="max-w-[92%] rounded-2xl bg-ink/85 px-4 py-2 text-center text-[13px] leading-snug text-on-ink backdrop-blur-sm sm:text-sm">
            {shownCaption}
          </p>
        )}
      </div>

      {intro && (
        <div className="absolute top-[12%] right-0 z-10 flex translate-x-1/3 flex-col items-end gap-2 sm:translate-x-1/2">
          <button
            data-hero-ctl
            type="button"
            onClick={onButton}
            aria-label={ariaLabel}
            className={`inline-flex items-center gap-2 rounded-full border py-1.5 pr-4 pl-2 text-[13px] font-medium backdrop-blur-sm transition-colors ${
              phase === 'playing' && muted
                ? 'border-ink bg-ink text-on-ink hover:bg-ink-soft'
                : 'border-line bg-surface/90 text-ink hover:border-ink'
            }`}
          >
            {phase === 'countdown' ? (
              <CountdownRing remaining={remaining} total={heroMedia.autoplayDelay} />
            ) : phase === 'loading' ? (
              <span className="grid size-6 place-items-center" aria-hidden>
                <span className="size-3.5 animate-spin rounded-full border-2 border-ink/20 border-t-ink motion-reduce:animate-none" />
              </span>
            ) : (
              <span className="grid size-6 place-items-center" aria-hidden>
                {phase === 'playing' && !muted ? (
                  <span className="size-2.5 rounded-[2px] bg-current" />
                ) : (
                  <SpeakerIcon />
                )}
              </span>
            )}
            {label}
          </button>
          {phase === 'playing' && muted && (
            <button
              data-hero-ctl
              type="button"
              onClick={backToPoster}
              className="rounded-full border border-line bg-surface/90 px-3 py-1 text-[12px] text-ink-soft backdrop-blur-sm hover:border-ink"
            >
              멈추기
            </button>
          )}
        </div>
      )}
    </div>
  )
}
