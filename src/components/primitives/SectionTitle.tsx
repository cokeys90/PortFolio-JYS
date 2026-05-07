import type { ReactNode } from 'react'

interface Props {
  /** aria-labelledby로 참조될 id */
  id: string
  children: ReactNode
}

/**
 * 모바일: 스크롤 시 sticky 바 (배경 + backdrop-blur)
 * 데스크톱: 섹션 구분용 정적 타이틀 + 우측 보더 라인
 * 인쇄: sticky/blur 해제, 단순 텍스트 + 라인
 */
export function SectionTitle({ id, children }: Props) {
  return (
    <h2
      id={id}
      className="sticky top-0 z-20 -mx-6 mb-6 w-screen bg-bg/95 backdrop-blur px-6 py-5 text-sm font-bold uppercase tracking-widest text-text-primary md:-mx-12 md:px-12 lg:relative lg:top-auto lg:z-auto lg:mx-0 lg:mb-8 lg:flex lg:w-auto lg:items-center lg:gap-4 lg:bg-transparent lg:backdrop-blur-none lg:px-0 lg:py-0 print:!relative print:!top-auto print:!mx-0 print:!mb-4 print:!flex print:!w-auto print:!bg-transparent print:!backdrop-blur-none print:!px-0 print:!py-0"
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="hidden lg:inline-block lg:flex-1 lg:h-px lg:bg-border print:flex-1 print:h-px print:bg-border print:block"
      />
    </h2>
  )
}
