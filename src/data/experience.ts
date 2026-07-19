export interface Company {
  id: string
  name: string
  fullName: string
  department: string
  role: string
  startedAt: string
  endedAt: string | null
  yearsOfService: string
  /** 표시용 기간 길이 (예: '9개월', '1년 1개월') */
  duration: string
  summary: string
  location: string
  tech: string[]
  note?: string
}

export const experience: Company[] = [
  {
    id: 'hanspharma',
    name: '한스파마',
    fullName: '㈜한스파마',
    department: '헬스케어서비스팀',
    role: '과장 · 팀장',
    startedAt: '2025-06',
    endedAt: '2026-03',
    yearsOfService: '1년차',
    duration: '10개월',
    summary:
      '국내 DTC 유전자 검사 기반 탈모 종합 관리 플랫폼 모코드(MOCODE)의 모바일 앱을 React Native로 개발 및 운영. 네이티브 브릿지 통신, 유전자 검사 결과 시각화, 맞춤형 관리 플로우 구현.',
    location: '서울',
    tech: ['React Native', 'TypeScript', 'iOS Native', 'Android Native'],
  },
  {
    id: 'tuneit',
    name: '튠잇',
    fullName: '㈜튠잇',
    department: '연구소',
    role: '책임연구원',
    startedAt: '2024-01',
    endedAt: '2025-02',
    yearsOfService: '2년차',
    duration: '1년 2개월',
    summary:
      '디지털 차키 앱 "아차키" Android 단독 유지보수/고도화. Java→Kotlin 마이그레이션, BLE 통신을 위한 JNI/C++ 인터페이스 수정, 구글 정책 대응. B2B 및 플랫폼 관리 웹(React)도 함께 담당.',
    location: '경기',
    tech: ['Android', 'Kotlin', 'Java', 'JNI', 'C++', 'BLE', 'React'],
    note: '현대자동차 사내벤처 출신 차량 IT 전문 기업',
  },
  {
    id: 'arabit',
    name: '아라빛',
    fullName: '아라빛 ㈜',
    department: '개발팀',
    role: '책임연구원 · 팀장',
    startedAt: '2015-08',
    endedAt: '2023-10',
    yearsOfService: '8년차',
    duration: '8년 3개월',
    summary:
      '내부/외부 프로젝트 풀스택 분석/설계/개발. PASS 모바일 운전면허증 라이브러리(이통3사 배포, 1,100만+ 사용자), NFT 마켓플레이스 CanvasN/코러스N, IoT 방석 seat.AI, 포켓맵고 등 다양한 도메인의 프로젝트를 리드.',
    location: '서울',
    tech: [
      'Android',
      'iOS',
      'Vue',
      'JSP',
      'Spring Boot',
      'Golang',
      'Solidity',
      'BLE',
      'IoT',
      'Web3',
    ],
  },
]
