import { Outlet } from 'react-router-dom'
import { SidePanel } from './SidePanel'
import { Spotlight } from '../effects/Spotlight'

export function Layout() {
  return (
    <>
      <Spotlight />
      <div className="mx-auto min-h-screen max-w-[1000px] px-6 py-12 md:px-12 md:py-16 lg:py-0 selection:bg-accent-hover-bg selection:text-accent">
        <div className="lg:flex lg:justify-between lg:gap-4 print:!block">
          <SidePanel />
          <main id="content" className="pt-12 lg:w-1/2 lg:py-24 print:!w-full print:!pt-8">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}
