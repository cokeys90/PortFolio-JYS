# Coke.YS Portfolio — 리뉴얼 계획서 (v2: Talking-Hero 컨셉)

> 작성: 2026-10-10 (Asia/Seoul) · 상태: **진행 중** (결정 §9)
> 기존 계획서: [`protfolio-plan.md`](./protfolio-plan.md) — 이 문서가 확정되면 그 문서 §3 디자인 시스템, §6 라우팅, §10 결정 사항을 갱신한다.

---

## 1. 배경 / 목표

- 인스타그램 릴스 [`sl_tech_journal` / Dd_rIaZC1ay](https://www.instagram.com/reels/Dd_rIaZC1ay/)의 포트폴리오를 **구조·인터랙션 그대로** 재현하고, 내용은 정윤수 데이터로 채운다.
- 현재 사이트(Brittany Chiang 스타일 좌측 sticky + 우측 스크롤, 네이비/틸)를 **전체 폭 싱글 페이지 스크롤**로 교체한다.
- 데이터 레이어(`src/data/*.ts`)는 그대로 재사용, **레이아웃·섹션 컴포넌트·디자인 토큰**을 새로 만든다.

## 2. 레퍼런스

| 항목                | 내용                                                                                                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 작성자              | Lohitha Damisetti — Instagram [@sl_tech_journal](https://www.instagram.com/sl_tech_journal/), GitHub [@lohithadamisetti123](https://github.com/lohithadamisetti123) |
| 릴스 속 사이트 소스 | **비공개.** 공개된 저장소 중 동일한 디자인 없음                                                                                                                     |

**결론**: 원본 코드가 없으므로 릴스 영상 프레임 분석을 바탕으로 **직접 구현**한다.

## 3. 레퍼런스 분석 (34초 영상, 프레임별)

| 시점    | 섹션               | 레이아웃 / 연출                                                                                                                                                                                                                                             |
| ------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0~7초   | **Hero**           | 배경에 이름 초대형 워드마크(연한 회색). 중앙에 3D 캐릭터 전신 영상(손짓하며 자기소개). 좌하단 소형 라벨 + "Full Stack Developer" 초대형 헤드라인 + 한 줄 설명. 우측 "Explore work →" 버튼 + Let's talk / Resume 링크. 좌상단 이니셜 로고 + 이름             |
| 7~11초  | **About**          | 스크롤하면 위에서 **랜야드 끈에 매달린 사원증**이 내려옴(진한 끈 + 금속 클립). 좌측 "Hi, I'm _Lohitha._" + 소개 2문단 + Resume / GitHub / LinkedIn 버튼. 우측 인적사항 키-값 표 + 이탤릭 인용구                                                             |
| 11~19초 | **Skills**         | "The _periodic table_ of my stack." 원소 칸(번호 / 2글자 기호 / 이름)을 그리드로 배치. 상단 카테고리 칩(Languages / Frontend / Backend / Databases / Tools / Core). 칩 선택 시 **해당 칸만 남고 나머지는 흐려짐**. 칸 hover 시 우측에 로고 + 이름 상세 패널 |
| 19~23초 | **Work**           | "Things I've _built._" **가로 아코디언**: 펼친 카드 1장(번호 / 태그 / 제목 / 설명 / 불릿 / 기술 칩 / View on GitHub / 시각 자료) + 나머지는 **세로 글씨 탭**으로 접힘                                                                                       |
| 23~25초 | **Certifications** | 좌측 "Always _learning._" / 우측 자격증 리스트, hover한 줄이 진한 배경으로 반전 + 화살표                                                                                                                                                                    |
| 25~28초 | **Experience**     | 중앙 세로선 타임라인, 연도(2023 / 2026)를 초대형 숫자로, 카드를 좌우 번갈아 배치                                                                                                                                                                            |
| 28~31초 | **Achievements**   | "Proud _moments._" **가로로 흐르는 카드**(로고 + 플랫폼명 + 설명 + 초대형 숫자 `450+`), 숫자 카운트업                                                                                                                                                       |
| 31~34초 | (광고)             | "BUILD YOUR OWN TALKING-VIDEO PORTFOLIO" — ① 3D 캐릭터 이미지 생성 → ② 소개 영상 생성 → ③ AI 코딩 도구로 사이트 제작                                                                                                                                        |

**공통 요소**

- 크림/웜 오프화이트 배경 + 짙은 네이비 포인트 (캡션의 "흑백"은 실제 화면과 다름)
- 헤드라인: 굵은 산세리프 + **이탤릭 세리프 액센트 단어** 조합
- 섹션 라벨: `NN — SECTION` 형태의 자간 넓은 소형 대문자
- 우상단 **알약형 내비게이션**, 현재 섹션 pill이 네이비로 채워짐
- 좌하단 고정 원형 버튼(테마/메뉴), 우상단 원형 버튼

## 4. 섹션 매핑 (레퍼런스 → 정윤수 데이터)

| #   | 섹션             | 데이터 소스                                                                        | 구현                                                                             | 난이도                |
| --- | ---------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | --------------------- |
| 0   | Nav (pill)       | 섹션 id 목록                                                                       | `useActiveSection` 훅 재사용 + framer-motion `layoutId` pill                     | 하                    |
| 1   | Hero             | `profile.ts` + 히어로 영상                                                         | 워드마크 + `<video muted autoPlay loop playsInline>` + poster                    | 중 (영상 제작이 핵심) |
| 2   | About + 사원증   | `profile.ts`, `bio.ts`, `증명사진_정윤수.jpg`                                      | 랜야드 낙하(스크롤 연동) + 스프링 흔들림 + 클릭하면 앞뒤 뒤집힘                  | **상**                |
| 3   | Skills 주기율표  | `skills.ts` → `skillGroups` (6그룹 · 41개)                                         | CSS Grid + 칩 필터(흐림 처리) + hover/focus 상세 패널, 로고는 simple-icons(CC0)  | 중                    |
| 4   | Work 아코디언    | `projects.ts`의 `featured` 4개 (PASS 운전면허증 / 포켓맵고 / seat.AI / 아차키) + α | 가로 flex 아코디언 (`flex-grow` 전환), 모바일에서는 세로 스택                    | 중                    |
| 5   | Certifications   | `education.ts`의 `certifications` (현재 **1건**)                                   | 리스트 hover 반전                                                                | 하 → **§9 결정 필요** |
| 6   | Experience       | `experience.ts` (3사, 2015~2026) + `schools`                                       | 중앙선 타임라인, 연도 초대형 숫자                                                | 중                    |
| 7   | Achievements     | `highlights.ts` (1,100만+ / 26만 DAU / 489% / 10년)                                | 섹션을 화면에 고정하고 세로 스크롤을 가로 이동(`translateX`)으로 변환 + 카운트업 | 중                    |
| 8   | Contact / Footer | `profile.ts` (email, GitHub)                                                       | 링크만 노출 (기존 결정: 문의 폼 제외)                                            | 하                    |

> **SSOT 규칙**: 주기율표 상세 설명, 사원증 문구처럼 **새로 생기는 콘텐츠 텍스트**는 먼저 `docs/reference/` 두 파일에 추가한 뒤 `src/data`에 반영한다.

## 5. 디자인 시스템 v2 (초안)

**컬러 토큰** (초기값, 구현하면서 조정 · WCAG AA 검증 필수)

| 토큰         | 라이트(기본) | 용도                                                      |
| ------------ | ------------ | --------------------------------------------------------- |
| `--bg`       | `#f4efe6`    | 크림 배경 (**히어로 영상 배경색과 정확히 일치**시켜야 함) |
| `--surface`  | `#fbf8f2`    | 카드                                                      |
| `--ink`      | `#121a2e`    | 본문 텍스트, 진한 pill·버튼                               |
| `--muted`    | `#6b6a66`    | 보조 텍스트                                               |
| `--line`     | `#e3ddd1`    | 1px 보더                                                  |
| `--wordmark` | `#e9e3d8`    | 히어로 초대형 이름                                        |

**타이포**

- 한글 본문/헤드라인: Pretendard (유지)
- 영문 액센트(이탤릭 세리프): **Instrument Serif Italic** (`@fontsource/instrument-serif`) — 신규
- 라벨/수치/코드: JetBrains Mono (유지)
- 헤드라인 패턴: `<strong>Things I've</strong> <em class="font-serif italic">built.</em>`

**유지할 원칙**: 1px 보더 카드, `prefers-reduced-motion` 대응, 색상만으로 정보 전달 금지
**바뀌는 원칙**: 분할 레이아웃 → 전체 폭, 다크 기본 → 라이트(크림) 기본

**갱신 대상 문서** (컨셉 확정 후)

- `CLAUDE.md` › 디자인 원칙
- `.claude/skills/portfolio-design-system/SKILL.md` 전체
- `protfolio-plan.md` §3, §10

## 6. 기술 추가

| 패키지                                                                    | 용도                                               | 비고                        |
| ------------------------------------------------------------------------- | -------------------------------------------------- | --------------------------- |
| `motion` (framer-motion)                                                  | 스크롤 연동, 레이아웃 애니메이션, 스프링, 카운트업 | 레퍼런스 작성자와 같은 선택 |
| `lenis`                                                                   | 부드러운 스크롤                                    | reduced-motion일 때 비활성  |
| `@fontsource/instrument-serif`                                            | 액센트 세리프                                      |                             |
| `simple-icons`                                                            | 주기율표 상세 패널 로고                            | CC0                         |
| `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier` | 3D 물리 랜야드 사원증                              | About 진입 시 lazy 로드     |

## 7. 히어로 영상 제작 파이프라인

1. **캐릭터 이미지**: `증명사진_정윤수.jpg`로 3D 애니메이션 스타일 전신 캐릭터 생성. 정면, 전신, 단색 배경(`--bg`와 같은 hex)
2. **소개 영상**: 이미지 → 영상(image-to-video) 생성. 레퍼런스 프롬프트 구조를 따른다:
   - _Character consistency_: 얼굴·헤어·의상·체형을 바꾸지 말 것
   - _Pose & position_: 프레임 중앙, 머리부터 발끝까지, 기본 포즈 유지
   - _Performance_: 카메라를 보고 자기소개하는 듯한 자연스러운 손짓, 작은 움직임만
   - 배경: 단색 `--bg`, 카메라 고정
3. **후처리**: 5~8초 루프, 720p H.264, 무음(음성 없음), **목표 2MB 이하**, poster용 첫 프레임 webp 추출
4. **배포**: `public/videos/hero.mp4` + `hero-poster.webp`

**주의**

- 투명 배경 대신 **배경색을 맞추는 방식** (레퍼런스와 동일). 브라우저마다 색 처리가 달라 미세한 경계가 생길 수 있음 → 영상 가장자리에 `--bg` 페이드 마스크로 보정
- 다크 모드를 유지하면 다크 배경색 버전 영상이 따로 필요 → §9 결정
- `prefers-reduced-motion`, 데이터 절약 모드(`Save-Data`)일 때는 poster 이미지만 표시
- 어떤 AI 이미지/영상 툴을 쓸지는 결정 대기 (Hedra, Kling, Veo, Runway 등 — 툴과 요금은 수시로 바뀌므로 착수 시점에 확인)

## 8. Firebase Spark 한도 영향 ⚠️

- Spark Hosting 전송량은 **하루 약 360MB** (착수 전 최신 한도 재확인 필요)
- 영상 2MB 기준으로 첫 방문 **약 150~170회/일**이면 영상만으로 한도 소진 (재방문은 캐시로 해결)
- 대응:
  - `firebase.json`에서 `/videos/**`에 `Cache-Control: public, max-age=31536000, immutable`
  - `preload="none"`과 poster를 먼저 표시하고, 화면에 보일 때 영상 로드
  - 한도에 가까워지면 영상만 외부 CDN이나 동영상 호스팅으로 분리 (Blaze 업그레이드는 하지 않음 — 기존 결정)

## 9. 결정 사항 (2026-10-10 확정)

- ✅ **다크 모드**: 라이트(크림) 단일. 다크는 2차 과제 → 히어로 영상 1벌
- ✅ **헤드라인**: 영문 헤드라인 + 이탤릭 세리프 액센트, 본문은 한글
- ✅ **사원증**: **3D 물리 랜야드** (`three` + `@react-three/fiber` + `@react-three/drei` + `@react-three/rapier`)
  - 3D 캔버스는 About 섹션이 화면에 들어올 때만 지연 로드(`React.lazy`) → 초기 번들에서 분리
  - reduced-motion / WebGL 미지원 시 2D 정적 카드로 대체
- ✅ **Certifications**: 학력 + 자격으로 확장한 "Always _learning._" 섹션
- ⏳ **리빗(현 재직) 경력 반영** — SSOT 문서에 먼저 추가 필요 (내용 확인 후)
- ⏳ **AI 캐릭터 영상 툴 선택** — 영상 제작 단계에서 결정. 그 전까지는 증명사진 poster로 대체
- ✅ **브랜치**: `feat/redesign`에서 작업, `main` 배포 상태 유지

## 10. 디렉터리 구조 (제안)

```
src/
  components/
    layout/      SiteLayout.tsx, PillNav.tsx, FloatingButtons.tsx
    sections/    Hero.tsx, About.tsx, Skills.tsx, Work.tsx,
                 Certifications.tsx, Experience.tsx, Achievements.tsx, Contact.tsx
    widgets/     IdBadge.tsx (랜야드+플립), PeriodicTile.tsx, PeriodicTable.tsx,
                 WorkAccordion.tsx, CountUp.tsx, SectionHeading.tsx
  hooks/         useActiveSection.ts(재사용), useLenis.ts, useReducedMotion.ts
  data/          기존 유지 + periodic.ts(기호/번호/상세, skills.ts 파생)
public/videos/   hero.mp4, hero-poster.webp
```

- 라우트: `/`(새 홈), `/projects/:slug`, `/blog`, `/blog/:slug`, `/about` 유지. 서브 페이지도 새 레이아웃 톤으로 맞춤
- 기존 `SidePanel`, `Spotlight`, `Highlights` 등은 홈에서 제거 (파일 삭제는 리뉴얼 완료 후)

## 11. 단계별 진행

### Phase 0 — 결정 + 소스 준비

- [x] §9 결정 사항 확정
- [ ] 새 콘텐츠 텍스트(주기율표 상세, 사원증 문구, 섹션 헤드라인)를 SSOT 문서에 추가
- [x] `feat/redesign` 브랜치 생성

### Phase 1 — 기반

- [x] 디자인 토큰 v2 (`src/index.css`), Instrument Serif 로드
- [x] `motion`, `lenis` 설치 + reduced-motion 처리
- [x] `SiteLayout` + `PillNav`(활성 섹션 표시) + 섹션 라벨/헤딩 컴포넌트
- [x] 히어로 정적 버전 (워드마크 + 헤드라인 + CTA, 영상 자리에 증명사진 임시)

### Phase 2 — 섹션 구현

- [x] Skills 주기율표 (필터 칩 + 흐림 + 상세 패널, 키보드 포커스 지원)
- [x] Work 가로 아코디언 (모바일 세로)
- [x] Experience 타임라인
- [x] Achievements 가로 스크롤 + 카운트업
- [x] Certifications (결정안대로) / Contact

### Phase 3 — 시그니처 인터랙션

- [x] 사원증: 랜야드 낙하 → 흔들림 → 드래그 / 클릭으로 뒤집기 (뒷면: 모노그램 + 연락처). 2D 폴백은 Enter/Space 로 뒤집기
- [ ] 히어로 영상 제작(§7) → 적용 + poster + 지연 로드

### Phase 4 — 마무리

- [x] 모바일 / 태블릿 반응형 점검
- [ ] 접근성: 대비 AA, 포커스 링, reduced-motion에서 전 구간 정적 동작
- [ ] Lighthouse (LCP — 영상 poster가 LCP 후보), 번들 크기 확인
- [x] `firebase.json` `/videos/**` 캐시 헤더
- [ ] preview 채널 배포 → 확인 → 본 배포
- [x] CLAUDE.md / design-system 스킬 갱신
- [ ] protfolio-plan.md §3 / §6 / §10 갱신

## 참고 / 크레딧

- 레퍼런스 릴스: https://www.instagram.com/reels/Dd_rIaZC1ay/ — 디자인 레퍼런스 (섹션 구성·인터랙션·톤). 원본 소스 비공개 → 프레임 분석 후 직접 구현
- 작가: Instagram @sl_tech_journal · GitHub @lohithadamisetti123
- 공개 크레딧은 `README.md` › Credits 에 동일하게 기재

## 12. 구현 메모 (2026-10-10)

- **물리 엔진 변경**: rapier 대신 자체 verlet 시뮬레이션으로 구현. rapier wasm이 gzip 842KB라 About 진입 시 전송량이 2배 이상이 됨
- **번들 크기** (gzip): 메인 약 168KB, 사원증 3D 청크 약 250KB (About 근처에서 lazy 로드)
- **히어로**: `src/lib/heroMedia.ts`의 `video`에 경로만 넣으면 영상으로 전환. 지금은 증명사진을 아치 프레임에 multiply로 합성
- **레거시 정리 (2026-10-11 완료)**: `components/layout`·`sections`·`primitives`·`effects`, `contexts/Theme*`, `hooks/useTheme.ts`, `data/tech.ts` 삭제 (git 이력에서 복구 가능)
- **콘텐츠 이슈 (SSOT 확인 필요)**: `bio.ts` 첫 문단이 "현재 한스파마"로 되어 있고, `experience.ts`에 리빗 경력이 없음 → `/about` 페이지와 Experience 섹션에 그대로 노출됨

## 13. 히어로 영상 적용 (2026-10-11)

- 원본: Kling 비디오 3.0 · 1080p · 15초 · 사운드 동기화 (구독 계정, 워터마크 없음) → `docs/character/kling_intro_source.mp4`
- 배경 제거: rembg `isnet-general-use` 프레임별 매팅 + 발밑 그림자 반투명 보존 + 가장자리 페이드 (색 기반 크로마키는 흰 티셔츠가 배경과 비슷해 실패)
- 결과물 (532×1016 = 상하 여백 크롭 후 85% 축소, 24fps, 15초 — 총 약 2.3MB, 이전 3.8MB)
  - `public/videos/hero-intro.webm` — VP9 알파 + Opus 모노, 약 1.6MB (Chrome·Edge·Firefox)
  - `public/videos/hero-intro.mp4` — H.264 crf25 + AAC 모노, 배경 #f4efe6 합성, 약 0.65MB (Safari·iOS)
  - `public/images/hero-poster.webp` — 영상 첫 프레임을 같은 크롭으로 뽑은 투명 이미지, 약 68KB
  - 인코딩 필터: `crop=624:1192:0:96,scale=532:1016:flags=lanczos` (포스터도 동일해야 전환 시 위치가 안 튐)
- 재생 (`HeroFigure.tsx`, 설정은 `src/lib/heroMedia.ts`)
  - 첫 방문: 5초 카운트다운(버튼에 원형 타이머) → 자동 재생. 브라우저당 평생 1회 (localStorage `hero-intro-autoplayed:v1`)
  - 카운트다운 중 버튼 클릭 = 취소(이후 자동 재생 안 함). 화면 밖이거나 탭이 숨겨지면 타이머 일시정지
  - 카운트다운 시작과 동시에 영상 미리 로드 → 0초에 바로 재생
  - 자동 재생은 브라우저 정책상 무음 + 자막 → "소리 켜기"로 전환. 이미 페이지와 상호작용했다면 소리와 함께 재생
  - 직접 "인사 듣기" 클릭 시 소리와 함께 재생, 끝나면 poster 로 크로스페이드
  - 깜빡임 제거: 첫 프레임이 실제로 그려진 뒤(requestVideoFrameCallback) 영상 페이드인 → 포스터 페이드아웃. 전환에 opacity + 2px blur
  - 한 형식 재생 실패 시 다른 형식으로 자동 재시도. 화면 밖으로 스크롤하면 멈추고 poster 로 복귀
- 남은 것: 무음 대기 루프 영상(`heroMedia.idle`) — 지금은 poster 에 CSS 숨쉬기 모션으로 대체

### 13.1 인사 영상 v2 (2026-10-11)

- 원본: Kling 3.0 · 1080p · 15초 · 사운드 생성, 영어 프롬프트 + 한글 대사 → docs/character/kling_intro_v2_source.mp4
- 대사: "안녕하세요, 정윤수입니다. 천백만 명이 사용하는 서비스를 만든 개발자이고, 지금은 리빗에서 개발팀을 이끌고 있습니다. 제가 걸어온 길, 천천히 둘러보세요."
- 인코딩: crop=624:1192:56:96 (캐릭터 중앙 기준) → 532×1016, 좌우 40px·하단 36px 알파 페이드. WebM VP9 alpha crf44 (약 2.1MB) / MP4 H.264 crf25 (약 0.5MB)
- 자막 타이밍은 음성 에너지 구간으로 맞춤 (heroMedia.captions)
