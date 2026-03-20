'use client'

import type { HomeContent } from '@/lib/home-content'
import { useDevMode } from '@/components/dev/DevModeProvider'
import { EditableIntro } from '@/components/dev/EditableIntro'

interface PageIntroProps {
  content: HomeContent
}

export function PageIntro({ content }: PageIntroProps) {
  const ctx = useDevMode()

  if (ctx?.devMode) {
    return <EditableIntro />
  }

  return (
    <div className="page-intro">
      <h1>
        Hi, I&apos;m <span>{content.name}</span>, {content.description}
      </h1>
      <p>
        Currently <span className="role">{content.role}</span> at{' '}
        <a className="outsystems" href={content.companyUrl} target="_blank" rel="noopener noreferrer">
          {content.company}
        </a>.
      </p>
    </div>
  )
}
