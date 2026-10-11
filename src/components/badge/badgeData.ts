import { profile } from '../../data/profile'
import { experience } from '../../data/experience'

const since = [...experience].map((c) => c.startedAt).sort()[0] ?? '2015-08'

/** 사원증 앞/뒷면 표기 정보 — 모두 data/ 에서 파생 */
export const badgeInfo = {
  nameKo: profile.fullName,
  nameEn: profile.nameEn.toUpperCase(),
  handle: profile.name,
  role: 'Mobile Developer',
  focus: 'Android · iOS · RN · Web3',
  since: since.replace('-', '.'),
  idNo: `YS-${since.slice(0, 4)}`,
  /** 사원증 사진 — 3D 캐릭터 상반신 */
  photo: '/images/character-badge.webp',
  email: profile.email,
  github: profile.github.replace(/^https?:\/\//, ''),
}
