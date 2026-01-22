import React, { useState } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import PasswordGate from "../components/PasswordGate"
import LazyContent from "../components/LazyContent"
import WorkContent from "../components/WorkContent"
import Seo from "../components/seo"
import Figma from "../components/figma"

function WorkTemplate({ data, pageContext }) {
  const { restricted, slug } = pageContext
  const [authorized, setAuthorized] = useState(false)

  const work = data.contentfulWorks
  const isFigmaWork = Boolean(work?.figma)

  const shouldShowGate = restricted && !authorized

  const Gate = (
    <>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <PasswordGate
        slug={slug}
        password={work.accessPassword || null}
        onAuthorized={() => setAuthorized(true)}
      />
    </>
  )

  if (isFigmaWork) {
    if (shouldShowGate) return Gate

    return (
      <>
        <Seo title={work.title} />
        <Helmet>
          <meta name="robots" content="nofollow" />
          <meta name="googlebot" content="noindex" />
          <body className="new-class-for-body" />
        </Helmet>

        <Figma url={work.figma} urlMobile={work.figmaMobile} />
      </>
    )
  }

  return (
    <Layout wrapperClass="work">
      {shouldShowGate ? (
        Gate
      ) : (
        <LazyContent
          importFn={() =>
            Promise.resolve({
              default: () => <WorkContent work={work} restricted={restricted} />,
            })
          }
        />
      )}
    </Layout>
  )
}

export const query = graphql`
  query WorkById($id: String!) {
    contentfulWorks(id: { eq: $id }) {
      title
      color
      figma
      figmaMobile
      introtext {
        introtext
      }

      slug
      accessPassword
      project
      timeline
      role
      cover {
        gatsbyImageData(width: 1600)
        description
      }
      body {
        raw
        references {
          __typename

          ... on ContentfulAsset {
            contentful_id
            title
            description
            url
          }

         ... on ContentfulGallery {
            contentful_id
            slideshow
            media {
              gatsbyImageData(width: 1200)
              description
            }
          }

        }
      }

    }
  }
`

export default WorkTemplate
