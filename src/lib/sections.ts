/** 홈 섹션 id + 상단 pill 내비 라벨. 순서 = 화면 순서 */
export const NAV_SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
] as const

export const NAV_IDS = NAV_SECTIONS.map((s) => s.id)
