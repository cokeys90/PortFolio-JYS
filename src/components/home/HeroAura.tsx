/**
 * 히어로 캐릭터 뒤 잔잔한 배경 효과 — 캐릭터 영역 안에서만 그려지고 페이지 배경색은 건드리지 않는다.
 * - 은은한 빛 번짐(halo)이 천천히 숨쉬듯 커졌다 작아짐
 * - 크림 톤의 흐릿한 빛망울(bokeh)이 아주 느리게 떠오름
 * 색은 토큰(--surface, --wordmark, --tone-5)만 사용. reduced-motion 이면 정지 (index.css)
 */
const DOTS = [
  { x: 8, y: 62, s: 54, d: 0, t: 14 },
  { x: 84, y: 48, s: 38, d: 3, t: 17 },
  { x: 22, y: 30, s: 26, d: 6, t: 15 },
  { x: 74, y: 22, s: 46, d: 1.5, t: 19 },
  { x: 92, y: 74, s: 22, d: 8, t: 13 },
  { x: 4, y: 18, s: 30, d: 10, t: 18 },
  { x: 58, y: 8, s: 20, d: 4.5, t: 16 },
]

export function HeroAura() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-[-35%] top-[-6%] bottom-[8%] -z-10"
    >
      <div className="hero-halo absolute inset-0" />
      {DOTS.map((d, i) => (
        <span
          key={i}
          className="hero-bokeh absolute rounded-full"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.s,
            height: d.s,
            animationDelay: `-${d.d}s`,
            animationDuration: `${d.t}s`,
          }}
        />
      ))}
    </div>
  )
}
