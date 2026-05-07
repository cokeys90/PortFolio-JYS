export interface Profile {
  name: string
  fullName: string
  title: string
  tagline: string
  email: string
  github: string
  linkedin?: string
  avatar: string
}

export const profile: Profile = {
  name: 'Coke.YS',
  fullName: '정윤수',
  title: 'Mobile Developer',
  tagline:
    '10년차 풀스택 개발자. Android·iOS·React Native·Web·Web3 환경에서 사용자 1,100만이 넘는 서비스부터 사내 R&D 도구까지 다양하게 만들어왔습니다.',
  email: 'cokeys90@gmail.com',
  github: 'https://github.com/cokeys90',
  avatar: '/avatar.jpg',
}
