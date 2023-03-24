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
            gatsbyImageData(layout: FIXED, pngOptions: {quality: 100})
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

    <div className="page-intro">
    
      <h1>Hi, I'm <span>Danilo Nobre</span>, a product designer focused on bringing results from user-centered experiences.</h1>
      
      <p>Currently <span className="role">Lead Product Designer</span> at <a className="outsystems" href="http://outsystems.com" target='_blank'>OutSystems</a>.</p>

    </div>

    <Works layout="banner"></Works>
    
  </Layout>

)}

export default IndexPage
