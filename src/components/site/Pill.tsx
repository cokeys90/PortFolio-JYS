import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'solid' | 'outline' | 'ghost'

const VARIANT: Record<Variant, string> = {
  solid: 'bg-ink text-on-ink hover:bg-ink-soft',
  outline: 'border border-ink/80 text-ink hover:bg-ink hover:text-on-ink',
  ghost: 'text-ink hover:bg-ink/5',
}

interface PillLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  children: ReactNode
}

/** 둥근 알약형 버튼 링크 */
export function PillLink({ variant = 'solid', className = '', children, ...rest }: PillLinkProps) {
  return (
    <a
      className={`inline-flex items-center gap-2 rounded-button px-5 py-2.5 text-sm font-medium transition-colors ${VARIANT[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}

/** 외부 링크 표시용 ↗ */
export function ArrowUpRight({ className = 'size-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function ArrowRight({ className = 'size-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
