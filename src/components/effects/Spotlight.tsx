import { useEffect, useRef } from 'react'

/**
 * 마우스 따라다니는 라디얼 스포트라이트.
 * 데스크톱 + prefers-reduced-motion 미선언 환경에서만 활성.
 * pointer-events-none, print:hidden.
 */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const desktop = window.matchMedia('(min-width: 768px) and (pointer: fine)')
    if (!desktop.matches) return

    const handler = (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
      el.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, var(--accent-hover-bg), transparent 40%)`
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 transition duration-300 motion-reduce:transition-none print:hidden"
    />
  )
}
