import { graphql } from 'gatsby'
import React from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import Works from "../components/works"
import Shots from "../components/shots"

import "../styles/styles.scss";

export const query = graphql
`
    query SITE_INDEX_QUERY {
      allMdx(
        sort: {order: ASC, fields: frontmatter___order}
        filter: {frontmatter: {published: {eq: true}}}
      ) {
        nodes {
          frontmatter {
            title
            aboutcompany
            project
            colorone
            colortwo
            slug
            gallery {
              childImageSharp {
                gatsbyImageData(layout: FIXED)
              }
              relativePath
            }
          }
          body
        }
      }
    }
`

const IndexPage = ({ data }) => {return (
    
  <Layout>
    
    <SEO title="Home" />

    <h1 className="page-intro">Hi, i'm <span>Danilo Nobre</span>, an interface designer focused on bringing results from user-centered experiences.</h1>
    
    <Shots></Shots>

    <Works layout="banner"></Works>

  </Layout>

)}

export default IndexPage
