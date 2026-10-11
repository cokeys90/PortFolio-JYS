import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { StaticBadge } from './StaticBadge'

const LanyardScene = lazy(() => import('./LanyardScene'))

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * About 섹션의 사원증.
 * 섹션이 가까워지면 3D 씬을 lazy 로드 → 마운트 시 카드가 위에서 떨어지며 흔들린다.
 * 화면 밖에서는 렌더/물리를 멈춘다.
 */
export function IdBadge() {
  const reduce = useReducedMotion()
  const wrap = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)
  const [visible, setVisible] = useState(false)
  const [ready, setReady] = useState(false)
  const [webgl] = useState(() => typeof window !== 'undefined' && hasWebGL())
  const use3D = webgl && !reduce
  const onReady = useCallback(() => setReady(true), [])

  useEffect(() => {
    const el = wrap.current
    if (!el || !use3D) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
        if (entry.isIntersecting) setNear(true)
      },
      { rootMargin: '0px 0px -25% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [use3D])

  if (!use3D) {
    return (
      <div className="flex justify-center pt-4">
        <StaticBadge />
      </div>
    )
  }

  return (
    <div ref={wrap} className="relative h-full min-h-[460px] w-full lg:min-h-[620px]">
      {/* 3D 준비 전 자리 표시 — 레이아웃 흔들림 방지 */}
      {!ready && (
        <div className="absolute inset-0 grid place-items-center" aria-hidden>
          <span className="font-mono text-[11px] tracking-[0.25em] text-muted uppercase">
            loading id…
          </span>
        </div>
      )}
      {near && (
        <div className="absolute -inset-x-4 -top-40 bottom-0 lg:-inset-x-6 lg:-top-56">
          <Suspense fallback={null}>
            <LanyardScene active={visible} onReady={onReady} />
          </Suspense>
        </div>
      )}
      <p className="sr-only">
        사원증: 정윤수, Mobile Developer. 3D 카드는 드래그하면 흔들리고 클릭하면 뒤집힙니다.
      </p>
    </div>
  )
}
