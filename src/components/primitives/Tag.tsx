import type { ReactNode } from 'react'
import type { TechCategory } from '../../data/tech'

interface Props {
  children: ReactNode
  category?: TechCategory
}

const categoryClasses: Record<TechCategory, string> = {
  language: 'bg-tag-language/10 text-tag-language',
  framework: 'bg-tag-framework/10 text-tag-framework',
  database: 'bg-tag-database/10 text-tag-database',
  infra: 'bg-tag-infra/10 text-tag-infra',
  tool: 'bg-tag-tool/10 text-tag-tool',
  concept: 'bg-tag-concept/10 text-tag-concept',
  default: 'bg-accent-hover-bg text-accent',
}

export function Tag({ children, category = 'default' }: Props) {
  return (
    <li
      className={`inline-flex items-center rounded-tag px-3 py-1 text-xs font-medium leading-5 ${categoryClasses[category]}`}
    >
      {children}
    </li>
  )
}
