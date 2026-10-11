import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero } from '../components/home/Hero'
import { About } from '../components/home/About'
import { Skills } from '../components/home/Skills'
import { Work } from '../components/home/Work'
import { Learning } from '../components/home/Learning'
import { Experience } from '../components/home/Experience'
import { Achievements } from '../components/home/Achievements'
import { Contact } from '../components/home/Contact'
import { scrollToId } from '../lib/scroll'

export function Home() {
  const location = useLocation()

  // 다른 라우트(/about 등)에서 /#section 으로 진입 시 해당 섹션으로 스크롤
  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const t = window.setTimeout(() => scrollToId(id), 60)
    return () => window.clearTimeout(t)
  }, [location.hash])

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Work />
      <Learning />
      <Experience />
      <Achievements />
      <Contact />
    </>
  )
}
