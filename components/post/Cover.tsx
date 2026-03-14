import React from 'react'
import Image from 'next/image'

interface CoverProps {
  src: string
  alt: string
  /** Base URL para resolver src relativo (ex: /works-asset/slug) */
  basePath?: string
}

/**
 * Imagem de capa isolada, max-width: 1280px, centralizada.
 */
export function Cover({ src, alt, basePath }: CoverProps) {
  const resolvedSrc = basePath && src.startsWith('./') ? `${basePath}/${src.slice(2)}` : src
  const isExternal = resolvedSrc.startsWith('http')
  return (
    <div className="work-cover">
      {isExternal ? (
        <img src={resolvedSrc} alt={alt} />
      ) : (
        <Image
          src={resolvedSrc.startsWith('/') ? resolvedSrc : `/${resolvedSrc}`}
          alt={alt}
          width={1280}
          height={720}
        />
      )}
    </div>
  )
}
