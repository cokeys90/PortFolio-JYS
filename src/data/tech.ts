export type TechCategory =
  | 'language'
  | 'framework'
  | 'database'
  | 'infra'
  | 'tool'
  | 'concept'
  | 'default'

/**
 * 기술 이름 → 카테고리 매핑.
 * Tag 컴포넌트가 이걸 참조해서 색상을 자동으로 입힌다.
 */
const techCategories: Record<string, TechCategory> = {
  // Languages
  Java: 'language',
  Kotlin: 'language',
  Swift: 'language',
  JavaScript: 'language',
  TypeScript: 'language',
  Solidity: 'language',
  'C++': 'language',
  JNI: 'language',
  Go: 'language',
  Golang: 'language',

  // Frameworks / Platforms
  Android: 'framework',
  iOS: 'framework',
  'iOS Native': 'framework',
  'Android Native': 'framework',
  React: 'framework',
  'React Native': 'framework',
  Vue: 'framework',
  'Vue.js': 'framework',
  'Spring Boot': 'framework',
  Truffle: 'framework',
  JSP: 'framework',
  'Node.js': 'framework',
  Miaps: 'framework',

  // Database
  MySQL: 'database',
  PostgreSQL: 'database',
  MariaDB: 'database',
  MongoDB: 'database',
  Redis: 'database',

  // Infra / Storage / Protocols
  Git: 'infra',
  Bitbucket: 'infra',
  GitLab: 'infra',
  Vultr: 'infra',
  IPFS: 'infra',

  // Collaboration tools
  Figma: 'tool',
  Jira: 'tool',
  Confluence: 'tool',
  Slack: 'tool',
  Telegram: 'tool',

  // Concepts / Standards
  'Blockchain (DID)': 'concept',
  Web3: 'concept',
  IoT: 'concept',
  BLE: 'concept',
  Ethereum: 'concept',
  Klaytn: 'concept',
  Polygon: 'concept',
  ERC721: 'concept',
  ERC1155: 'concept',
  ERC2981: 'concept',
  RestAPI: 'concept',
}

export function getTechCategory(tech: string): TechCategory {
  return techCategories[tech] ?? 'default'
}
