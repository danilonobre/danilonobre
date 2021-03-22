import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import { StaticImage } from "gatsby-plugin-image"
import { Helmet } from "react-helmet"

import "../styles/styles.scss";

export const query = graphql
`
    query SITE_INDEX_QUERY {
        site {
          siteMetadata {
            title
            description
            email
            linkedin
            behance
            dribbble
          }
        }
        allMdx(sort: {order: ASC, fields: frontmatter___order}) {
          nodes {
            frontmatter {
              title
              aboutcompany
              project
              colorone
              colortwo
            }
            body
          }
        }
    }
`
// markup
const IndexPage = ({ data }) => {
  return (
    <div className="page-wrapper">

      <Helmet>
        <meta charSet="utf-8" />
        <title>{data.site.siteMetadata.title}</title>
        <link rel="canonical" href={data.site.siteMetadata.siteUrl} />
      </Helmet>

      <section className="page-intro">

        <header className="page-header">
        
          <StaticImage
            src="../images/danilonobre-ui-designer.png"
            alt={data.site.siteMetadata.title}
            placeholder="blurred"
            layout="fixed"
            width={160}
            height={160}
            className="page-logo"
          />
        
          <nav className="page-nav">

            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#works">Works</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>

          </nav>

        </header>

        <h1 dangerouslySetInnerHTML={{ __html: data.site.siteMetadata.description }}></h1>

      </section>

      <main className="page-main">

        <section className="block-works">
            
          {data.allMdx.nodes.map(({ body, frontmatter }) => (

              <article className="work" style={{backgroundImage: "linear-gradient(120deg, "+frontmatter.colorone+", "+frontmatter.colortwo+" 72.55%)"}}>

                  <h2 className="work-title">{frontmatter.title}</h2>
                  <div>
                    <p>{frontmatter.aboutcompany}</p>
                    <p>{frontmatter.project}</p>
                  </div>
                  <MDXRenderer>{body}</MDXRenderer>

              </article>
          ))}

        </section>

      </main>

      <footer className="page-footer">

        <h2 className="title">Get in touch</h2>
        <p className="intro-text">Want to discuss a project, collaborate or say hello?</p>

        <ul>
          <li><a href={data.site.siteMetadata.email}>Email</a></li>
          <li><a href={data.site.siteMetadata.linkedin}>linkedin</a></li>
          <li><a href={data.site.siteMetadata.behance}>behance</a></li>
          <li><a href={data.site.siteMetadata.dribbble}>dribbble</a></li>
        </ul>

      </footer>

    </div>
  )
}

export default IndexPage
