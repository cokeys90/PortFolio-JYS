# 무료 한도 보호 정책 (Spark plan safeguards)

> 이 프로젝트는 **Firebase Spark(무료)** 플랜만 사용한다. Cloud Functions / Cloud Storage 사용 안 함.
> 이 문서는 봇 폭격, 어뷰즈, 실수로 인한 한도 초과를 막기 위한 안전장치 체크리스트.

## Spark 일일 한도 (절대 넘지 않아야 할 선)

| 서비스           | 한도        | 비고                                            |
| ---------------- | ----------- | ----------------------------------------------- |
| Firestore read   | 50,000 / 일 | 어드민 외엔 posts read만 — 가장 위험            |
| Firestore write  | 20,000 / 일 | visits + contacts create — **봇 폭격 1차 표적** |
| Firestore delete | 20,000 / 일 | 코드상 사용 안 함                               |
| Firestore 저장   | 1 GiB       | 텍스트 데이터만이라 여유                        |
| Hosting egress   | 360 MB / 일 | 정적 자산 캐시 잘 걸면 여유                     |

## 4계층 방어 (모든 클라이언트 Firestore write 경로에 필수)

새 컬렉션을 만들거나 새 write 경로를 추가할 때 **4개 모두** 적용한다.

### 1. Firebase App Check (reCAPTCHA v3) 강제

- Firebase 콘솔 > App Check 에서 Firestore enforcement 활성화
- 클라이언트는 `initializeAppCheck` 으로 토큰 발급
- Firestore 규칙에서 `request.app != null` 확인
- **효과**: 비-브라우저 트래픽(curl, 봇 스크립트) 99% 차단

### 2. Firestore 규칙 — 필드 화이트리스트 + 길이 제한

- `keys().hasOnly([...])` — 정의된 필드 외 거부
- `keys().hasAll([...])` — 필수 필드 누락 거부
- 문자열은 `.size() < N` — 거대한 페이로드 차단
- enum 값은 `in [...]`
- **예시**: `firestore.rules` 의 `visits/`, `contacts/` 참고

### 3. Server timestamp 강제

- 클라이언트 시간 신뢰 X — `request.resource.data.timestamp == request.time`
- 코드에서는 `serverTimestamp()` 사용
- **효과**: 시간 위조로 인한 분석 데이터 오염 차단

### 4. 클라이언트 쿨다운 (sessionStorage)

- 같은 페이지 1분 내 중복 visit 로그 X
- 같은 사용자 새로고침 100번 → 가짜 DAU 차단
- 코드 위치: `src/hooks/useVisitLog.ts` (구현 예정)

## 그 외 안전장치

### 컬렉션 단위

- `visits`: `read: isAdmin()`, `update/delete: false`
- `posts`: `read: published == true || isAdmin()`, `write: isAdmin() && appCheck`
- `contacts`: `create: appCheck + 검증`, `read/update: isAdmin()`, `delete: false`
- `admins`: `read: 본인만`, `write: false` (콘솔에서 수동 등록)

### 프로젝트 단위

- **Blaze 업그레이드 금지** (Cloud Functions/Storage 못 쓰는 대신 비용 폭주 가능성 0)
- **Firebase 콘솔 사용량 주간 점검** (특히 Firestore write 일일 추이)
- **abuse 탐지 시 즉시 대응**:
  - Firestore 규칙 임시 강화 (`allow create: if false`)
  - App Check 정책 강화
  - 콘솔에서 의심 IP/에이전트 분석

### 정적 자산 (Cloud Storage 미사용)

- 이력서 PDF: `public/resume.pdf` 로 정적 호스팅
- 블로그 커버 이미지: `public/blog/{slug}/*.webp` 또는 외부 무료 호스팅
- 사용자 업로드 X (관리자 본인만 git push로 업데이트)

### 외부 서비스 (자체 한도 보유)

- **Web3Forms**: 무료 250건/월. 이걸 넘으면 폼 비활성화 — 자체 봇 차단도 운영
- **Firebase Analytics**: 무료 무제한. 보너스 데이터 소스
- **(선택) ipapi.co**: 클라이언트에서 호출 시 IP는 서드파티에 노출되나 우리 DB엔 저장 안 함

## 신규 기능 추가 시 체크리스트

- [ ] 새 Firestore write 경로인가? → 4계층 방어 모두 적용
- [ ] 새 read 경로가 일반 공개인가? → 캐시 / 페이지네이션 고려, 50K/일 영향 추정
- [ ] 외부 API 호출이 있는가? → 그쪽 한도와 키 노출 여부 확인
- [ ] 사용자 입력이 Firestore에 저장되는가? → 길이/타입 검증을 규칙에 박았는가
- [ ] 신규 의존성이 Cloud Storage / Functions 를 요구하는가? → **거부**, 대안 모색

## 침해 시 1차 대응

```
1. Firebase 콘솔 > Usage and billing > Firestore 사용량 확인
2. 규칙 임시 차단:
   - visits: allow create: if false  (분석은 Firebase Analytics로)
   - contacts: allow create: if false  (Web3Forms 직접 사용 안내)
3. App Check 정책 강화 (반복 IP 차단)
4. 원인 분석 후 장기 방어 추가
```

## 관련 문서

- 데이터 모델: [`protfolio-plan.md`](./protfolio-plan.md) §5
- 보안 규칙 코드: [`../firestore.rules`](../firestore.rules)
- 환경 변수: [`../.env.example`](../.env.example)
