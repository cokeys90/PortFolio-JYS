import { useParams } from 'react-router-dom'

export function BlogPost() {
  const { slug } = useParams()
  return (
    <section className="px-6 py-16 max-w-4xl mx-auto font-terminal">
      <h1 className="font-pixel text-xl text-accent">blog / {slug}</h1>
      <p className="text-text-muted mt-4">[추후 작업: 블로그 상세 — Day 11-12]</p>
    </section>
  )
}
