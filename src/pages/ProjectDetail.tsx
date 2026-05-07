import { useParams } from 'react-router-dom'

export function ProjectDetail() {
  const { slug } = useParams()
  return (
    <section className="px-6 py-16 max-w-4xl mx-auto font-terminal">
      <h1 className="font-pixel text-xl text-accent">projects / {slug}</h1>
      <p className="text-text-muted mt-4">[추후 작업: 프로젝트 상세 — Day 4-5]</p>
    </section>
  )
}
