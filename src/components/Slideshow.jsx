import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function Gallery({ media, slideshow }) {
  return (
    <div className="gallery slideshow">
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
