import type Lenis from 'lenis'

/** SiteLayout 이 생성한 lenis 인스턴스 (reduced-motion 이면 null) */
let lenisRef: Lenis | null = null

export function setLenis(instance: Lenis | null) {
  lenisRef = instance
}

export function getLenis() {
  return lenisRef
}

/** 섹션 앵커 스크롤 — lenis 가 있으면 부드럽게, 없으면 즉시 이동 */
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenisRef) {
    lenisRef.scrollTo(el, { offset: 0, duration: 1.2 })
  } else {
    el.scrollIntoView({ behavior: 'auto', block: 'start' })
  }
}
