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
  /**
   * Helpers
   */

  const findReference = (node) => {
    const id = node?.data?.target?.sys?.id
    if (!id) return null

    return (
      work.body?.references?.find(
        (ref) => ref.contentful_id === id
      ) || null
    )
  }

  const isWhitespaceTextNode = (node) =>
    node?.nodeType === "text" && (node.value || "").trim() === ""

  const isCustomBlockEntry = (node) => {
    const entry = findReference(node)
    if (!entry) return false

    // aqui você expande no futuro
    return entry.__typename === "ContentfulGallery"
  }

  const renderCustomEntry = (entry) => {
    if (entry.__typename === "ContentfulGallery") {
      if (entry.slideshow) {
        return (
          <Slideshow
            media={entry.media}
            shadows={entry.shadows}
          />
        )
      }

      return (
        <Gallery
          media={entry.media}
          shadows={entry.shadows}
        />
      )
    }

    return null
  }

  const paragraphHasOnlyCustomBlock = (node) => {
    const meaningfulNodes = (node.content || []).filter(
      (n) => !isWhitespaceTextNode(n)
    )

    if (meaningfulNodes.length !== 1) return false

    const onlyNode = meaningfulNodes[0]

    const isEmbed =
      onlyNode.nodeType === INLINES.EMBEDDED_ENTRY ||
      onlyNode.nodeType === BLOCKS.EMBEDDED_ENTRY

    if (!isEmbed) return false

    return isCustomBlockEntry(onlyNode)
  }

  /**
   * Rich Text options
   */

  const richTextOptions = {
    renderNode: {
      /**
       * Remove <p> quando ele contém apenas um custom block
       */
      [BLOCKS.PARAGRAPH]: (node, children) => {
        if (paragraphHasOnlyCustomBlock(node)) {
          return <>{children}</>
        }

        return <p>{children}</p>
      },

      /**
       * Embedded assets (imagens soltas)
       */
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = findReference(node)
        if (!asset) return null

        const alt = asset.description

        return (
          <figure>
            <img src={asset.url} alt={alt} />
            {alt && <figcaption>{alt}</figcaption>}
          </figure>
        )
      },

      /**
       * Embedded entry inline
       */
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        const entry = findReference(node)
        if (!entry) return null

        return renderCustomEntry(entry)
      },

      /**
       * Embedded entry block
       */
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const entry = findReference(node)
        if (!entry) return null

        return renderCustomEntry(entry)
      }
    }
  }

  /**
   * Caso especial: página baseada em Figma
   */
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

  /**
   * Render padrão
   */
  return (
    <>
      <Seo title={work.title} />

      <section className="block-works block-works-full">
        <article className="work">
          <header className="work-header">
            {restricted && (
              <div className="restricted-indicator">
                Restrict page
                <div className="tooltip">
                  This study case aims to design demonstration only and does not intend to breach any NDA agreements or disclose sensitive information.
                </div>
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
