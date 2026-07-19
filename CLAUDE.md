# CLAUDE.md

이 파일은 Claude Code가 이 저장소에서 작업할 때 따라야 하는 가이드라인입니다.

## 프로젝트 개요

**Coke.YS Portfolio** — React + Firebase 기반 개인 포트폴리오 + 블로그 + 방문자 분석 관리자 사이트.

상세 계획은 [`docs/protfolio-plan.md`](docs/protfolio-plan.md) 참고. 결정/미정 사항이 바뀌면 그 문서의 [10. 결정 사항] / [11. 미정 사항] 섹션을 동기화한다.

> 현재는 계획 단계 — 아직 React 프로젝트 셋업 전. 첫 셋업은 plan 문서의 Phase 1 / Day 1 체크리스트를 따른다.

> 일반 작업 규칙(언어/커밋/코딩 행동)은 글로벌 가이드라인(`~/.claude/dotclaude/`)을 따름. 본 문서는 **프로젝트 고유** 사항만 다룬다.

## 콘텐츠 SSOT (단일 진실 공급원)

포트폴리오/이력서에 실리는 **경력·프로젝트·성과 텍스트의 기준 원본**은 아래 두 파일이다.

- [`docs/reference/채용_작성본_정윤수.md`](docs/reference/채용_작성본_정윤수.md) — 이력서/자기소개서 최종 원고
- [`docs/reference/포트폴리오_참고자료_정윤수.md`](docs/reference/포트폴리오_참고자료_정윤수.md) — 마스터 참고자료(원본 데이터)

규칙:

- 콘텐츠(경력 기간, 성과 수치, 프로젝트 설명, 인적사항 등)가 바뀌면 **먼저 이 두 파일을 갱신**하고, 사이트 컴포넌트/데이터는 여기에 맞춘다. 반대 방향(코드→문서)으로 흘리지 않는다.
- 두 파일 사이에도 값이 일치해야 한다 (기간·수치·명칭). 수정 시 양쪽 정합성을 확인한다.
- 두 파일 안의 **체크리스트(불일치 항목)**는 외부 문서(이력서 docx, 웹 사이트)까지 통일이 필요한 TODO다. 해당 값 변경 시 함께 정리한다.

## 기술 스택 (요약)

- **프론트**: React 19 + Vite + TypeScript + Tailwind CSS
- **백엔드**: Firebase (Hosting, Auth, Firestore, Functions, Storage)
- **차트/지도**: Recharts, react-simple-maps
- **마크다운**: react-markdown + remark-gfm + rehype-highlight

## 디자인 원칙

- 다크 터미널 + 픽셀 액센트 컨셉, 다크 기본 + 라이트 토글
- 픽셀 폰트(Press Start 2P)는 헤더/임팩트 수치에만, 본문은 Pretendard
- 액센트 그린은 다크/라이트가 다름 (가독성/WCAG AA) — 한 색 그대로 쓰지 말 것
- `prefers-reduced-motion` 대응 필수

> **디자인 스킬 우선순위**: UI 작업 시 `portfolio-design-system` 스킬이 항상 우선이다. `frontend-design` 같은 일반 디자인 스킬과 충돌하면(예: "그라디언트로 대담하게") **이 프로젝트의 미니멀 터미널 컨셉이 이긴다.**

## 개인정보 처리 (필수 규칙)

- **원본 IP는 절대 저장하지 않는다.** `SHA-256(ip + salt)` 해시만 저장.
- IP geolocation은 Cloud Functions 서버사이드에서만 호출 — 클라이언트에 IP 노출 금지.
- 위치 정보는 국가/지역/도시까지만, 위경도 X.
- 첫 방문 시 고지 배너 1회 노출 (localStorage).

## Git 커밋 (프로젝트 특화)

> 포맷·type·atomic 등 일반 규칙은 글로벌 `git-commit.md` 참고.

### scope 예시

`hero`, `blog`, `admin`, `auth`, `visit-log`, `theme`, `firestore-rules`, `functions`, `deps`

### 시크릿 파일 (절대 커밋 금지)

`.env*`, Firebase 서비스 계정 키 (`*-firebase-adminsdk-*.json` 등).

### 브랜치

- 기본 브랜치는 `main`
- 단일 작업자라 `main` 직접 커밋 OK. 큰 단위 변경은 `feat/<scope>` / `fix/<scope>` 브랜치로 분리.

### 도메인 컨텍스트가 담긴 커밋 메시지 예시

```
feat(hero): 타이핑 애니메이션 + 블록 커서 추가

prefers-reduced-motion 일 때는 타이핑 비활성화.
```

```
fix(visit-log): IP 헤더 파싱 시 첫 IP만 추출하도록 수정

x-forwarded-for는 콤마 구분 리스트라 그대로 해시하면
프록시 체인이 바뀔 때마다 다른 ipHash가 생성됨.
```

## 작업 시 유의사항

- **한국 시각 기준**으로 날짜를 표기한다 (`Asia/Seoul`).
- 새 페이지/컴포넌트 추가 시 `docs/protfolio-plan.md`의 라우팅/디렉터리 구조와 일치하는지 확인.
- 보안 규칙(`firestore.rules`)이 바뀌면 emulator로 검증 후 배포.
- Firebase 무료 한도(Spark) 안에서 동작하도록 설계. 초과 위험 시 사용자에게 먼저 알린다.
