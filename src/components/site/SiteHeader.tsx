import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { NAV_IDS, NAV_SECTIONS } from '../../lib/sections'
import { scrollToId } from '../../lib/scroll'
import { useActiveSection } from '../../hooks/useActiveSection'
import { profile } from '../../data/profile'

/** 좌상단 이니셜 로고 + 우상단 알약형 내비게이션 (현재 섹션 pill 채움) */
export function SiteHeader() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isHome = pathname === '/'
  const active = useActiveSection(NAV_IDS)
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)

  const go = (id: string) => {
    setOpen(false)
    if (isHome) scrollToId(id)
    else navigate(`/#${id}`)
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 print:hidden">
      <div className="mx-auto flex max-w-[1440px] items-start justify-between px-4 pt-4 md:px-8 md:pt-6">
        <Link
          to="/"
          onClick={() => isHome && scrollToId('top')}
          className="pointer-events-auto flex items-center gap-3 rounded-full bg-bg/80 p-1 backdrop-blur-md sm:pr-4"
          aria-label="홈으로"
        >
          <span className="grid size-9 place-items-center rounded-full border border-ink/80 font-mono text-[11px] font-medium text-ink">
            YS
          </span>
          <span className="hidden text-sm font-medium text-ink sm:inline">
            {profile.fullName}
            <span className="ml-1.5 font-mono text-[11px] text-muted">{profile.nameEn}</span>
          </span>
        </Link>

        {/* desktop pill nav */}
        <nav
          aria-label="섹션 이동"
          className="pointer-events-auto hidden rounded-full border border-line bg-surface/80 p-1 backdrop-blur-md md:block"
        >
          <ul className="flex items-center">
            {NAV_SECTIONS.map(({ id, label }) => {
              const isActive = isHome && active === id
              return (
                <li key={id} className="relative">
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={
                        reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 36 }
                      }
                    />
                  )}
                  <a
                    href={`/#${id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      go(id)
                    }}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative block rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
                      isActive ? 'text-on-ink' : 'text-ink-soft hover:text-ink'
                    }`}
                  >
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* mobile menu */}
        <div className="pointer-events-auto relative md:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid size-11 place-items-center rounded-full bg-ink text-on-ink"
          >
            <span className="sr-only">메뉴</span>
            <svg viewBox="0 0 20 20" className="size-5" aria-hidden>
              {open ? (
                <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" />
              ) : (
                <path d="M3 7h14M3 13h14" stroke="currentColor" strokeWidth="1.6" />
              )}
            </svg>
          </button>
          {open && (
            <nav
              id="mobile-nav"
              aria-label="섹션 이동"
              className="absolute top-14 right-0 w-52 rounded-3xl border border-line bg-surface p-2"
            >
              <ul>
                {NAV_SECTIONS.map(({ id, label }) => (
                  <li key={id}>
                    <a
                      href={`/#${id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        go(id)
                      }}
                      className={`block rounded-2xl px-4 py-3 text-sm font-medium ${
                        isHome && active === id ? 'bg-ink text-on-ink' : 'text-ink'
                      }`}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}
