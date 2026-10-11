import type { ReactNode } from 'react'

interface SectionLabelProps {
  index: string
  children: ReactNode
  className?: string
}

/** `01 — ABOUT` 형태의 자간 넓은 소형 라벨 (메뉴명과 같은 영문) */
export function SectionLabel({ index, children, className = '' }: SectionLabelProps) {
  return (
    <p
      className={`flex items-center gap-3 font-mono text-[11px] tracking-[0.28em] text-muted uppercase ${className}`}
    >
      <span>{index}</span>
      <span aria-hidden className="h-px w-8 bg-muted/60" />
      <span>{children}</span>
    </p>
  )
}

interface HeadingProps {
  /** 굵은 산세리프 파트 */
  lead: string
  /** 이탤릭 세리프 액센트 파트 */
  accent: string
  /** 액센트가 앞에 오는 경우 (예: "The periodic table of my stack.") */
  tail?: string
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}

/** "Things I've *built.*" 패턴의 헤드라인 */
export function DisplayHeading({
  lead,
  accent,
  tail,
  as: Tag = 'h2',
  className = '',
}: HeadingProps) {
  return (
    <Tag
      className={`text-[clamp(2.4rem,6vw,4.75rem)] font-bold leading-[0.95] tracking-[-0.035em] text-ink ${className}`}
    >
      {lead}{' '}
      <em className="font-serif text-[1.08em] font-normal italic tracking-[-0.01em] text-ink-soft">
        {accent}
      </em>
      {tail && <> {tail}</>}
    </Tag>
  )
}
