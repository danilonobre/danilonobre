'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

interface SlideshowProps {
  children: React.ReactNode
  shadows?: boolean
  className?: string
}

/**
 * Slideshow — carrossel horizontal com Embla, replicando o Slideshow.jsx do Contentful.
 *
 * HTML gerado (idêntico ao original):
 *   <div class="gallery slideshow [has-shadows]">
 *     <div class="embla">
 *       <div class="embla__container">
 *         <div class="embla__slide">
 *           <figure class="slideshow__item" style="--image-max-width: Xpx">
 *             <img ... />
 *             <figcaption>alt</figcaption>
 *           </figure>
 *         </div>
 *       </div>
 *     </div>
 *     <div class="embla__buttons">
 *       <button class="embla__button embla__button--prev [is-disabled]">...</button>
 *       <button class="embla__button embla__button--next [is-disabled]">...</button>
 *     </div>
 *   </div>
 *
 * Diferença do original: cada filho (imagem markdown) é automaticamente
 * envolto em `embla__slide` + `figure.slideshow__item`.
 * O `--image-max-width` é calculado via onLoad, igual ao GalleryImage.
 *
 * Uso no MDX:
 *   <Slideshow>
 *     ![Descrição](./imagem1.png)
 *     ![Descrição](./imagem2.png)
 *   </Slideshow>
 *
 * Classes CSS: `.gallery`, `.slideshow`, `.embla*`, `.slideshow__item`, `.embla__button`
 * — definidas em `styles/_works.scss`. Não modificar.
 */
export function Slideshow({ children, shadows, className }: SlideshowProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false })
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const updateButtons = useCallback(() => {
    if (!emblaApi) return
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    updateButtons()
    emblaApi.on('select', updateButtons)
    emblaApi.on('reInit', updateButtons)
    return () => {
      emblaApi.off('select', updateButtons)
      emblaApi.off('reInit', updateButtons)
    }
  }, [emblaApi, updateButtons])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const classes = [
    'gallery',
    'slideshow',
    shadows ? 'has-shadows' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {React.Children.toArray(children)
            .flatMap((child) => {
              if (React.isValidElement(child) && child.type === 'p') {
                return React.Children.toArray((child.props as { children: React.ReactNode }).children)
              }
              return child
            })
            .filter((child) => !(typeof child === 'string' && child.trim() === ''))
            .map((child, index) => (
              <SlideshowSlide key={index}>{child}</SlideshowSlide>
            ))}
        </div>
      </div>

      <div className="embla__buttons">
        <button
          className={`embla__button embla__button--prev${!canPrev ? ' is-disabled' : ''}`}
          onClick={scrollPrev}
          disabled={!canPrev}
          aria-label="Previous"
          aria-disabled={!canPrev}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 28.5L7.5 18M7.5 18L18 7.5M7.5 18H28.5" stroke="#0C0C0C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          className={`embla__button embla__button--next${!canNext ? ' is-disabled' : ''}`}
          onClick={scrollNext}
          disabled={!canNext}
          aria-label="Next"
          aria-disabled={!canNext}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 18H28.5M28.5 18L18 7.5M28.5 18L18 28.5" stroke="#0C0C0C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

/**
 * SlideshowSlide — wrapper interno de cada slide.
 * Replica o `<div class="embla__slide"><figure class="slideshow__item">` do original.
 * Calcula --image-max-width via onLoad, igual ao Contentful original.
 */
function SlideshowSlide({ children }: { children: React.ReactNode }) {
  const slideRef = useRef<HTMLDivElement>(null)
  const [maxWidth, setMaxWidth] = useState<number | null>(null)

  useEffect(() => {
    const el = slideRef.current
    if (!el) return
    const img = el.querySelector('img')
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
    <div className="embla__slide" ref={slideRef}>
      <figure
        className="slideshow__item"
        style={maxWidth ? ({ '--image-max-width': `${maxWidth}px` } as React.CSSProperties) : undefined}
      >
        {children}
      </figure>
    </div>
  )
}
