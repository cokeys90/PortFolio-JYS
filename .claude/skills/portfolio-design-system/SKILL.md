---
name: portfolio-design-system
description: Coke.YS 포트폴리오 프로젝트의 디자인 시스템과 코드 컨벤션. React + Tailwind + Firebase 컴포넌트 작성, 스타일링, 디자인 토큰 적용 시 사용.
---

# Coke.YS Portfolio Design System

> 본 문서는 **실제 구현(`src/index.css`, 컴포넌트)** 을 SSOT로 반영한다.
> Brittany Chiang 스타일 네이비/틸 미니멀 — 과거 "터미널+픽셀+그린" 컨셉은 폐기됨.

## 컬러 토큰

- 다크모드 기본, 라이트모드 토글 지원
- 라이트: bg=#fafaf7, surface=#ffffff, accent=#0d9488(틸), text=#0a192f
- 다크: bg=#0a192f(네이비), surface=#112240, accent=#64ffda(시안), text=#ccd6f6
- CSS 변수(`src/index.css`)로 정의, Tailwind `@theme`에 매핑 (`bg-accent`, `text-text-primary` 등)
- accent는 모드별로 다름 (WCAG AA 대비 확보) — 같은 hex 그대로 쓰지 말 것

## 폰트 사용 규칙

- **Pretendard (font-sans)**: 한글 본문 (기본)
- **JetBrains Mono (font-mono)**: 영문 라벨·메타·임팩트 수치·코드. 터미널 뉘앙스(`cat highlights` 등)도 mono로 표현
- 픽셀/터미널 폰트(Press Start 2P·VT323)는 **현재 로드하지 않음**. Blog/ProjectDetail placeholder에 `font-pixel`·`font-terminal` 클래스 잔재가 있으나 미사용 — 도입하려면 폰트 로드부터 선행할 것

## 레이아웃 규칙

- **분할 레이아웃**: 좌측 sticky 프로필 패널 + 우측 스크롤 콘텐츠 (lg 이상), 모바일은 세로 스택
- **프로젝트 카드는 1열 스택 (그리드 X)**
- 모바일 반응형은 항상 점검

## 컴포넌트 패턴

- **카드**: 1px 솔리드 보더(`border-border`), 호버 시 보더 accent(`hover:border-accent`), `rounded-card`
- **상태 뱃지**: `● live`, `● maintenance`, `● archived` (도트 + 라벨)
- **메트릭**: `값 라벨` 쌍 — 값은 accent(mono, 크게), 라벨은 muted(mono)
- **태그**: `rounded-tag`(pill), 작은 패딩, 카테고리별 색상(`tech.ts` 매핑)
- **외부 링크**: 지구본 아이콘으로 "외부 웹사이트 이동"을 표시 (hover 없이도 구분되게)
- **이동 화살표(→)**: 링크/네비게이션 가능한 항목에만 사용

## 임팩트 수치 강조

- "1,100만+", "DAU 26만" 같은 핵심 수치는 **mono 폰트 + accent**로 크게 강조
- 원칙: 미니멀 톤이 강점을 가리지 말고 **강점을 드러내는 도구**가 되어야 함

## 접근성 / UX 가드레일

- `prefers-reduced-motion` 감지 → 애니메이션/transition OFF (필수, `motion-reduce:` 유틸 병행)
- 컬러만으로 정보 전달 금지 — 도트/라벨/아이콘 병행
- 이력서 PDF/인쇄 버전은 라이트 모드 강제 (인쇄/스크리닝용)

## 한글 작성 규칙

- **About / Experience / 블로그 본문**: "~했습니다" 종결 (자기소개 톤)
- **Skills / 메트릭 라벨 / 코드 코멘트 / 문서**: 직접적, 명사형/불릿 (간결)
- **CLAUDE.md, plan, README**: 직접적 + 굵은 헤더 + 불릿
- 영어 라벨(`cat highlights`) + 한글 단위(`1,100만+`) 혼용 OK

## 금지사항

- 그라디언트, 드롭섀도우, 글로우 효과 금지
- 다크/라이트 토큰 하드코딩 금지 (반드시 CSS 변수/Tailwind 토큰 사용)
- accent를 모드 무관하게 같은 hex로 사용 금지 (대비 깨짐)
- 로드되지 않은 픽셀 폰트를 본문/UI에 쓰지 말 것
