/**
 * Skills "주기율표" 표시 데이터.
 * 항목/그룹은 skills.ts 의 skillGroups 에서 파생 — 기술 추가/삭제는 skills.ts 에서 한다.
 * 여기에는 표시용 원소 기호와 프로젝트 매칭 별칭만 둔다.
 */
import { skillGroups } from './skills'
import { projects, type Project } from './projects'

export type ToneLevel = 1 | 2 | 3 | 4 | 5 | 6

/** 그룹 → 칩 라벨 + 타일 톤 */
export const GROUP_META: Record<string, { chip: string; tone: ToneLevel }> = {
  Languages: { chip: '언어', tone: 1 },
  Frameworks: { chip: '프레임워크', tone: 2 },
  Database: { chip: '데이터베이스', tone: 3 },
  Specialties: { chip: '도메인 기술', tone: 4 },
  Infra: { chip: '인프라', tone: 5 },
  Tools: { chip: '협업 도구', tone: 6 },
}

/** 원소 기호 (2~3글자) */
const SYMBOL: Record<string, string> = {
  Java: 'Jv',
  Kotlin: 'Kt',
  Swift: 'Sw',
  TypeScript: 'Ts',
  JavaScript: 'Js',
  Solidity: 'Sl',
  'C++': 'C++',
  JNI: 'Jn',
  Golang: 'Go',
  Android: 'An',
  iOS: 'iO',
  'React Native': 'Rn',
  React: 'Re',
  'Vue.js': 'Vu',
  'Spring Boot': 'Sb',
  'Node.js': 'Nd',
  JSP: 'Jp',
  Truffle: 'Tf',
  Miaps: 'Mi',
  MySQL: 'My',
  PostgreSQL: 'Pg',
  MariaDB: 'Ma',
  MongoDB: 'Mg',
  Redis: 'Rd',
  Git: 'Gt',
  Bitbucket: 'Bb',
  GitLab: 'Gl',
  Vultr: 'Vl',
  IPFS: 'If',
  Figma: 'Fg',
  Slack: 'Sk',
  Jira: 'Ji',
  Confluence: 'Cf',
  Telegram: 'Tg',
  BLE: 'Bl',
  IoT: 'Io',
  Web3: 'W3',
  Ethereum: 'Et',
  Klaytn: 'Kl',
  Polygon: 'Py',
  'Blockchain (DID)': 'Dd',
}

/** projects.ts 의 tech 표기와 다른 경우의 별칭 */
const ALIASES: Record<string, string[]> = {
  'Vue.js': ['Vue', 'Vue.js', 'VueJS'],
  Golang: ['Golang', 'Go'],
  'Spring Boot': ['Spring Boot', 'Spring'],
  'Node.js': ['Node.js', 'Node', 'NodeJS'],
  'Blockchain (DID)': ['Blockchain (DID)', 'DID', 'Blockchain'],
  iOS: ['iOS', 'iOS Native', 'Swift'],
  Android: ['Android', 'Android Native'],
}

export interface Element {
  no: number
  name: string
  symbol: string
  group: string
  chip: string
  tone: ToneLevel
  projects: Project[]
}

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, '')

function projectsUsing(name: string): Project[] {
  const keys = (ALIASES[name] ?? [name]).map(norm)
  return projects.filter((p) => p.tech.some((t) => keys.includes(norm(t))))
}

let counter = 0
export const elements: Element[] = Object.keys(GROUP_META).flatMap((groupLabel) => {
  const group = skillGroups.find((g) => g.label === groupLabel)
  if (!group) return []
  const meta = GROUP_META[groupLabel]
  return group.items.map((name) => ({
    no: ++counter,
    name,
    symbol: SYMBOL[name] ?? name.slice(0, 2),
    group: groupLabel,
    chip: meta.chip,
    tone: meta.tone,
    projects: projectsUsing(name),
  }))
})

export const chips = Object.entries(GROUP_META).map(([group, meta]) => ({
  group,
  label: meta.chip,
  tone: meta.tone,
  count: elements.filter((e) => e.group === group).length,
}))
