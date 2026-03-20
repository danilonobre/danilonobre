'use client'

import { useDevMode } from './DevModeProvider'
import styles from './DevMode.module.scss'

export function EditableIntro() {
  const ctx = useDevMode()
  if (!ctx || !ctx.devMode) return null

  const { homeContent, updateHomeField } = ctx

  return (
    <div className="page-intro">
      <h1>
        Hi, I&apos;m{' '}
        <span
          className={styles.editable}
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => updateHomeField('name', e.currentTarget.textContent ?? '')}
        >
          {homeContent.name}
        </span>
        ,{' '}
        <span
          className={styles.editable}
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => updateHomeField('description', e.currentTarget.textContent ?? '')}
        >
          {homeContent.description}
        </span>
      </h1>
      <p>
        Currently{' '}
        <span
          className={`role ${styles.editable}`}
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => updateHomeField('role', e.currentTarget.textContent ?? '')}
        >
          {homeContent.role}
        </span>
        {' '}at{' '}
        <span
          className={`outsystems ${styles.editable}`}
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => updateHomeField('company', e.currentTarget.textContent ?? '')}
        >
          {homeContent.company}
        </span>
        .
      </p>
    </div>
  )
}
