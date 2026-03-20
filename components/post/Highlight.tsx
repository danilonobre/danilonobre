'use client'

import React from 'react'
import * as PhosphorIcons from '@phosphor-icons/react'
import styles from './Highlight.module.scss'

interface HighlightProps {
  icon: string
  title?: string
  children: React.ReactNode
}

export function Highlight({ icon, title, children }: HighlightProps) {
  const IconComponent = (PhosphorIcons as unknown as Record<string, React.ComponentType<{ size?: number; weight?: string }>>)[icon]

  return (
    <div className={styles.highlightCard}>
      {IconComponent && (
        <div className={styles.icon}>
          <IconComponent size={40} weight="light" />
        </div>
      )}
      <div className={styles.highlightBody}>
        {title && <span className={styles.title}>{title}</span>}
        {children}
      </div>
    </div>
  )
}
