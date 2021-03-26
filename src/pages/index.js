import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import Layout from "../components/layout"
import Youtube from "../components/youtube"
import Video from "../components/video"
import Slider from "react-slick";
import SEO from "../components/seo"

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
            theme
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
    
    <Layout>

      <SEO title="Danilo Nobre" />

      <section className="block-works">
          
        {data.allMdx.nodes.map(({ body, frontmatter },index) => (

            <article className={"work "+ frontmatter.theme} style={{backgroundImage: "linear-gradient(120deg, "+frontmatter.colorone+", "+frontmatter.colortwo+" 72.55%)"}} key={index}>

                <h2 className="work-title">{frontmatter.title}</h2>
              
                <div className="work-description">
                  {frontmatter.aboutcompany && <p>{frontmatter.aboutcompany}</p> }
                  {frontmatter.project && <p>{frontmatter.project}</p> }
                </div>

                {frontmatter.youtube &&

                  <Youtube
                    videoSrcURL={frontmatter.youtube}
                    videoTitle={frontmatter.title}
                    divClass="work-video"
                  />

                }

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

                <div className="work-body"><MDXRenderer>{body}</MDXRenderer></div>

            </article>
        ))}

      </section>

    </Layout>

  )
}

export default IndexPage
