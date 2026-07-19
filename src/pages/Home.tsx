import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Highlights } from '../components/sections/Highlights'
import { About } from '../components/sections/About'
import { Experience } from '../components/sections/Experience'
import { ProjectsList } from '../components/sections/ProjectsList'

export function Home() {
  const location = useLocation()

  // 다른 라우트(/blog 등)에서 /#section 으로 진입 시 해당 섹션으로 스크롤
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      })
    }
  }, [location.hash])

  return (
    <>
      <Highlights />
      <About />
      <Experience />
      <ProjectsList />
    </>
  )
}
