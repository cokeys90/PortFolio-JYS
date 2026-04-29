# CLAUDE.md

이 파일은 Claude Code가 이 저장소에서 작업할 때 따라야 하는 가이드라인입니다.

## 프로젝트 개요

**Coke.YS Portfolio** — React + Firebase 기반 개인 포트폴리오 + 블로그 + 방문자 분석 관리자 사이트.

상세 계획은 [`docs/protfolio-plan.md`](docs/protfolio-plan.md) 참고. 결정/미정 사항이 바뀌면 그 문서의 [10. 결정 사항] / [11. 미정 사항] 섹션을 동기화한다.

> 현재는 계획 단계 — 아직 React 프로젝트 셋업 전. 첫 셋업은 plan 문서의 Phase 1 / Day 1 체크리스트를 따른다.

## 대화 규칙

- **한글로 대화한다.** 코드/식별자/공식 용어(React, Firestore 등)는 영어 그대로 쓰되, 설명·요약·커밋 메시지·PR 본문은 한글이 기본.
- 코드 안의 식별자(변수, 함수, 클래스명)는 영어로 작성한다 — 가독성과 생태계 컨벤션 일치 때문.
- 주석은 의도/배경(WHY)을 한글로 짧게. WHAT은 적지 않는다.

## 기술 스택 (요약)

- **프론트**: React 19 + Vite + TypeScript + Tailwind CSS
- **백엔드**: Firebase (Hosting, Auth, Firestore, Functions, Storage)
- **이메일**: Resend
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

## Git 커밋 규칙

### 커밋 메시지 포맷 (Conventional Commits)

```
<type>(<scope>): <subject>

<body>

<footer>
```

- **subject**: 한글, 50자 이내, 마침표 X, 명령형/현재형 ("추가한다" X → "추가" O)
- **body**: 필요 시 한글, WHY 위주. 72자에서 줄바꿈
- **footer**: BREAKING CHANGE, 이슈 참조 등

### type 목록

| type | 용도 |
|---|---|
| `feat` | 새 기능 추가 |
| `fix` | 버그 수정 |
| `docs` | 문서만 변경 (README, plan, CLAUDE.md 등) |
| `style` | 포맷팅, 세미콜론 등 동작에 영향 없는 변경 |
| `refactor` | 동작 변경 없는 리팩터링 |
| `perf` | 성능 개선 |
| `test` | 테스트 추가/수정 |
| `build` | 빌드 시스템, 의존성 변경 (Vite, Tailwind config 등) |
| `ci` | GitHub Actions 등 CI 설정 |
| `chore` | 그 외 (gitignore, 설정 파일 등) |

### scope 예시

`hero`, `blog`, `admin`, `auth`, `visit-log`, `contact`, `theme`, `firestore-rules`, `functions`, `deps`

### 예시

```
feat(hero): 타이핑 애니메이션 + 블록 커서 추가

prefers-reduced-motion 일 때는 타이핑 비활성화.
```

```
fix(visit-log): IP 헤더 파싱 시 첫 IP만 추출하도록 수정

x-forwarded-for는 콤마 구분 리스트라 그대로 해시하면
프록시 체인이 바뀔 때마다 다른 ipHash가 생성됨.
```

```
docs: 포트폴리오 계획서 결정 사항 동기화
```

### 규칙

- **사용자가 명시적으로 요청할 때만 커밋한다.** 임의로 커밋하지 않는다.
- 한 커밋에 한 가지 변경만. 무관한 변경은 분리.
- `git add -A` / `git add .` 보다 파일을 명시해서 add 한다 (실수로 secret 포함 방지).
- `--no-verify`, `--amend`, `reset --hard`, `push --force` 는 사용자가 명시 요청할 때만.
- `.env*`, Firebase 서비스 계정 키, Resend API 키는 절대 커밋하지 않는다.

### 브랜치

- 기본 브랜치는 `main`
- 단일 작업자 프로젝트라 보통 `main`에 직접 커밋 OK. 큰 단위 변경은 `feat/<scope>` / `fix/<scope>` 브랜치로 분리.

## 작업 시 유의사항

- **한국 시각 기준**으로 날짜를 표기한다 (`Asia/Seoul`).
- 새 페이지/컴포넌트 추가 시 `docs/protfolio-plan.md`의 라우팅/디렉터리 구조와 일치하는지 확인.
- 보안 규칙(`firestore.rules`)이 바뀌면 emulator로 검증 후 배포.
- Firebase 무료 한도(Spark) 안에서 동작하도록 설계. 초과 위험 시 사용자에게 먼저 알린다.