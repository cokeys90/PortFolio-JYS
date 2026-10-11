/**
 * 히어로 캐릭터 미디어 (docs/redesign-plan.md §7, §13).
 * - poster: 정지 이미지 (투명 webp). intro 첫 프레임과 같은 크롭·크기로 뽑아야 전환이 튀지 않는다
 * - intro:  음성 포함 자기소개 (532×1016, 15초)
 *   - webm: VP9 알파(투명 배경) — Chrome / Edge / Firefox
 *   - mp4:  H.264, 배경 --bg(#f4efe6) 합성 — Safari / iOS (알파 미지원)
 * - captions: 무음 자동재생일 때 보여줄 자막 (초 단위, 음성 구간 검출로 맞춤)
 * - idle:   무음 대기 루프 (선택, docs/backlog.md). 없으면 poster 에 CSS 숨쉬기 모션
 */
export interface HeroCaption {
  start: number
  end: number
  text: string
}

export interface HeroMedia {
  poster: string
  intro: { webm: string; mp4: string } | null
  idle: { webm: string; mp4: string } | null
  captions: HeroCaption[]
  /** 첫 방문 자동 재생까지 대기 시간(초) */
  autoplayDelay: number
}

export const heroMedia: HeroMedia = {
  poster: '/images/hero-poster.webp',
  intro: { webm: '/videos/hero-intro.webm', mp4: '/videos/hero-intro.mp4' },
  idle: null,
  captions: [
    { start: 1.2, end: 4.7, text: '안녕하세요, 10년 차 모바일 개발자 정윤수입니다.' },
    { start: 5.5, end: 8.1, text: '1,100만 명이 쓰는 서비스를 만들었고,' },
    { start: 8.6, end: 11.7, text: '지금은 LIVIT에서 개발팀을 이끌고 있어요.' },
    { start: 12.2, end: 13.9, text: '천천히 둘러보세요!' },
  ],
  autoplayDelay: 5,
}
