export interface SkillCategory {
  name: string
  items: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Mobile',
    items: ['Android (Java, Kotlin)', 'iOS (Swift)', 'React Native'],
  },
  {
    name: 'Frontend',
    items: ['React', 'Vue.js', 'VanillaJS', 'JSP', 'TypeScript'],
  },
  {
    name: 'Backend',
    items: ['Java (Spring Boot)', 'Golang (Fiber, Viper)', 'Node.js'],
  },
  {
    name: 'Database',
    items: ['MySQL', 'PostgreSQL', 'MariaDB', 'MongoDB', 'Redis'],
  },
  {
    name: 'Blockchain / Web3',
    items: ['Solidity', 'Truffle', 'IPFS', 'ERC721 / 1155 / 2981', 'Ethereum', 'Klaytn', 'Polygon'],
  },
  {
    name: 'Infra / Tools',
    items: ['Git', 'Bitbucket', 'GitLab', 'Vultr', 'Figma', 'Jira', 'Confluence', 'Slack'],
  },
]

/**
 * 사이드 패널의 Tech Stack 영역에 노출할 큐레이션 (개별 chip 단위, 카테고리별).
 * 항목명은 src/data/tech.ts의 카테고리 매핑과 동일해야 색상이 자동 적용됨.
 */
export interface SkillGroup {
  label: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    items: [
      'Java',
      'Kotlin',
      'Swift',
      'TypeScript',
      'JavaScript',
      'Solidity',
      'C++',
      'JNI',
      'Golang',
    ],
  },
  {
    label: 'Frameworks',
    items: [
      'Android',
      'iOS',
      'React Native',
      'React',
      'Vue.js',
      'Spring Boot',
      'Node.js',
      'JSP',
      'Truffle',
      'Miaps',
    ],
  },
  {
    label: 'Database',
    items: ['MySQL', 'PostgreSQL', 'MariaDB', 'MongoDB', 'Redis'],
  },
  {
    label: 'Infra',
    items: ['Git', 'Bitbucket', 'GitLab', 'Vultr', 'IPFS'],
  },
  {
    label: 'Tools',
    items: ['Figma', 'Slack', 'Jira', 'Confluence', 'Telegram'],
  },
  {
    label: 'Specialties',
    items: ['BLE', 'IoT', 'Web3', 'Ethereum', 'Klaytn', 'Polygon', 'Blockchain (DID)'],
  },
]

export const strengthKeywords: string[] = [
  '풀스택 개발 지향 (모바일 + 프론트 + 백엔드 + Web3)',
  'Android Library 패키징/배포 약 5년',
  '하드웨어/센서 연계 (BLE, IoT, JNI/C++, 카메라+ML/OCR)',
  '블록체인 Smart Contract 작성 약 2년',
  '라이브러리/SDK 비교·선별·적용',
]
