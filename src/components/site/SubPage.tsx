import { Outlet } from 'react-router-dom'

/** 서브 페이지 공통 래퍼 — 고정 헤더 아래 여백 + 읽기 폭 */
export function SubPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-32 pb-24 md:px-8 md:pt-40 print:max-w-none print:p-0">
      <Outlet />
    </div>
  )
}
