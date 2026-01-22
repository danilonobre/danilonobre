import React from "react"
import Seo from "./seo"
import Moreworks from "./more-works"
import { Helmet } from "react-helmet"
import Figma from "./figma"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"

import "../styles/styles.scss"

export default function WorkContent({ work, restricted }) {
  const richTextOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = work.body.references.find(
          (ref) => ref.contentful_id === node.data.target.sys.id
        )
        if (!asset) return null
        const alt = asset.description || asset.title || "Image"
        return (
          <figure>
            <img src={asset.url} alt={alt} />
            {asset.title && <figcaption>{asset.title}</figcaption>}
          </figure>
        )
      },
    },
  }

  if (work.figma) {
    return (
      <>
        <Seo title={work.title} />
        <Helmet>
          <meta name="robots" content="nofollow" />
          <meta name="googlebot" content="noindex" />
        </Helmet>

        <Figma url={work.figma} urlMobile={work.figmaMobile} />
      </>
    )
  }

  return (
    <>
      <Seo title={work.title} />

      <section className="block-works block-works-full">

        <article className="work">
        
          <header
            className="work-header"
          >

            {restricted && (
            <div className="restricted-indicator">
                Restrict page

                <div className="tooltip">This study case aims to design demonstration only and does not intend to breach any NDA agreements or disclose sensitive information.</div>
            </div>
            )}


            <div className="work-wrapper">
              <h1>{work.title}</h1>
            </div>
          </header>

          <div className="work-body">
            {work.body?.raw &&
              documentToReactComponents(
                JSON.parse(work.body.raw),
                richTextOptions
              )}
          </div>
        
        </article>

      </section>

      <Moreworks exclude={work.slug} />
    </>
  )
}
