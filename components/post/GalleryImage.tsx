'use client'

import React, { useEffect, useRef, useState } from 'react'

interface GalleryImageProps {
  src: string
  alt?: string
}

/**
 * GalleryImage — wrapper de imagem individual dentro de Gallery ou Slideshow.
 * Replica exatamente o HTML gerado pelo Gallery.jsx do Gatsby/Contentful:
 *
 *   <figure class="gallery__item" style="--image-max-width: Xpx">
 *     <img src="..." alt="..." />
 *     <figcaption>alt text</figcaption>   ← só se alt não for vazio
 *   </figure>
 *
 * O `--image-max-width` é definido com as dimensões naturais da imagem × 0.5,
 * replicando a lógica de `getVisualImageWidth(asset, ratio=0.5)` do Contentful.
 * É capturado via onLoad após a imagem carregar.
 *
 * Registrado no mdx-components.tsx como `img` — toda imagem markdown
 * dentro de <Gallery> ou <Slideshow> passa por aqui automaticamente.
 *
 * Classes CSS: `.gallery__item` — definida em `styles/_works.scss`. Não modificar.
 */
export function GalleryImage({ src, alt }: GalleryImageProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [maxWidth, setMaxWidth] = useState<number | null>(null)

  useEffect(() => {
    const img = imgRef.current
    if (!img) return

    const update = () => setMaxWidth(Math.round(img.naturalWidth * 0.5))

    if (img.complete && img.naturalWidth > 0) {
      update()
    } else {
      img.addEventListener('load', update)
      return () => img.removeEventListener('load', update)
    }
  }, [])

  return (
    <figure
      className="gallery__item"
      style={maxWidth ? ({ '--image-max-width': `${maxWidth}px` } as React.CSSProperties) : undefined}
    >
      <img ref={imgRef} className="gatsby-image-wrapper" src={src} alt={alt || ''} />
      {alt && <figcaption>{alt}</figcaption>}
    </figure>
  )
}
