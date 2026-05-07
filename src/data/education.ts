export interface SchoolEntry {
  name: string
  major: string
  period: string
  status: string
  daySession?: string
}

export interface Certification {
  name: string
  issuer: string
  acquiredAt: string
}

export const schools: SchoolEntry[] = [
  {
    name: '동국대학교 (경주)',
    major: '컴퓨터공학과',
    period: '4년제 졸업',
    status: '졸업',
    daySession: '주간',
  },
  {
    name: '여수정보과학고등학교',
    major: '문과계열',
    period: '2006.03 ~ 2009.02',
    status: '졸업',
  },
]

export const certifications: Certification[] = [
  {
    name: '교원자격증 2급',
    issuer: '동국대학교총장 / 교육부',
    acquiredAt: '2015.02 (최종합격)',
  },
]
