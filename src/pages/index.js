import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import { StaticImage } from "gatsby-plugin-image"
import { Helmet } from "react-helmet"
import Video from "../components/video"
import Contacts from "../components/contacts"
import Slider from "react-slick";


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
              theme
              video
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
const SliderSettings = {
  dots: false,
  infinite: false,
  variableWidth: true,
  speed: 500,
  slidesToScroll: 1,
  centerMode: true,
};

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

            <Contacts
              data={data.site.siteMetadata}
              showLabel={false}
            />

          </nav>

        </header>

        <h1 dangerouslySetInnerHTML={{ __html: data.site.siteMetadata.description }}></h1>

      </section>

      <main className="page-main">

        <section className="block-works">
            
          {data.allMdx.nodes.map(({ body, frontmatter },index) => (

              <article className={"work "+ frontmatter.theme} style={{backgroundImage: "linear-gradient(120deg, "+frontmatter.colorone+", "+frontmatter.colortwo+" 72.55%)"}} key={index}>

                  <h2 className="work-title">{frontmatter.title}</h2>
                
                  <div className="work-description">
                    {frontmatter.aboutcompany && <p>{frontmatter.aboutcompany}</p> }
                    {frontmatter.project && <p>{frontmatter.project}</p> }
                  </div>

                  <Video
                    videoSrcURL={frontmatter.video}
                    videoTitle={frontmatter.title}
                  />

                  <Slider {...SliderSettings}>
                    
                    {frontmatter.gallery.map((item,index) =>
                      
                      <>
                        
                        {item.childImageSharp.gatsbyImageData.images.fallback.src.includes('mobile')
                        
                          ?
                          
                            <div className="work-image work-image-mobile" key={index}>
                          
                              <img
                                src={item.childImageSharp.gatsbyImageData.images.fallback.src}
                                alt={frontmatter.title}
                              />
                              
                            </div>
                        
                          :
                          
                            <div className="work-image" key={index}>
                          
                              <img
                                src={item.childImageSharp.gatsbyImageData.images.fallback.src}
                                alt={frontmatter.title}
                              />
                              
                            </div>
                        
                        }

                      </>
                      
                    )}

                  </Slider>

                  <MDXRenderer>{body}</MDXRenderer>

              </article>
          ))}

        </section>

      </main>

      <footer className="page-footer">

        <h2 className="title">Get in touch</h2>
        <p className="intro-text">Want to discuss a project, collaborate or say hello?</p>

        <Contacts
          data={data.site.siteMetadata}
          showLabel={true}
        />

      </footer>

    </div>
  )
}

export default IndexPage
