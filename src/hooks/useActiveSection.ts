import { useEffect, useState } from 'react'

/**
 * IntersectionObserver로 현재 보이는 섹션 id를 추적.
 * 헤더 nav의 active 상태 표시용.
 */
export function useActiveSection(sectionIds: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length === 0) return
        const topmost = visible.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
        )[0]
        setActiveId(topmost.target.id)
      },
      {
        // 화면 상단 25% 지점에 들어와야 활성, 하단 60% 이상 차지하면 비활성
        rootMargin: '-25% 0px -60% 0px',
        threshold: 0,
      },
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}
