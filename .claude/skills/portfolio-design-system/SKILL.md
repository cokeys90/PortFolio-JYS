---
name: portfolio-design-system
description: Coke.YS 포트폴리오 프로젝트의 디자인 시스템과 코드 컨벤션. React + Tailwind + Firebase 컴포넌트 작성, 스타일링, 디자인 토큰 적용 시 사용.
---

# Coke.YS Portfolio Design System (v2 · Talking-Hero)

> 실제 구현(`src/index.css`, `src/components/{site,home,badge}`)을 SSOT로 반영한다.
> 이전 컨셉(Brittany Chiang 네이비/틸 분할 레이아웃)은 2026-10 리뉴얼로 폐기됨. 계획: `docs/redesign-plan.md`

## 컬러 토큰 (라이트 단일)

- bg `#f4efe6` · surface `#fbf8f2` · surface-2 `#efe8db` · ink `#121a2e` · ink-soft `#2b3550` · muted `#6b6a66` · line `#e1dacb` · wordmark `#e8e1d4` · on-ink `#f8f5ee`
- 주기율표 톤 `tone-1`(네이비) ~ `tone-6`(스톤). 1~3 위 텍스트는 `text-on-ink`, 4~6 위는 `text-ink`
- Tailwind 유틸로만 사용 (`bg-ink`, `text-muted`, `border-line` …). 레거시 토큰(`text-text-primary` 등)은 서브 페이지 호환용 별칭
- 캔버스(3D 텍스처)는 CSS 변수를 런타임에 읽어 그린다 (`paintBadge.ts`의 `token()`)

## 타이포

- Pretendard(`font-sans`): 한글 본문, 헤드라인
- Instrument Serif Italic(`font-serif italic`): 영문 액센트 단어만 (한글에 쓰지 말 것)
- JetBrains Mono(`font-mono`): 영문·숫자 전용 (번호, 연도, 기술 칩). 한글이 섞이면 `label-ko` 사용
- `label-ko`(index.css 유틸): 한글 소형 라벨 — Pretendard 12px/600, 자간 0.04em, uppercase 금지
- 헤드라인: `<DisplayHeading lead="Things I've" accent="built." />` — 굵은 산세리프 + 이탤릭 액센트
- 섹션 라벨: `<SectionLabel index="03">Selected work</SectionLabel>` → `03 —— SELECTED WORK`

## 레이아웃

- 전체 폭 싱글 페이지, 컨테이너 `max-w-[1440px] px-4 md:px-8`, 섹션 `py-20 md:py-28`
- 고정 헤더: 좌상단 `YS` 로고, 우상단 알약형 내비(활성 섹션 pill = `bg-ink`, `layoutId` 이동). 모바일은 메뉴 버튼
- 섹션 순서: Hero → About(사원증) → Skills(주기율표) → Work(가로 아코디언 + 전체 목록) → Learning → Experience(중앙 타임라인) → Achievements(가로 스크롤) → Contact
- 새 섹션은 `src/lib/sections.ts`(내비)와 `pages/Home.tsx`에 함께 등록

## 컴포넌트 패턴

- 카드: `rounded-card border border-line bg-surface` (radius 20px)
- 버튼/칩: `rounded-full` 알약형. 주 버튼 `bg-ink text-on-ink`, 보조 `border border-ink/80`
- 리스트 행 hover: 배경 `bg-ink` 반전 + 텍스트 `text-on-ink` (Learning, More projects)
- 임팩트 수치: 굵은 산세리프 대형 + `CountUp` (숫자+접미사 문자열 그대로 전달)
- 진입 모션: `<Reveal>` (아래에서 떠오름, once)

## 모션 / 접근성 가드레일

- `prefers-reduced-motion`: lenis 미생성, `Reveal` 정적, 사원증 2D(`StaticBadge`), Achievements 일반 가로 스크롤, CountUp 즉시 최종값
- 3D 사원증(`LanyardScene`)은 lazy 로드 + 화면 밖이면 `frameloop="never"`. 물리는 자체 verlet — rapier 등 wasm 물리 엔진 금지(Spark 전송량)
- 히어로 영상은 `lib/heroMedia.ts`에서 관리. 화면 안일 때만 로드, Save-Data/reduced-motion 이면 poster
- 컬러만으로 정보 전달 금지, 인터랙티브 요소는 키보드 포커스 가능(`:focus-visible` 아웃라인)

## 데이터 규칙

- 콘텐츠 텍스트는 `src/data/*`에만, SSOT는 `docs/reference/` 두 파일 (CLAUDE.md 참고)
- 주기율표 항목은 `skills.ts`의 `skillGroups`에서 파생 — 기호/별칭만 `periodic.ts`
- 성과 카드는 `achievements.ts` (highlights + projects 수치)

## 한글 작성 규칙

- About / Experience 본문: "~했습니다" 종결
- 라벨 / 칩 / 메타: 짧은 명사형, 영문 라벨 허용

## 금지사항

- 토큰 외 색 하드코딩 (3D 금속 재질 `METAL` 같은 재질 상수 제외)
- 그라디언트·글로우·드롭섀도우
- 한글에 이탤릭 세리프 적용
- 다크 모드 토큰 재도입 (2차 과제로 별도 결정 전까지)
