import { useNavigate, useLocation } from 'react-router-dom'
import type { MouseEvent, ReactNode } from 'react'

interface Props {
  /** 섹션 id (예: 'about', 'projects'). '#' 없이 전달 */
  section: string
  className?: string
  children: ReactNode
}

/**
 * 홈 페이지 내 앵커 점프. 다른 라우트(/blog 등)에 있을 때는
 * 홈으로 이동 후 해당 섹션으로 스크롤한다.
 */
export function AnchorLink({ section, className = '', children }: Props) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate(`/#${section}`)
    } else {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
      window.history.replaceState(null, '', `#${section}`)
    }
  }

  return (
    <a href={`/#${section}`} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
