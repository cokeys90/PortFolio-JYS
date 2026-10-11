import { profile } from '../../data/profile'

export function SiteFooter() {
  return (
    <footer className="border-t border-line print:hidden">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-4 py-8 text-[12px] text-muted sm:flex-row sm:items-center sm:justify-between md:px-8">
        <p>
          © {new Date().getFullYear()} {profile.fullName}{' '}
          <span className="font-mono text-[11px] tracking-wider uppercase">Jeong Yunsu</span>
        </p>
        <p>React · Vite · Tailwind · Three.js로 만들었습니다</p>
      </div>
    </footer>
  )
}
