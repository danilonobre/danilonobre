import { graphql } from 'gatsby'
import React from 'react'
import Layout from "../components/layout"
import Seo from "../components/seo"
import Works from "../components/works"

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
        project
        color
        slug
      }
      body
    }
  }
}

`

const IndexPage = ({ data }) => {return (
    
  <Layout>
    
    <Seo title="Home" />

    <div className="page-intro">
    
      <h1>Hi, I'm <span>Danilo Nobre</span>, a product designer focused on bringing results from user-centered experiences.</h1>
      
      <p>Currently <span className="role">Lead Product Designer</span> at <a className="outsystems" href="http://outsystems.com" target="_blank" rel="noreferrer">OutSystems</a>.</p>

    </div>

    <Works />
    
  </Layout>

)}

export default IndexPage
