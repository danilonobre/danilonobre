import React from 'react'
import styles from './HypothesisStatement.module.scss'

interface HypothesisStatementProps {
  action: string
  alignment: string
  value: string
  outcome: string
  impact: string
  success: string
}

export function HypothesisStatement({
  action,
  alignment,
  value,
  outcome,
  impact,
  success,
}: HypothesisStatementProps) {
  return (
    <div className={styles.root}>
      <p className={styles.text}>
        We believe that{' '}
        <span className={`${styles.highlight} ${styles.purple}`}>
          {action}
        </span>{' '}
        will align with{' '}
        <span className={`${styles.highlight} ${styles.purple}`}>
          {alignment}
        </span>{' '}
        by{' '}
        <span className={`${styles.highlight} ${styles.purple}`}>
          {value}
        </span>
        . This solution is expected to{' '}
        <span className={`${styles.highlight} ${styles.blue}`}>
          {outcome}
        </span>
        , thereby{' '}
        <span className={`${styles.highlight} ${styles.blue}`}>
          {impact}
        </span>
        . We will know we are successful when{' '}
        <span className={`${styles.highlight} ${styles.green}`}>
          {success}
        </span>
        .
      </p>
    </div>
  )
}
