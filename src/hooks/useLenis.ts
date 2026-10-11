import { useEffect } from 'react'
import Lenis from 'lenis'
import { setLenis } from '../lib/scroll'

/** 전역 부드러운 스크롤. prefers-reduced-motion 이면 생성하지 않는다. */
export function useLenis() {
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) return

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    setLenis(lenis)
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [])
}
