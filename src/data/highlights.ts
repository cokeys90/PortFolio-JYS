export interface Highlight {
  /** 임팩트 수치 (accent 강조) */
  value: string
  /** 짧은 영문 라벨 (mono, muted) */
  label: string
  /** 어떤 성과인지 한 줄 맥락 */
  context: string
}

/**
 * 첫 화면 3초 각인용 핵심 지표. 상단 임팩트 스트립에 노출.
 * 값은 대표 프로젝트(projects.ts)의 성과와 일치해야 한다.
 */
export const highlights: Highlight[] = [
  { value: '1,100만+', label: 'users', context: 'PASS 모바일 운전면허증' },
  { value: '26만', label: 'DAU', context: '포켓맵고 · 4일 만에 개발' },
  { value: '459%', label: 'funded', context: 'seat.AI 킥스타터' },
  { value: '10년', label: 'career', context: 'Android 축 · 풀스택 확장' },
]
