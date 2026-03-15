import React from 'react'
import { getWorks } from '@/lib/works'
import { WorkCard } from '@/components/works/WorkCard'

interface MoreWorksProps {
  exclude: string
}

export function MoreWorks({ exclude }: MoreWorksProps) {
  const works = getWorks().filter((w) => w.pathSlug !== exclude).slice(0, 1)
  return (
    <section className="works-related">
      <h2>More works</h2>
      <section className="block-works block-works-banner">
        {works.map((work) => (
          <WorkCard key={work.pathSlug} work={work} />
        ))}
      </section>
    </section>
  )
}
