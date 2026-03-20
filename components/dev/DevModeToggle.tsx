'use client'

import { useDevMode } from './DevModeProvider'
import styles from './DevMode.module.scss'

const LockClosed = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.66667 7.33331V4.66665C4.66667 3.78259 5.01786 2.93474 5.64298 2.30962C6.2681 1.6845 7.11595 1.33331 8 1.33331C8.88406 1.33331 9.7319 1.6845 10.357 2.30962C10.9821 2.93474 11.3333 3.78259 11.3333 4.66665V7.33331M3.33333 7.33331H12.6667C13.403 7.33331 14 7.93027 14 8.66665V13.3333C14 14.0697 13.403 14.6666 12.6667 14.6666H3.33333C2.59695 14.6666 2 14.0697 2 13.3333V8.66665C2 7.93027 2.59695 7.33331 3.33333 7.33331Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const LockOpen = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.3333 4.66665C11.3333 3.78259 10.9821 2.93474 10.357 2.30962C9.7319 1.6845 8.88406 1.33331 8 1.33331C7.11595 1.33331 6.2681 1.6845 5.64298 2.30962C5.01786 2.93474 4.66667 3.78259 4.66667 4.66665M3.33333 7.33331H12.6667C13.403 7.33331 14 7.93027 14 8.66665V13.3333C14 14.0697 13.403 14.6666 12.6667 14.6666H3.33333C2.59695 14.6666 2 14.0697 2 13.3333V8.66665C2 7.93027 2.59695 7.33331 3.33333 7.33331Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export function DevModeToggle() {
  const ctx = useDevMode()
  if (!ctx) return null

  const handleClick = () => {
    if (ctx.devMode) {
      ctx.saveAndClose()
    } else {
      ctx.openDevMode()
    }
  }

  return (
    <div className={styles.toggleWrapper}>
      <button
        className={`${styles.toggle} ${ctx.devMode ? styles.toggleActive : ''}`}
        onClick={handleClick}
        disabled={ctx.saving}
        aria-label={ctx.devMode ? 'Save and close dev mode' : 'Enable dev mode'}
      >
        {ctx.saving ? (
          <span className={styles.spinner} />
        ) : ctx.devMode ? (
          <LockOpen />
        ) : (
          <LockClosed />
        )}
      </button>
      <span className={`${ctx.devMode ? `${styles.tooltip} ${styles.tooltipVisible}` : `${styles.tooltipWhite} ${styles.tooltipEnd}`}`}>
        {ctx.devMode ? 'Save changes' : 'Edit'}
      </span>
    </div>
  )
}
