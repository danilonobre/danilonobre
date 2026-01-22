import React from "react"
import Seo from "./seo"
import Moreworks from "./more-works"
import { Helmet } from "react-helmet"
import Figma from "./figma"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import Gallery from "./Gallery"
import Slideshow from "./Slideshow"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import "../styles/styles.scss"

export default function WorkContent({ work, restricted }) {
  const richTextOptions = {
    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = work.body.references.find(
            (ref) => ref.contentful_id === node.data.target.sys.id
        )
        if (!asset) return null
        const alt = asset.description
        return (
            <figure>
                <img src={asset.url} alt={alt} />
                {alt && <figcaption>{alt}</figcaption>}
            </figure>
        )
        },

        [INLINES.EMBEDDED_ENTRY]: (node) => {
        const entry = work.body.references.find(
            (ref) => ref.contentful_id === node.data.target.sys.id
        )

        if (!entry) return null

        if (entry.__typename === "ContentfulGallery") {
            if (entry.slideshow) {
                return <Slideshow media={entry.media} />
            }

            return <Gallery media={entry.media} shadows={entry.shadows} />
        }


        return null

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

          {work.cover && (
            <div className="work-cover">
                <GatsbyImage
                image={getImage(work.cover)}
                alt={work.cover.description || work.title}
                />
            </div>
            )}

            {work.introtext?.introtext && (
            <div className="work-intro">
                {work.introtext.introtext
                .split("\n")
                .map((line, i) => (
                    <p key={i}>{line}</p>
                ))}
            </div>
            )}


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
