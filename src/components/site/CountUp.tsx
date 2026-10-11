import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

/** "1,100만+" 처럼 숫자 + 접미사 문자열을 0부터 카운트업. 숫자가 없으면 그대로 표시 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const match = value.match(/^([\d,.]+)(.*)$/)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const target = match ? Number(match[1].replace(/,/g, '')) : 0
  const decimals = match?.[1].includes('.') ? match[1].split('.')[1].length : 0
  const [n, setN] = useState(0)

  const numeric = Boolean(match)
  useEffect(() => {
    if (!numeric || !inView || reduce) return
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(v),
    })
    return () => controls.stop()
  }, [inView, reduce, target, numeric])

  if (!match) return <span className={className}>{value}</span>
  const shown = reduce ? target : n
  const text = shown.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden>
        {text}
        {match[2]}
      </span>
    </span>
  )
}
