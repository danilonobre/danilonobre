import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { getVisualImageWidth } from "../utils/imageSizing"

export default function Gallery({ media, shadows, className }) {
  return (
    <div className={`gallery ${shadows ? "has-shadows" : ""} ${className || ""}`}>
      {media.map((img, index) => {
        const image = getImage(img)
        const visualWidth = getVisualImageWidth(img)

        return (
          <figure
            key={index}
            className="gallery__item"
            style={
              visualWidth
                ? { "--image-max-width": `${visualWidth}px` }
                : undefined
            }
          >
            <GatsbyImage image={image} alt={img.description || ""} />
            {img.description && <figcaption>{img.description}</figcaption>}
          </figure>
        )
      })}

    </div>
  )
}
