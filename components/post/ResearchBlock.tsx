'use client'

import React from 'react'
import { Star, StarHalf, ChatText, ClipboardText } from '@phosphor-icons/react'
import styles from './ResearchBlock.module.scss'

interface ResearchBlockProps {
  variant: 'quote' | 'rating'
  label?: string
  question: string
  children?: React.ReactNode
  rating?: number | string
  maxRating?: number | string
}

function toNumber(value: unknown): number | null {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    const n = parseFloat(value)
    return isNaN(n) ? null : n
  }
  return null
}

function RatingStars({ rating, maxRating }: { rating: number; maxRating: number }) {
  const full = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  const empty = maxRating - full - (hasHalf ? 1 : 0)

  return (
    <>
      {Array.from({ length: full }, (_, i) => (
        <Star key={`f${i}`} size={24} weight="fill" color="#FDC23E" />
      ))}
      {hasHalf && <StarHalf key="h" size={24} weight="fill" color="#FDC23E" />}
      {Array.from({ length: Math.max(0, empty) }, (_, i) => (
        <Star key={`e${i}`} size={24} weight="regular" color="#FDC23E" />
      ))}
    </>
  )
}

const defaultLabels: Record<string, string> = {
  quote: 'Interview Quote',
  rating: 'Usability Tests',
}

export function ResearchBlock({
  variant,
  label,
  question,
  children,
  rating: ratingProp,
  maxRating: maxRatingProp = 7,
}: ResearchBlockProps) {
  const displayLabel = label ?? defaultLabels[variant] ?? ''
  const rating = toNumber(ratingProp)
  const maxRating = toNumber(maxRatingProp) ?? 7

  return (
    <div className={styles.researchBlock}>
      <div className={styles.header}>
        <i className={styles.icon} aria-hidden>
          {variant === 'quote'
            ? <ChatText size={24} color="#D61408" />
            : <ClipboardText size={24} color="#D61408" />
          }
        </i>
        <span className={styles.label}>{displayLabel}</span>
      </div>

      <p className={styles.question}>{question}</p>

      {variant === 'quote' && children && (
        <blockquote className={styles.quote}>
          {children}
        </blockquote>
      )}

      {variant === 'rating' && rating !== null && (
        <div className={styles.rating} aria-label={`${rating} out of ${maxRating}`}>
          <RatingStars rating={rating} maxRating={maxRating} />
        </div>
      )}
    </div>
  )
}
