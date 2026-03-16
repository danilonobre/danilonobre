'use client'

import React from 'react'
import { WorkCard } from './WorkCard'
import { WorkListSortable } from './WorkListSortable'
import { useDevMode } from '@/components/dev/DevModeProvider'
import type { WorkItem } from '@/lib/works'

interface WorkListProps {
  works: WorkItem[]
}

export function WorkList({ works }: WorkListProps) {
  const ctx = useDevMode()

  if (ctx?.devMode) {
    return <WorkListSortable />
  }

  return (
    <section className="block-works block-works-banner">
      {works.map((work) => (
        <WorkCard key={work.pathSlug} work={work} />
      ))}
    </section>
  )
}
