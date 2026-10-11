export interface Profile {
  name: string
  fullName: string
  /** 영문 이름 (Jeong Yunsu 표기 쓰지 않음) */
  nameEn: string
  /** 영어 닉네임 (LIVIT 사내 호칭) */
  nickname: string
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
  nameEn: 'Yoonsoo Jung',
  nickname: 'Kevin',
  title: '1,100만 명이 쓰는 서비스를 만든 개발자',
  tagline:
    '10년 차 모바일 개발자입니다. Android(Java·Kotlin) 네이티브를 중심으로, 필요할 때마다 iOS·React Native·웹·Web3까지 맡아 왔습니다.',
  email: 'cokeys90@gmail.com',
  github: 'https://github.com/cokeys90',
  avatar: '/avatar.jpg',
}
