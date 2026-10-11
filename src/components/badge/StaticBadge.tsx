import { useState } from 'react'
import { badgeInfo } from './badgeData'

/**
 * 2D 사원증 — reduced-motion / WebGL 미지원 / 3D 로딩 중 폴백.
 * 클릭(Enter/Space)하면 CSS 3D 로 앞뒷면 뒤집기.
 */
export function StaticBadge({ hanging = true }: { hanging?: boolean }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div className="flex flex-col items-center">
      {hanging && (
        <div aria-hidden className="flex flex-col items-center">
          <div className="h-24 w-5 bg-ink" />
          <div className="h-3 w-10 rounded-sm bg-muted" />
        </div>
      )}
      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-pressed={flipped}
        aria-label={`사원증 ${flipped ? '앞면' : '뒷면'} 보기`}
        className="group relative aspect-[2/3] w-[220px] [perspective:1200px]"
      >
        <span
          className={`absolute inset-0 transition-transform duration-700 ease-out-expo [transform-style:preserve-3d] motion-reduce:transition-none ${
            flipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* front */}
          <span className="absolute inset-0 flex flex-col overflow-hidden rounded-[14px] border border-line bg-surface text-left [backface-visibility:hidden]">
            <span className="flex items-end justify-between bg-ink px-4 pt-6 pb-3 text-on-ink">
              <span>
                <span className="block font-mono text-[9px] tracking-[0.2em]">DEVELOPER ID</span>
                <span className="block font-mono text-[8px] opacity-60">
                  {badgeInfo.handle} · since {badgeInfo.since}
                </span>
              </span>
              <span className="grid size-7 place-items-center rounded-full border border-on-ink font-mono text-[8px]">
                YS
              </span>
            </span>
            <img
              src={badgeInfo.photo}
              alt=""
              className="mx-auto mt-3 aspect-[5/6] w-[48%] rounded-lg border border-line object-cover object-[50%_25%]"
            />
            <span className="mt-2 text-center text-lg font-bold text-ink">{badgeInfo.nameKo}</span>
            <span className="text-center font-mono text-[9px] tracking-wider text-muted">
              {badgeInfo.nameEn}
            </span>
            <span className="text-center font-serif text-base italic text-ink">
              {badgeInfo.role}
            </span>
            <span className="mt-auto flex items-center justify-between border-t border-line px-4 py-2 font-mono text-[8px] text-muted">
              <span>{badgeInfo.idNo}</span>
              <span>ANDROID</span>
            </span>
          </span>
          {/* back */}
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-[14px] bg-ink text-on-ink [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <span className="font-serif text-7xl italic">ys.</span>
            <span className="font-mono text-[8px] tracking-wider opacity-70">
              NATIVE FIRST · FULL-STACK WHEN NEEDED
            </span>
            <span className="mt-6 font-mono text-[10px]">{badgeInfo.github}</span>
            <span className="font-mono text-[10px]">{badgeInfo.email}</span>
          </span>
        </span>
      </button>
    </div>
  )
}
