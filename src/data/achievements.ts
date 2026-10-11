/**
 * Achievements 섹션 카드.
 * 앞 4개는 highlights.ts, 나머지는 projects.ts 의 achievements 문장에서 옮긴 수치.
 * 수치 변경은 docs/reference SSOT → projects.ts/highlights.ts → 여기 순서로.
 */
import { highlights } from './highlights'

export interface Achievement {
  value: string
  label: string
  context: string
}

export const achievements: Achievement[] = [
  ...highlights.map((h) => ({ value: h.value, label: h.label, context: h.context })),
  { value: '109만', label: '다운로드', context: '포켓맵고 · 2017년 1월 신규 설치' },
  { value: '1위', label: '플레이스토어', context: '포켓맵고 · 커뮤니케이션 부문 (카카오톡 제침)' },
  { value: '5만대', label: '판매량', context: '아차키 · 국내 누적 판매' },
  { value: '12개국', label: '검증 국가', context: '아차키 · 20여 개 제조사·딜러사 검증' },
]
