import { Link, useLocation } from 'react-router-dom'

export function NotFound() {
  const { pathname } = useLocation()
  return (
    <section className="px-6 py-16 max-w-4xl mx-auto font-terminal">
      <p className="text-xl text-accent">$ cd {pathname}</p>
      <p className="text-text-secondary mt-2">bash: cd: {pathname}: No such file or directory</p>
      <Link to="/" className="text-accent underline hover:no-underline mt-6 inline-block">
        $ cd ~
      </Link>
    </section>
  )
}
