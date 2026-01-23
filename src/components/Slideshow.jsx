import React, { useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function Slideshow({ media, shadows }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className={`gallery slideshow ${shadows ? "has-shadows" : ""}`}>
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

      <button
        className="embla__button embla__button--prev"
        onClick={scrollPrev}
        aria-label="Previous images"
      >
        ←
      </button>

      <button
        className="embla__button embla__button--next"
        onClick={scrollNext}
        aria-label="Next images"
      >
        →
      </button>
    </div>
  )
}
