'use client'

import { useRouter } from 'next/navigation'
import styles from './DevMode.module.scss'

const IconPlus = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 3V15M3 9H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export function CreatePostButton() {
  const router = useRouter()

  return (
    <div className={styles.toggleWrapper}>
      <button
        className={styles.toggle}
        onClick={() => router.push('/new')}
        aria-label="Create new post"
      >
        <IconPlus />
      </button>
      <span className={styles.tooltipWhite}>Create case</span>
    </div>
  )
}
