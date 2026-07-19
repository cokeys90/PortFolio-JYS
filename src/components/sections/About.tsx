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
          완벽을 밀어붙이기보다 <Em>서비스에 맞는 판단</Em>을 합니다. 5만 대가 운영 중이던 아차키의
          Java→Kotlin 마이그레이션에서는 100% 전환 대신 안정성을 위해 <Em>60% 선에서 무중단</Em>으로
          멈췄습니다. 이런 결정을 내리는 것도 개발자의 실력이라고 생각합니다.
        </p>
        <p>
          단순 기능 구현보다 <Em>유지보수성·확장성</Em>을 고려한 설계를 지향합니다. 한 줄의 코드가
          1,100만명에게 닿는 책임을 알기에, 코드 품질과 라이브러리 선별에 욕심이 큽니다.
        </p>

        <div className="mt-6 border-l-2 border-accent pl-4">
          <p className="font-mono text-xs uppercase tracking-wider text-text-muted">
            AI in practice
          </p>
          <p className="mt-2">
            <Em>AI를 실무에 녹이고 팀에 확산</Em>합니다. <Em>Claude Code</Em>를
            분석·설계·구현·테스트 전 주기에 활용하고, 한스파마 개발팀에 도입을 주도했습니다. 나아가
            전 직원 대상으로 ChatGPT·Gemini·NotebookLM·AI Studio 활용 교육을 직접 진행했습니다.
          </p>
        </div>
      </div>
    </section>
  )
}
