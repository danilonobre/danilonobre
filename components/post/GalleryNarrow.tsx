import React from 'react'
import { Gallery } from './Gallery'

interface GalleryNarrowProps {
  children: React.ReactNode
  shadows?: boolean
  className?: string
}

/**
 * Mesma lógica da Gallery, mas com max-width: 960px (class gallery-narrow).
 */
export function GalleryNarrow({ children, shadows, className }: GalleryNarrowProps) {
  return (
    <Gallery narrow shadows={shadows} className={className}>
      {children}
    </Gallery>
  )
}
