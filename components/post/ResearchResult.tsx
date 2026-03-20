import React from 'react'
import styles from './ResearchResult.module.scss'

export function ResearchResults({ children }: { children: React.ReactNode }) {
  return <div className={styles.results}>{children}</div>
}

export function ResearchResult({ percentage, text }: { percentage: string; text: string }) {
  const pct = Number(percentage) || 0
  return (
    <div className={styles.result}>
      <div className={styles.barWrapper}>
        <div
          className={styles.bar}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className={styles.resultValueGroup}>
        <span className={styles.value}>{pct}%</span>
        <span className={styles.text}>{text}</span>
      </div>
    </div>
  )
}
