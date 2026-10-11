import { useState } from 'react'
import type { ProjectLink, ProjectLinkKind } from '../../data/projects'
import { ArrowUpRight } from './Pill'

const KIND_LABEL: Record<ProjectLinkKind, string> = {
  article: '기사',
  store: '앱 스토어',
  site: '서비스 사이트',
  video: '영상',
  social: 'SNS',
  funding: '크라우드펀딩',
}

/**
 * 원 사이트 대표 이미지를 그대로 불러온다 (no-referrer — 핫링크 차단 회피).
 * 실패하거나 thumb 이 없으면 매체 이름이 든 기본 카드로 대체.
 */
function Thumb({ link, className }: { link: ProjectLink; className: string }) {
  const [failed, setFailed] = useState(false)
  if (!link.thumb || failed) {
    return (
      <span
        aria-hidden
        className={`grid place-items-center bg-surface-2 px-2 text-center text-[12px] font-semibold text-ink-soft ${className}`}
      >
        {link.source ?? KIND_LABEL[link.kind ?? 'site']}
      </span>
    )
  }
  const contain = link.thumbFit === 'contain'
  return (
    <span aria-hidden className={`block overflow-hidden bg-surface-2 ${className}`}>
      <img
        src={link.thumb}
        alt=""
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className={`size-full transition-transform duration-500 group-hover:scale-[1.04] ${
          contain ? 'object-contain p-3' : 'object-cover'
        }`}
      />
    </span>
  )
}

function Meta({ link }: { link: ProjectLink }) {
  const parts = [link.kind && KIND_LABEL[link.kind], link.source, link.date].filter(Boolean)
  return <span className="label-ko font-normal text-muted">{parts.join(' · ')}</span>
}

/** 프로젝트 관련 링크 카드 — 새 탭으로 연다 */
export function LinkCard({
  link,
  size = 'compact',
}: {
  link: ProjectLink
  size?: 'compact' | 'full'
}) {
  if (size === 'full') {
    return (
      <a
        href={link.url}
        target="_blank"
        rel="noreferrer"
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-ink"
      >
        <Thumb link={link} className="aspect-[1.91/1] w-full border-b border-line" />
        <span className="flex flex-1 flex-col gap-2 p-4">
          <Meta link={link} />
          <span className="line-clamp-2 text-[15px] leading-snug font-semibold text-ink">
            {link.label}
          </span>
          <span className="mt-auto inline-flex items-center gap-1 pt-1 text-[12px] text-muted group-hover:text-ink">
            새 탭에서 열기 <ArrowUpRight className="size-3" />
          </span>
        </span>
      </a>
    )
  }
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-3 rounded-2xl border border-line bg-surface p-2 pr-3 transition-colors hover:border-ink"
    >
      <Thumb link={link} className="size-14 shrink-0 rounded-xl" />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="line-clamp-2 text-[13px] leading-snug font-medium text-ink">
          {link.label}
        </span>
        <Meta link={link} />
      </span>
      <ArrowUpRight className="size-3.5 shrink-0 text-muted group-hover:text-ink" />
    </a>
  )
}
