export interface Highlight {
  /** 임팩트 수치 (accent 강조) */
  value: string
  /** 짧은 한글 라벨 (muted) — About 의 '경력' 조회 키로도 쓰임 */
  label: string
  /** 어떤 성과인지 한 줄 맥락 */
  context: string
}

/**
 * 첫 화면 3초 각인용 핵심 지표. 상단 임팩트 스트립에 노출.
 * 값은 대표 프로젝트(projects.ts)의 성과와 일치해야 한다.
 */
export const highlights: Highlight[] = [
  { value: '1,100만+', label: '사용자', context: 'PASS 모바일 운전면허증' },
  { value: '26만', label: 'DAU', context: '포켓맵고 · 4일 만에 개발' },
  { value: '489%', label: '펀딩 달성률', context: 'seat.AI 킥스타터' },
  { value: '10년', label: '경력', context: 'Android 중심 · 풀스택까지' },
]
