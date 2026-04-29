---
name: portfolio-design-system
description: Coke.YS 포트폴리오 프로젝트의 디자인 시스템과 코드 컨벤션. React + Tailwind + Firebase 컴포넌트 작성, 스타일링, 디자인 토큰 적용 시 사용.
---

# Coke.YS Portfolio Design System

## 컬러 토큰
- 다크모드 기본, 라이트모드 토글 지원
- 다크: bg=#0a0a0a, accent=#4ade80, text=#e6e6e6
- 라이트: bg=#fafaf7, accent=#15803d, text=#1a1a1a
- CSS 변수로 정의, Tailwind에 매핑
- 액센트 그린은 모드별로 다름 (WCAG AA 5.4:1 대비 확보) — 같은 색 그대로 쓰지 말 것

## 폰트 사용 규칙
- **Press Start 2P (font-pixel)**: 이름/Hero 헤더, 임팩트 수치 강조에만
- **VT323 (font-terminal)**: 터미널/모노 영문 전반 — 셸 프롬프트(`$ whoami`), CTA 버튼, 메타 라벨
- **Pretendard (font-sans)**: 한글 본문 (필수, line-height 1.7)
- **JetBrains Mono (font-mono)**: 코드 블록

## 레이아웃 규칙
- **프로젝트 카드는 1열 스택 (그리드 X)** — plan 결정사항
- 모바일 반응형은 항상 점검

## 컴포넌트 패턴
- **버튼**: `[ button_label ]` 형태, sharp corner (border-radius: 0)
- **카드**: 1px 솔리드 보더, 호버 시 보더 그린
- **상태 뱃지**: `● live`, `● maintenance`, `● archived` (도트 + 라벨)
- **메트릭**: `key value` 쌍, 라벨은 muted, 값은 accent
- **태그**: 0.5px 보더, 작은 패딩
- **블록 커서**: `█` 깜빡임, animate-blink

## 임팩트 수치 강조
- "1,100만+ 가입자", "DAU 26만" 같은 핵심 수치는 **픽셀 폰트 + accent 그린**으로 강조
- 원칙: 컨셉(터미널/픽셀)이 강점을 가리지 말고 **강점을 강조하는 도구**가 되어야 함

## 접근성 / UX 가드레일
- `prefers-reduced-motion` 감지 → 타이핑/글리치/블링크 OFF (필수 대응)
- 모바일에서는 터미널 인터랙션 간소화 (긴 명령어 시뮬레이션 X)
- 컬러만으로 정보 전달 금지 — 도트/라벨/아이콘 병행
- 이력서 PDF 다운로드 버전은 일반 레이아웃 (인쇄/스크리닝용)

## 한글 작성 규칙
- **About / Experience / 블로그 본문**: "~했습니다" 종결 (자기소개 톤)
- **Skills / 메트릭 라벨 / 코드 코멘트 / 문서**: 직접적, 명사형/불릿 (간결)
- **CLAUDE.md, plan, README**: 직접적 + 굵은 헤더 + 불릿
- 영어 라벨(`whoami`, `cat highlights.txt`) + 한글 단위(`1,100만+`) 혼용 OK

## 금지사항
- 픽셀 폰트를 본문 한글에 적용 금지 (가독성 망가짐)
- 그라디언트, 드롭쉐도우, 글로우 효과 금지
- 다크/라이트 토큰 하드코딩 금지 (반드시 CSS 변수 사용)
- 액센트 그린을 모드 무관하게 같은 hex로 사용 금지 (대비 깨짐)