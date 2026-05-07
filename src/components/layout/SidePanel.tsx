import { Link, useLocation } from 'react-router-dom'
import { profile } from '../../data/profile'
import { AnchorLink } from '../primitives/AnchorLink'
import { ThemeToggle } from '../primitives/ThemeToggle'
import { useActiveSection } from '../../hooks/useActiveSection'
import { SocialLinks } from './SocialLinks'
import { Tag } from '../primitives/Tag'
import { skillGroups } from '../../data/skills'
import { getTechCategory } from '../../data/tech'

const navItems = [
  { section: 'about', label: 'About' },
  { section: 'experience', label: 'Experience' },
  { section: 'projects', label: 'Projects' },
] as const

const navIds = navItems.map((n) => n.section)

export function SidePanel() {
  const active = useActiveSection(navIds)
  const location = useLocation()
  const onAboutPage = location.pathname === '/about'

  return (
    <aside className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-1/2 lg:flex-col lg:py-24 print:!static print:!h-auto print:!w-full print:!py-0">
      {/* Top: profile + nav (고정) */}
      <div className="lg:flex-shrink-0">
        <img
          src={profile.avatar}
          alt={profile.fullName}
          width={160}
          height={160}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mb-6 ring-1 ring-border"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight">
          {profile.fullName}
        </h1>
        <h2 className="mt-3 text-lg md:text-xl font-medium text-text-primary">{profile.title}</h2>
        <p className="mt-4 max-w-xs text-text-secondary leading-normal">{profile.tagline}</p>

        <Link
          to={onAboutPage ? '/' : '/about'}
          className="group mt-5 inline-flex items-center gap-2 text-sm font-mono text-accent hover:underline underline-offset-4 print:hidden"
        >
          {onAboutPage ? (
            <>
              <span
                aria-hidden="true"
                className="transition-transform group-hover:-translate-x-1 motion-reduce:transition-none"
              >
                ←
              </span>
              <span>홈으로 돌아가기</span>
            </>
          ) : (
            <>
              <span>자기소개 자세히 보기</span>
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
              >
                →
              </span>
            </>
          )}
        </Link>

        <nav aria-label="In-page jump links" className="hidden lg:block mt-16 print:hidden">
          <ul className="space-y-3">
            {navItems.map((item) => {
              const isActive = active === item.section
              return (
                <li key={item.section}>
                  <AnchorLink section={item.section} className="group flex items-center py-3">
                    <span
                      className={`mr-4 h-px transition-all motion-reduce:transition-none ${
                        isActive
                          ? 'w-16 bg-text-primary'
                          : 'w-8 bg-text-muted group-hover:w-16 group-hover:bg-text-primary'
                      }`}
                    />
                    <span
                      className={`text-xs font-mono font-bold uppercase tracking-widest transition-colors ${
                        isActive
                          ? 'text-text-primary'
                          : 'text-text-muted group-hover:text-text-primary'
                      }`}
                    >
                      {item.label}
                    </span>
                  </AnchorLink>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      {/* Middle: Tech Stack (남은 공간 사용 + 내부 스크롤) */}
      <section
        aria-labelledby="tech-stack-heading"
        className="hidden lg:block lg:mt-10 lg:flex-1 lg:min-h-0 lg:overflow-y-auto lg:pr-2 print:hidden [scrollbar-width:thin] [scrollbar-color:var(--border)_transparent]"
      >
        <h3
          id="tech-stack-heading"
          className="sticky top-0 bg-bg pb-2 text-xs font-mono font-bold uppercase tracking-widest text-text-muted"
        >
          Tech Stack
        </h3>
        <div className="space-y-3 pt-2">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1.5">
                {group.label}
              </p>
              <ul className="flex flex-wrap gap-1">
                {group.items.map((item) => (
                  <Tag key={item} category={getTechCategory(item)}>
                    {item}
                  </Tag>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom: social + theme (고정) */}
      <div className="mt-12 lg:mt-8 flex items-center justify-between print:hidden lg:flex-shrink-0">
        <SocialLinks />
        <ThemeToggle />
      </div>
    </aside>
  )
}
