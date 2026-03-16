'use client'

import { DevModeToggle } from './DevModeToggle'
import { CreatePostButton } from './CreatePostButton'
import styles from './DevMode.module.scss'

export function DevToolbar() {
  return (
    <div className={styles.devToolbar}>
      <CreatePostButton />
      <DevModeToggle />
    </div>
  )
}
