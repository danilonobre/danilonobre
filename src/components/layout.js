import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "../components/header"
import Footer from "../components/footer"

const Layout = ({ children, wrapperClass }) => {
  
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          author
          email
          linkedin
          behance
          dribbble
        }
      }
    }
  `)

  return (

    <div className={"page-wrapper page-"+wrapperClass}>

      <Header siteTitle={data.site.siteMetadata?.title || `Title`} siteDescription={data.site.siteMetadata.description} siteNav={data.site.siteMetadata} />

      <main className="page-main">{children}</main>
      
      <Footer siteNav={data.site.siteMetadata} />
    
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout