import React, { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function Slideshow({ media, shadows, className }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false
  })

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

    emblaApi.on("select", updateButtons)
    emblaApi.on("reInit", updateButtons)

    return () => {
      emblaApi.off("select", updateButtons)
      emblaApi.off("reInit", updateButtons)
    }
  }, [emblaApi, updateButtons])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className={`gallery slideshow ${shadows ? "has-shadows" : ""} ${className || ""}`}>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {media.map((img, index) => {
            const image = getImage(img)

            return (
              <div className="embla__slide" key={index}>
                <figure>
                  <GatsbyImage
                    image={image}
                    alt={img.description || ""}
                  />
                  {img.description && (
                    <figcaption>{img.description}</figcaption>
                  )}
                </figure>
              </div>
            )
          })}
        </div>
      </div>

      <div className="embla__buttons">
        <button
          className={`embla__button embla__button--prev ${!canPrev ? "is-disabled" : ""}`}
          onClick={scrollPrev}
          disabled={!canPrev}
          aria-label="Previous images"
          aria-disabled={!canPrev}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 28.5L7.5 18M7.5 18L18 7.5M7.5 18H28.5" stroke="#0C0C0C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          className={`embla__button embla__button--next ${!canNext ? "is-disabled" : ""}`}
          onClick={scrollNext}
          disabled={!canNext}
          aria-label="Next images"
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
