import { Outlet } from 'react-router-dom'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'
import { useLenis } from '../../hooks/useLenis'

export function SiteLayout() {
  useLenis()
  return (
    <>
      <a
        href="#content"
        className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-on-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        본문으로 건너뛰기
      </a>
      <SiteHeader />
      <main id="content">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  )
}
