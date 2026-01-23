import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function Gallery({ media, shadows, className }) {
  return (
    <div className={`gallery ${shadows ? "has-shadows" : ""} ${className || ""}`}>
      {media.map((img, index) => {
        const image = getImage(img)
        return (
          <figure key={index}>
            <GatsbyImage image={image} alt={img.description || ""} />
            {img.description && <figcaption>{img.description}</figcaption>}
          </figure>
        )
      })}
    </div>
  )
}
