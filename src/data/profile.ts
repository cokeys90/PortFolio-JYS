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
  title: '1,100만이 쓰는 서비스를 만드는 개발자',
  tagline:
    '10년차 모바일 개발자. Android(Java/Kotlin) 네이티브를 축으로 iOS·React Native·풀스택 웹·Web3까지, 필요에 따라 영역을 넓혀왔습니다.',
  email: 'cokeys90@gmail.com',
  github: 'https://github.com/cokeys90',
  avatar: '/avatar.jpg',
}
