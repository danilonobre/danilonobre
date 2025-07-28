import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Moreworks from "../components/more-works"
import { Helmet } from "react-helmet"
import Figma from "../components/figma"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import "../styles/styles.scss"

function WorkTemplate({ data }) {
  
  const work = data.contentfulWorks

  return (
    <>
      {work.figma ? (
        <>
          <Seo title={work.title} />

          <Helmet>
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="500" />
            <meta property="og:image:height" content="500" />
            <meta
              property="og:title"
              content={`${work.title} | Danilo Nobre Product Designer`}
            />
            <meta property="og:description" content={work.project} />
            <meta property="twitter:description" content={work.project} />
            <meta name="robots" content="nofollow" />
            <meta name="googlebot" content="noindex" />
            <body className="new-class-for-body" />
          </Helmet>

          <Figma url={work.figma} urlMobile={work.figmaMobile} />
        </>
      ) : (
        <Layout wrapperClass="work">
          <Seo title={work.title} />

          <Helmet>
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="500" />
            <meta property="og:image:height" content="500" />
            <meta
              property="og:title"
              content={`${work.title} | Danilo Nobre Product Designer`}
            />
            <meta property="og:description" content={work.project} />
            <meta property="twitter:description" content={work.project} />
          </Helmet>

          <section className="block-works block-works-full">
            <article className="work">
              <header
                className="work-header"
                style={{ backgroundColor: work.color }}
              >
                <div className="work-wrapper">
                  <h1>{work.title}</h1>

                  <div className="work-info">
                    {work.project && (
                      <div className="work-company">
                        <i>{/* ícone aqui */}</i>
                        <span>{work.project}</span>
                      </div>
                    )}

                    {work.timeline && (
                      <div className="work-timeline">
                        <i>{/* ícone aqui */}</i>
                        <span>{work.timeline}</span>
                      </div>
                    )}
                  </div>
                </div>
              </header>

              <div className="work-body">
                {work.body?.raw &&
                  documentToReactComponents(JSON.parse(work.body.raw))}
              </div>
            </article>
          </section>

          <Moreworks exclude={work.slug} />
        </Layout>
      )}
    </>
  )
}

export const pageQuery = graphql`
  query WorkBySlug($slug: String!) {
    contentfulWorks(slug: { eq: $slug }) {
      title
      color
      figma
      figmaMobile
      project
      timeline
      role
      slug
      body {
        raw
      }
    }
  }
`

export default WorkTemplate
