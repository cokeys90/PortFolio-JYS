import type { ReactNode } from 'react'
import { SectionTitle } from '../primitives/SectionTitle'

function Em({ children }: { children: ReactNode }) {
  return <span className="text-text-primary font-medium">{children}</span>
}

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
    >
      <SectionTitle id="about-heading">About</SectionTitle>

      <div className="space-y-4 leading-relaxed">
        <p>
          <Em>10년차 모바일 개발자</Em>입니다. <Em>Android (Java/Kotlin)</Em>와 <Em>iOS (Swift)</Em>
          를 중심으로, 최근에는 <Em>React Native</Em>와 풀스택 웹 개발까지 영역을 넓혀가며 작업하고
          있습니다.
        </p>
        <p>
          가장 자랑스러운 일은 <Em>PASS 모바일 운전면허증</Em>의 Android 라이브러리를 SKT/KT/LG 통신
          3사에 직접 배포한 것입니다. 현재 <Em>1,100만명 이상</Em>이 사용 중인 서비스의 핵심
          컴포넌트를 5년간 운영하며 패키징·문서화·샘플 앱까지 책임졌습니다.
        </p>
        <p>
          하드웨어와 소프트웨어가 만나는 지점을 좋아합니다. BLE 통신을 위한 <Em>JNI/C++</Em> 레이어,
          IoT 압력 센서 연동, 카메라+ML 기반 OCR 같은 작업들입니다. 2년간 NFT 마켓플레이스 개발에
          참여하며 <Em>Solidity Smart Contract</Em>(ERC721/1155/2981)와 멀티체인
          (Ethereum/Klaytn/Polygon) 환경도 다뤘습니다.
        </p>
        <p>
          단순 기능 구현보다 <Em>유지보수성·확장성</Em>을 고려한 설계를 지향합니다. 한 줄의 코드가
          1,100만명에게 닿는 책임을 알기에, 코드 품질과 라이브러리 선별에 욕심이 큽니다.
        </p>
      </div>
    </section>
  )
}
