# Coke.YS Portfolio — 프로젝트 계획서

> React + Firebase 기반 개인 포트폴리오 + 블로그 + 방문자 분석 관리자 사이트
> 작성일: 2026-04-29
> 예상 일정: 2~3주

---

## 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [기술 스택](#2-기술-스택)
3. [디자인 시스템](#3-디자인-시스템)
4. [아키텍처](#4-아키텍처)
5. [데이터 모델](#5-데이터-모델)
6. [페이지 / 라우팅 구조](#6-페이지--라우팅-구조)
7. [개인정보 처리](#7-개인정보-처리)
8. [단계별 일정](#8-단계별-일정)
9. [TODO 체크리스트](#9-todo-체크리스트)
10. [결정 사항](#10-결정-사항)
11. [미정 사항](#11-미정-사항)
12. [부록 — 시작 코드 스니펫](#12-부록--시작-코드-스니펫)

---

## 1. 프로젝트 개요

### 목적
- 이직 지원용 (이력서 URL 첨부)
- 개인 브랜딩 + 블로그
- Firebase 풀스택 학습/포트폴리오 강화

### 핵심 기능
- 공개 포트폴리오 사이트 (Hero / About / Skills / Experience / Projects / Patents / Contact)
- 블로그 (마크다운 기반)
- 관리자 페이지 (방문자 지역/시간 분석, 블로그 CRUD, 문의 내역)

### 스코프 외
- 댓글 시스템
- 다국어 (영어 우선순위는 낮음, 추후 옵션)
- 검색 기능 (블로그 글 적을 땐 불필요)

---

## 2. 기술 스택

| 영역 | 선택 | 비고 |
|---|---|---|
| **프론트엔드** | React 19 + Vite + TypeScript | 빌드 빠름, Firebase Hosting과 궁합 좋음 |
| **스타일링** | Tailwind CSS | 다크모드/반응형 처리 간단 |
| **라우팅** | React Router v6+ | SPA 라우팅 |
| **애니메이션** | Framer Motion | 진입/스크롤/호버 인터랙션 |
| **차트** | Recharts | 관리자 시계열 |
| **지도** | react-simple-maps + d3-geo | 관리자 방문자 지도 |
| **마크다운** | react-markdown + remark-gfm + rehype-highlight | 블로그 렌더링 |
| **폼** | react-hook-form + zod | 문의 폼 |
| **서버 상태** | @tanstack/react-query | Firestore 캐시/동기화 (선택) |
| **호스팅** | Firebase Hosting | CDN, HTTPS, 커스텀 도메인 |
| **인증** | Firebase Auth (Google) | 관리자 로그인 |
| **DB** | Firestore | NoSQL, 실시간 동기화 |
| **함수** | Cloud Functions (Node 20) | logVisit, 문의 이메일 발송 |
| **이메일** | Resend | 무료 한도 넉넉 (월 3,000건) |

---

## 3. 디자인 시스템

### 컨셉
**다크 터미널 + 픽셀 액센트.** 다크모드 기본, 라이트모드 토글 지원.

원칙: **컨셉은 분위기 레이어, 콘텐츠는 즉시 읽혀야 함.**
- 헤더/액센트만 픽셀 폰트
- 본문/메타 정보는 깔끔한 모노 + 한글 산세리프
- 그린 액센트는 임팩트 수치, 액션 CTA에만 제한적으로

### 컬러 토큰

#### 다크 모드 (기본)
| 용도 | 값 |
|---|---|
| `--bg` | `#0a0a0a` |
| `--surface` | `#161616` |
| `--border` | `#2a2a2a` |
| `--text-primary` | `#e6e6e6` |
| `--text-secondary` | `#888888` |
| `--text-muted` | `#666666` |
| `--accent` | `#4ade80` (라임 그린) |
| `--accent-hover-bg` | `#0e1a10` |

#### 라이트 모드
| 용도 | 값 |
|---|---|
| `--bg` | `#fafaf7` (살짝 미색) |
| `--surface` | `#ffffff` |
| `--border` | `#e5e5e0` |
| `--text-primary` | `#1a1a1a` |
| `--text-secondary` | `#555555` |
| `--text-muted` | `#666666` |
| `--accent` | `#15803d` (포레스트 그린, 대비 5.4:1) |
| `--accent-hover-bg` | `#f0f7f1` |

> 액센트 그린은 모드별로 다름. 다크는 빛으로 떠보이는 라임, 라이트는 차분한 포레스트.
> 같은 색 그대로 쓰면 라이트모드 대비 1.7:1로 가독성 깨짐 (WCAG AA 미달).

### 타이포그래피

| 용도 | 폰트 | 사이즈 |
|---|---|---|
| 픽셀 액센트 (이름, Hero) | Press Start 2P | 24px (clamp 18-24) |
| 터미널/모노 영문 | VT323 또는 JetBrains Mono | 18-22px |
| 한글 본문 | Pretendard | 16px (line-height 1.7) |
| 코드 블록 | JetBrains Mono | 14-16px |

> Press Start 2P는 헤더에만. 본문 한글은 항상 Pretendard. 안 그러면 가독성 망가짐.

### 핵심 컴포넌트 패턴

- **버튼**: `[ button_label ]` 형태, ASCII 브래킷 + 모노폰트
- **카드**: 1px 솔리드 보더, sharp corner (border-radius 0), 호버 시 보더 그린
- **상태 뱃지**: `● live`, `● maintenance`, `● archived` (도트 + 라벨)
- **메트릭**: `key value` 쌍, 라벨은 muted, 값은 accent 그린
- **태그**: 0.5px 보더, 작은 패딩
- **블록 커서**: `█` 깜빡임 (CSS keyframes)

### 접근성 / UX 가드레일

- `prefers-reduced-motion` 감지 → 타이핑/글리치 끄기
- 모바일에서는 터미널 인터랙션 간소화
- 임팩트 수치(1,100만+ 등)는 픽셀 폰트로 시각적 강조 — 컨셉이 강점을 가리지 말고 강점을 강조
- 이력서 PDF 다운로드 버전은 일반 레이아웃 (인쇄/스크리닝용)

---

## 4. 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                   Public Site (React SPA)                   │
│  / · /projects/:slug · /blog · /blog/:slug · /contact       │
└──────────────────────────┬──────────────────────────────────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            ▼              ▼              ▼
   ┌─────────────┐ ┌──────────────┐ ┌──────────────┐
   │  logVisit   │ │  Firestore   │ │ submitContact│
   │  Function   │ │   (read)     │ │   Function   │
   └──────┬──────┘ └──────────────┘ └──────┬───────┘
          │                                │
          ▼                                ▼
   ┌─────────────┐                  ┌──────────────┐
   │ IP geo API  │                  │   Resend     │
   │ Firestore   │                  │   (email)    │
   │  (write)    │                  │   Firestore  │
   └─────────────┘                  └──────────────┘

┌─────────────────────────────────────────────────────────────┐
│              Admin Panel (/admin/*)                         │
│  Firebase Auth (Google) + AdminRoute Guard                  │
│  · Dashboard (지도, 시계열, 인기 페이지)                     │
│  · Blog CRUD (마크다운 에디터)                               │
│  · Contacts 내역                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. 데이터 모델

### Firestore 컬렉션

```ts
// visits/{autoId}
{
  country: string         // "KR", "US", ...
  region: string          // "Seoul", "California", ...
  city: string            // "Seongnam", "San Francisco", ...
  ipHash: string          // SHA-256(ip + salt), 원본 IP 저장 X
  page: string            // "/", "/projects/pass-license", ...
  userAgent: string
  device: "mobile" | "tablet" | "desktop"
  referrer: string        // document.referrer
  timestamp: Timestamp
}

// posts/{slug}
{
  title: string
  slug: string            // URL용 (kebab-case)
  excerpt: string         // 목록 페이지용 요약
  content: string         // 마크다운 원문
  tags: string[]
  coverImage?: string     // Storage URL
  published: boolean
  publishedAt: Timestamp | null
  updatedAt: Timestamp
  viewCount: number
}

// contacts/{autoId}
{
  name: string
  email: string
  message: string
  status: "new" | "read" | "replied" | "archived"
  createdAt: Timestamp
}

// admins/{uid}
{
  email: string
  role: "owner"
  createdAt: Timestamp
}
```

### Firestore 보안 규칙 (초안)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isAdmin() {
      return request.auth != null
        && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }

    // visits: 클라이언트 직접 쓰기 차단 (Function만 가능)
    match /visits/{id} {
      allow read: if isAdmin();
      allow write: if false;
    }

    // posts: 게시된 글은 누구나 read, 쓰기는 admin만
    match /posts/{slug} {
      allow read: if resource.data.published == true || isAdmin();
      allow write: if isAdmin();
    }

    // contacts: 누구나 create, admin만 read/update
    match /contacts/{id} {
      allow create: if request.resource.data.keys().hasOnly(['name', 'email', 'message', 'status', 'createdAt']);
      allow read, update: if isAdmin();
      allow delete: if false;
    }

    // admins: 본인만 read, 직접 write 금지 (콘솔에서 수동 등록)
    match /admins/{uid} {
      allow read: if request.auth != null && request.auth.uid == uid;
      allow write: if false;
    }
  }
}
```

---

## 6. 페이지 / 라우팅 구조

### 공개 라우트
- `/` — Hero + About 요약 + Featured Projects 스니펫
- `/projects` — 전체 프로젝트 리스트
- `/projects/:slug` — 프로젝트 상세 (스크린샷, 아키텍처, 역할, 트러블슈팅)
- `/blog` — 블로그 목록
- `/blog/:slug` — 블로그 상세
- `/contact` — 문의 폼
- `*` — 404 (`bash: /random-page: No such file or directory` 컨셉)

### 관리자 라우트 (AdminRoute 가드)
- `/admin` — 대시보드 (방문 통계 요약)
- `/admin/visits` — 방문자 상세 (지도, 시계열, 페이지별)
- `/admin/posts` — 블로그 글 목록
- `/admin/posts/new` — 새 글 작성
- `/admin/posts/:slug/edit` — 수정
- `/admin/contacts` — 문의 내역
- `/admin/login` — Google 로그인

### Featured 프로젝트 (대표 6)
1. PASS 모바일 운전면허증 (1,100만+ 가입자)
2. 아차키 디지털 차키 (BLE/JNI/C++)
3. 포켓맵고 (DAU 26만, 109만 다운로드)
4. 코러스N (NFT 마켓플레이스 + 특허)
5. seat.AI (Kickstarter 459%)
6. 모코드 (현재 진행 중인 RN 헬스케어)

---

## 7. 개인정보 처리

한국 개인정보 보호법상 IP는 개인식별 가능 정보. 처리 원칙:

- 원본 IP는 **저장하지 않음** — `SHA-256(ip + salt)`로 해시 후 저장
- 지역 정보는 **국가/지역/도시까지만** 추출 (위경도 X)
- IP geolocation은 **Cloud Functions 서버사이드에서만** 처리 (클라이언트에 IP 노출 금지)
- 첫 방문 시 짧은 고지 배너 노출, localStorage 또는 쿠키로 1회만

### 고지 배너 문구 (예시)
> 이 사이트는 방문자 통계(국가/지역, 페이지, 시간)를 익명으로 수집합니다. 개인을 식별하는 정보는 저장하지 않습니다. [확인]

### geolocation API 옵션
- **ip-api.com** (무료, 서버사이드 45 req/min) — 시작 단계 충분
- **Cloudflare Workers `cf.country`** — Hosting을 Cloudflare 거치면 무료, 더 빠름 (장기 옵션)
- **ipinfo.io** — 무료 50,000 req/month, 정확도 좋음

---

## 8. 단계별 일정

### Week 1 — 공개 사이트 기반
프로젝트 셋업, 정적 페이지, 첫 배포까지.

### Week 2 — 데이터 + 관리자
Firestore 스키마, Cloud Functions, Auth, Admin 대시보드.

### Week 3 — 블로그 + 마무리
블로그 CRUD, 문의 폼 + 이메일, 디테일 다듬기, 도메인 연결.

---

## 9. TODO 체크리스트

### Phase 1 — 셋업 + 공개 사이트 기반 (Week 1)

#### Day 1: 환경 셋업
- [ ] Firebase 콘솔에서 프로젝트 생성 (`coke-ys-portfolio`)
- [ ] Hosting, Auth, Firestore, Functions, Storage 활성화
- [ ] Auth 제공자에 Google 추가, 본인 이메일 추가
- [ ] Firestore 시작 (production 모드, 보안 규칙은 일단 deny all)
- [ ] `npm create vite@latest portfolio -- --template react-ts`
- [ ] Tailwind CSS 설치 + 설정 (`tailwind.config.ts`, `index.css`)
- [ ] ESLint, Prettier, Husky + lint-staged 설정
- [ ] `npm install firebase`
- [ ] `firebase init` (hosting, functions, firestore, emulators 선택)
- [ ] `.env.local`에 Firebase 설정 등록 (`VITE_FIREBASE_*`)
- [ ] GitHub 리포 생성, push
- [ ] GitHub Actions로 `main` push 시 Firebase Hosting 자동 배포 설정

#### Day 2: 디자인 토큰 + 레이아웃
- [ ] 색상 CSS 변수 정의 (다크/라이트)
- [ ] Tailwind config에 컬러 토큰 매핑
- [ ] 폰트 로드 (`@fontsource/press-start-2p`, `@fontsource/vt323`, Pretendard)
- [ ] `Layout` 컴포넌트 (Header + Footer + Outlet)
- [ ] `ThemeProvider` (다크/라이트 토글, localStorage 저장)
- [ ] 다크모드 기본값으로 설정

#### Day 3: 라우팅 + Hero
- [ ] React Router 설정 (`/`, `/projects`, `/projects/:slug`, `/blog`, `/blog/:slug`, `/contact`, `/admin/*`)
- [ ] Hero 섹션 구현 (부록 코드 참고)
- [ ] 타이핑 애니메이션 (`react-type-animation` 또는 자체 구현)
- [ ] 블록 커서 깜빡임 CSS

#### Day 4-5: 콘텐츠 페이지
- [ ] About 섹션 (간략 소개 + 강점)
- [ ] Skills 섹션 (`npm list --depth=0` 형태로 카테고리별 트리)
- [ ] Experience 섹션 (한스파마 → 튠잇 → 아라빛 타임라인)
- [ ] Projects 섹션 (카드 6개 — 부록 코드 참고)
- [ ] 모바일 반응형 점검
- [ ] Firebase Hosting 배포 후 임시 도메인으로 동작 확인
- [ ] Lighthouse 1차 점검

---

### Phase 2 — 데이터 + 관리자 (Week 2)

#### Day 6-7: Firestore + Cloud Functions
- [ ] Firestore 스키마 TypeScript 타입 정의 (`src/types/firestore.ts`)
- [ ] 보안 규칙 작성 (`firestore.rules`)
- [ ] Firestore emulator로 보안 규칙 테스트
- [ ] `logVisit` Cloud Function 구현
    - [ ] IP 추출 (`req.headers['x-forwarded-for']`)
    - [ ] IP 해시 (SHA-256 + salt, salt는 환경변수)
    - [ ] ip-api.com 호출하여 지역 정보 추출
    - [ ] User-Agent 파싱 → device 분류
    - [ ] Firestore `visits`에 기록
    - [ ] Rate limit (같은 ipHash + page 1분 내 중복 차단)
- [ ] 클라이언트에서 페이지 이동 시 logVisit 호출 (React Router useLocation 활용)
- [ ] 개인정보 고지 배너 컴포넌트 (1회 노출)

#### Day 8-9: Firebase Auth + Admin Guard
- [ ] Google 로그인 구현 (`signInWithPopup`)
- [ ] `AdminRoute` 컴포넌트 (Auth + admins 컬렉션 체크)
- [ ] Firestore 콘솔에서 본인 UID로 `admins/{uid}` 문서 수동 등록
- [ ] `/admin/login` 페이지
- [ ] 로그아웃 버튼

#### Day 10: Admin 대시보드
- [ ] 대시보드 레이아웃 (사이드바 + 메인)
- [ ] 메트릭 카드 (오늘/이번주/이번달 방문자 수)
- [ ] 시계열 차트 (Recharts, 일별 방문자 추이 30일)
- [ ] 방문자 지도 (react-simple-maps, 국가별 색상 농도)
- [ ] 인기 페이지 Top 10 테이블
- [ ] 디바이스 분포 도넛 차트

---

### Phase 3 — 블로그 + 마무리 (Week 3)

#### Day 11-12: 블로그
- [ ] 블로그 목록 페이지 (`/blog`)
- [ ] 블로그 상세 페이지 (`/blog/:slug`) — react-markdown 렌더링
- [ ] 코드 하이라이팅 (rehype-highlight)
- [ ] 태그 필터링
- [ ] viewCount 증가 로직
- [ ] Admin 블로그 목록 (`/admin/posts`)
- [ ] 새 글 작성 페이지 — 마크다운 에디터 (분할 미리보기)
- [ ] 글 수정/삭제
- [ ] published 토글
- [ ] 첫 글 작성 — "포트폴리오 만들기 회고" 또는 "Firebase 풀스택 적용기"

#### Day 13: 문의 폼
- [ ] `/contact` 페이지
- [ ] react-hook-form + zod 검증
- [ ] `submitContact` Cloud Function
    - [ ] Firestore `contacts`에 저장
    - [ ] Resend로 본인 이메일에 알림 발송
- [ ] 스팸 방지 (honeypot 또는 hCaptcha)
- [ ] Admin 문의 내역 페이지 (`/admin/contacts`)
- [ ] 상태 변경 (new → read → replied)

#### Day 14: 디테일 다듬기
- [ ] Framer Motion 애니메이션 (Hero 진입, 카드 fade-in)
- [ ] `prefers-reduced-motion` 대응
- [ ] 다크/라이트 토글 애니메이션 (`$ theme --light` 명령어 효과)
- [ ] 404 페이지 (`bash: not found` 컨셉)
- [ ] SEO 메타태그 (Open Graph, Twitter Card)
- [ ] sitemap.xml, robots.txt
- [ ] favicon (픽셀 아트 컨셉)

#### Day 15: 마무리 + 배포
- [ ] Lighthouse 점검 (목표: Performance 90+, A11y 95+, SEO 100)
- [ ] 이미지 WebP 변환, lazy loading
- [ ] 이력서 PDF Storage 업로드 + 다운로드 버튼 연결
- [ ] 커스텀 도메인 연결 (구매한 경우)
- [ ] Firebase Budget Alert 설정
- [ ] 최종 콘텐츠 검수 (오탈자, 링크, 수치)
- [ ] HR/지인에게 1차 리뷰 요청

---

## 10. 결정 사항

- ✅ **스택**: React + Vite + TypeScript + Tailwind + Firebase (Hosting + Auth + Firestore + Functions)
- ✅ **디자인 컨셉**: 다크 터미널 + 픽셀 액센트, 다크/라이트 토글 (다크 기본)
- ✅ **레이아웃**: 프로젝트 카드는 1열 스택 (그리드 X)
- ✅ **호스팅 전략**: Firebase 단독 (GitHub Pages 미사용)
- ✅ **기존 `cokeys90.github.io`**: archive 또는 비공개 처리, 신규 프로젝트로 전환
- ✅ **이메일 발송**: Resend
- ✅ **개인정보**: IP는 SHA-256 해시, 지역만 저장
- ✅ **카드 디자인**: 일단 현재 패턴으로 시작, 진행하면서 수정

## 11. 미정 사항

- ⏳ **도메인 결정**
    - 옵션 1: 새 커스텀 도메인 구매 (`cokeys.dev`, `jys-dev.com` 등)
    - 옵션 2: Firebase 기본 도메인 사용 (`coke-ys-portfolio.web.app`)
    - 권장: 커스텀 도메인 (포트폴리오 가치 ↑, 연 1~2만원)
- ⏳ **블로그 글 톤** — 기술 회고 위주 / 프로젝트 후기 위주 / 둘 다
- ⏳ **이력서 PDF 다운로드 버전 디자인** — 현재 docx 그대로 / 새로 디자인
- ⏳ **블로그 첫 글** — 무엇으로 시작할지

---

## 12. 부록 — 시작 코드 스니펫

### 12.1 컬러 토큰 CSS

`src/styles/tokens.css`

```css
:root {
  --bg: #fafaf7;
  --surface: #ffffff;
  --border: #e5e5e0;
  --text-primary: #1a1a1a;
  --text-secondary: #555555;
  --text-muted: #666666;
  --accent: #15803d;
  --accent-hover-bg: #f0f7f1;
}

[data-theme="dark"] {
  --bg: #0a0a0a;
  --surface: #161616;
  --border: #2a2a2a;
  --text-primary: #e6e6e6;
  --text-secondary: #888888;
  --text-muted: #666666;
  --accent: #4ade80;
  --accent-hover-bg: #0e1a10;
}

body {
  background: var(--bg);
  color: var(--text-primary);
  font-family: 'Pretendard', -apple-system, system-ui, sans-serif;
}
```

### 12.2 Tailwind config 매핑

`tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        border: 'var(--border)',
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        accent: 'var(--accent)',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        terminal: ['VT323', 'Menlo', 'monospace'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
      },
    },
  },
} satisfies Config;
```

### 12.3 Hero 컴포넌트 초안

`src/components/Hero.tsx`

```tsx
export default function Hero() {
  const highlights = [
    { label: 'PASS 모바일 운전면허증', value: '1,100만+ 가입자' },
    { label: '포켓맵고', value: 'DAU 26만 · Play Store 1위' },
    { label: 'seat.AI', value: 'Kickstarter 459% 펀딩' },
    { label: '코러스N', value: '음원 NFT 특허 출원' },
  ];

  return (
    <section className="px-6 py-16 md:px-8 md:py-24">
      <h1 className="font-pixel text-2xl md:text-4xl text-accent leading-relaxed tracking-wider">
        Coke.YS
      </h1>
      <p className="font-terminal text-2xl text-text-secondary mt-3 mb-8">
        Mobile developer · 10년차
      </p>

      <div className="font-terminal text-xl leading-relaxed">
        <div>
          <span className="text-accent">$</span>{' '}
          <span className="text-text-primary">whoami</span>
        </div>
        <div className="text-text-secondary pl-4">
          &gt; Android · iOS · React Native · Web · Web3
        </div>

        <div className="mt-4">
          <span className="text-accent">$</span>{' '}
          <span className="text-text-primary">cat highlights.txt</span>
        </div>
        {highlights.map((h) => (
          <div key={h.label} className="text-text-secondary pl-4">
            &gt; {h.label} · <span className="text-accent">{h.value}</span>
          </div>
        ))}

        <div className="mt-4">
          <span className="text-accent">$</span>{' '}
          <span className="text-text-primary">ls --featured</span>
          <span className="inline-block w-2.5 h-5 bg-accent ml-2 align-middle animate-blink" />
        </div>
      </div>

      <div className="flex gap-3 flex-wrap mt-8">
        <button className="font-terminal text-lg border border-accent text-accent px-4 py-1">
          [ download_resume.pdf ]
        </button>
        <button className="font-terminal text-lg border border-border text-text-secondary px-4 py-1">
          [ ./projects ]
        </button>
        <button className="font-terminal text-lg border border-border text-text-secondary px-4 py-1">
          [ ./contact ]
        </button>
      </div>
    </section>
  );
}
```

### 12.4 블록 커서 애니메이션

`tailwind.config.ts`의 `extend`에 추가:

```ts
animation: {
  blink: 'blink 1s steps(2) infinite',
},
keyframes: {
  blink: {
    '0%, 49%': { opacity: '1' },
    '50%, 100%': { opacity: '0' },
  },
},
```

### 12.5 logVisit Cloud Function 골격

`functions/src/logVisit.ts`

```ts
import { onRequest } from 'firebase-functions/v2/https';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp } from 'firebase-admin/app';
import { createHash } from 'crypto';

initializeApp();
const db = getFirestore();

const SALT = process.env.IP_HASH_SALT ?? 'change-me';

export const logVisit = onRequest(
  { cors: true, region: 'asia-northeast3' },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).send('Method not allowed');
      return;
    }

    const { page, referrer } = req.body as { page: string; referrer: string };
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ??
      req.ip ??
      'unknown';
    const userAgent = req.headers['user-agent'] ?? '';

    const ipHash = createHash('sha256').update(ip + SALT).digest('hex');

    let geo = { country: 'unknown', region: 'unknown', city: 'unknown' };
    try {
      const r = await fetch(`http://ip-api.com/json/${ip}?fields=country,regionName,city`);
      if (r.ok) {
        const data = await r.json();
        geo = {
          country: data.country ?? 'unknown',
          region: data.regionName ?? 'unknown',
          city: data.city ?? 'unknown',
        };
      }
    } catch (e) {
      console.error('geo lookup failed', e);
    }

    const device = /Mobile/i.test(userAgent)
      ? 'mobile'
      : /Tablet|iPad/i.test(userAgent)
      ? 'tablet'
      : 'desktop';

    await db.collection('visits').add({
      ...geo,
      ipHash,
      page,
      userAgent,
      device,
      referrer: referrer ?? '',
      timestamp: new Date(),
    });

    res.json({ ok: true });
  }
);
```

### 12.6 디렉터리 구조 (제안)

```
portfolio/
├── public/
│   ├── resume.pdf
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── admin/
│   │       ├── AdminLayout.tsx
│   │       ├── VisitsMap.tsx
│   │       └── VisitsChart.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Projects.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── Blog.tsx
│   │   ├── BlogPost.tsx
│   │   ├── Contact.tsx
│   │   ├── NotFound.tsx
│   │   └── admin/
│   │       ├── Dashboard.tsx
│   │       ├── Visits.tsx
│   │       ├── Posts.tsx
│   │       ├── PostEditor.tsx
│   │       ├── Contacts.tsx
│   │       └── Login.tsx
│   ├── lib/
│   │   ├── firebase.ts
│   │   ├── auth.ts
│   │   ├── firestore.ts
│   │   └── analytics.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useTheme.ts
│   │   └── useVisitLog.ts
│   ├── data/
│   │   ├── projects.ts
│   │   ├── experience.ts
│   │   └── skills.ts
│   ├── types/
│   │   └── firestore.ts
│   ├── styles/
│   │   ├── tokens.css
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── functions/
│   ├── src/
│   │   ├── logVisit.ts
│   │   ├── submitContact.ts
│   │   └── index.ts
│   └── package.json
├── firestore.rules
├── firebase.json
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 참고 링크

- [Firebase 콘솔](https://console.firebase.google.com/)
- [Vite 공식 문서](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Pretendard](https://github.com/orioncactus/pretendard)
- [Press Start 2P (Google Fonts)](https://fonts.google.com/specimen/Press+Start+2P)
- [VT323 (Google Fonts)](https://fonts.google.com/specimen/VT323)
- [Resend](https://resend.com/)
- [Recharts](https://recharts.org/)
- [react-simple-maps](https://www.react-simple-maps.io/)
- [개인정보 보호법 (국가법령정보센터)](https://www.law.go.kr/법령/개인정보보호법)

---

> 이 문서는 진행하면서 계속 업데이트. 결정 바뀌면 [10. 결정 사항] / [11. 미정 사항] 섹션 동기화.
