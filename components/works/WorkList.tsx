import React from 'react'
import { WorkCard } from './WorkCard'
import type { WorkItem } from '@/lib/works'

interface WorkListProps {
  works: WorkItem[]
}

export function WorkList({ works }: WorkListProps) {
  return (
    <section className="block-works block-works-banner">
      {works.map((work) => (
        <WorkCard key={work.pathSlug} work={work} />
      ))}
    </section>
  )
}
