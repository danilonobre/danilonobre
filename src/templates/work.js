
import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from "../components/layout"
import SEO from "../components/seo"
import Youtube from "../components/youtube"
//import Video from "../components/video"
import Slider from "react-slick";
import Moreworks from "../components/more-works"
import { Helmet } from "react-helmet"


import "../styles/styles.scss";

const SliderSettings = {
  dots: false,
  infinite: false,
  variableWidth: true,
  speed: 500,
  slidesToScroll: 1,
  centerMode: true,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        variableWidth: false,
        centerPadding: '20px'
      }
    }
  ],
};

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { mdx } = data // data.mdx holds your post data
  const { body, frontmatter } = mdx
  return (

    <Layout>
      
      <SEO title={frontmatter.title} />

      <Helmet>
        {frontmatter.socialImage && <meta property="og:image" content={frontmatter.socialImage.childImageSharp.gatsbyImageData.images.fallback.src} /> }
        <meta property="og:image:type" content="image/png"></meta>
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta property="og:title" content={frontmatter.title+" | Danilo Nobre UI/UX Designer"} />
        <meta property="og:description" content={frontmatter.project} />
        <meta property="twitter:description" content={frontmatter.project} />
      </Helmet>

      <section className="block-works block-works-full">

        <article className="work">

          <header className="work-header" style={{backgroundImage: "linear-gradient(120deg, "+frontmatter.colorone+", "+frontmatter.colortwo+" 72.55%)"}}>

            <div className="work-wrapper">

              <h1>{frontmatter.title}</h1>

              <div className="work-info">

                {frontmatter.timeline &&
                  <div className="work-timeline">
                    <i><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.0227 0.818176C13.0227 0.403963 12.6869 0.0681763 12.2727 0.0681763C11.8585 0.0681763 11.5227 0.403963 11.5227 0.818176V1.70454H6.47726V0.818176C6.47726 0.403963 6.14148 0.0681763 5.72726 0.0681763C5.31305 0.0681763 4.97726 0.403963 4.97726 0.818176V1.70454H3.27272C1.95476 1.70454 0.886353 2.77295 0.886353 4.0909V7.36363V15.5454C0.886353 16.8634 1.95476 17.9318 3.27272 17.9318H14.7273C16.0452 17.9318 17.1136 16.8634 17.1136 15.5454V7.36363V4.0909C17.1136 2.77295 16.0452 1.70454 14.7273 1.70454H13.0227V0.818176ZM15.6136 6.61363V4.0909C15.6136 3.60138 15.2168 3.20454 14.7273 3.20454H13.0227V4.0909C13.0227 4.50512 12.6869 4.8409 12.2727 4.8409C11.8585 4.8409 11.5227 4.50512 11.5227 4.0909V3.20454H6.47726V4.0909C6.47726 4.50512 6.14148 4.8409 5.72726 4.8409C5.31305 4.8409 4.97726 4.50512 4.97726 4.0909V3.20454H3.27272C2.78319 3.20454 2.38635 3.60138 2.38635 4.0909V6.61363H15.6136ZM2.38635 8.11363H15.6136V15.5454C15.6136 16.035 15.2168 16.4318 14.7273 16.4318H3.27272C2.78319 16.4318 2.38635 16.035 2.38635 15.5454V8.11363Z" fill="white"/></svg></i>
                    <span>{frontmatter.timeline}</span>
                  </div>
                }
                
                {frontmatter.role && 
                  <div className="work-role">
                    <i><svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.50679 4.85134C5.50679 3.47436 6.62306 2.35809 8.00004 2.35809C9.37702 2.35809 10.4933 3.47436 10.4933 4.85134C10.4933 6.22832 9.37702 7.34458 8.00004 7.34458C6.62306 7.34458 5.50679 6.22832 5.50679 4.85134ZM8.00004 0.858093C5.79463 0.858093 4.00679 2.64593 4.00679 4.85134C4.00679 7.05674 5.79463 8.84458 8.00004 8.84458C10.2054 8.84458 11.9933 7.05674 11.9933 4.85134C11.9933 2.64593 10.2054 0.858093 8.00004 0.858093ZM4.75679 9.77701C3.69772 9.77701 2.68202 10.1977 1.93314 10.9466C1.18427 11.6955 0.76355 12.7112 0.76355 13.7703V15.3919C0.76355 15.8061 1.09934 16.1419 1.51355 16.1419C1.92776 16.1419 2.26355 15.8061 2.26355 15.3919V13.7703C2.26355 13.109 2.52623 12.4748 2.9938 12.0073C3.46138 11.5397 4.09554 11.277 4.75679 11.277H11.2433C11.9045 11.277 12.5387 11.5397 13.0063 12.0073C13.4738 12.4748 13.7365 13.109 13.7365 13.7703V15.3919C13.7365 15.8061 14.0723 16.1419 14.4865 16.1419C14.9007 16.1419 15.2365 15.8061 15.2365 15.3919V13.7703C15.2365 12.7112 14.8158 11.6955 14.0669 10.9466C13.3181 10.1977 12.3024 9.77701 11.2433 9.77701H4.75679Z" fill="white"/></svg></i>
                    <span>{frontmatter.role}</span>
                  </div>
                }
                
                {frontmatter.link &&
                  <a className="work-link" href={frontmatter.link} target="_blank" rel="noreferrer">
                    <i><svg width="19" height="10" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.71205 2.87868C3.27466 2.31607 4.03772 2 4.83337 2H7.08337C7.49759 2 7.83337 1.66421 7.83337 1.25C7.83337 0.835786 7.49759 0.5 7.08337 0.5H4.83337C3.6399 0.5 2.49531 0.974106 1.65139 1.81802C0.80748 2.66193 0.333374 3.80653 0.333374 5C0.333374 6.19347 0.80748 7.33807 1.65139 8.18198C2.06926 8.59984 2.56533 8.93131 3.1113 9.15746C3.65726 9.38361 4.24243 9.5 4.83337 9.5H7.08337C7.49759 9.5 7.83337 9.16421 7.83337 8.75C7.83337 8.33579 7.49759 8 7.08337 8H4.83337C4.43941 8 4.0493 7.9224 3.68532 7.77164C3.32135 7.62087 2.99063 7.3999 2.71205 7.12132C2.14944 6.55871 1.83337 5.79565 1.83337 5C1.83337 4.20435 2.14944 3.44129 2.71205 2.87868ZM11.5834 0.5C11.1692 0.5 10.8334 0.835786 10.8334 1.25C10.8334 1.66421 11.1692 2 11.5834 2H13.8334C14.2273 2 14.6174 2.0776 14.9814 2.22836C15.3454 2.37913 15.6761 2.6001 15.9547 2.87868C16.2333 3.15726 16.4543 3.48797 16.605 3.85195C16.7558 4.21593 16.8334 4.60603 16.8334 5C16.8334 5.39397 16.7558 5.78407 16.605 6.14805C16.4543 6.51203 16.2333 6.84274 15.9547 7.12132C15.6761 7.3999 15.3454 7.62087 14.9814 7.77164C14.6174 7.9224 14.2273 8 13.8334 8H11.5834C11.1692 8 10.8334 8.33579 10.8334 8.75C10.8334 9.16421 11.1692 9.5 11.5834 9.5H13.8334C14.4243 9.5 15.0095 9.38361 15.5554 9.15746C16.1014 8.93131 16.5975 8.59984 17.0154 8.18198C17.4332 7.76412 17.7647 7.26804 17.9908 6.72207C18.217 6.17611 18.3334 5.59095 18.3334 5C18.3334 4.40905 18.217 3.82389 17.9908 3.27792C17.7647 2.73196 17.4332 2.23588 17.0154 1.81802C16.5975 1.40016 16.1014 1.06869 15.5554 0.842542C15.0095 0.616396 14.4243 0.5 13.8334 0.5H11.5834ZM6.33337 4.25C5.91916 4.25 5.58337 4.58579 5.58337 5C5.58337 5.41421 5.91916 5.75 6.33337 5.75H12.3334C12.7476 5.75 13.0834 5.41421 13.0834 5C13.0834 4.58579 12.7476 4.25 12.3334 4.25H6.33337Z" fill="white"/></svg></i>
                    <span>{frontmatter.link}</span>
                  </a>
                }
              
              </div>

              {frontmatter.tags && 

                <ul className="work-tags">

                    {frontmatter.tags.map((item,index) =>

                        <li key={index}>
                            {item}
                        </li>
                        
                    )}
                    
                </ul>

              }

            </div>

          </header>


            {frontmatter.aboutcompany &&
              <div className="work-text work-wrapper">
                <h3>Company</h3>
                <p>{frontmatter.aboutcompany}</p>
              </div>
            }

            {frontmatter.project &&
              <div className="work-text work-wrapper">
                <h3>Role</h3>
                <p>{frontmatter.project}</p>
              </div>
            }
          

          {frontmatter.youtube &&
            <Youtube
              videoSrcURL={frontmatter.youtube}
              videoTitle={frontmatter.title}
              divClass="work-video"
            />
          }

          <div className="work-body"><MDXRenderer>{body}</MDXRenderer></div>

          {frontmatter.gallery &&

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

          }

        </article>

      </section>

      <Moreworks exclude={frontmatter.slug}></Moreworks>

    </Layout>

  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        aboutcompany
        project
        colorone
        colortwo
        slug
        tags
        gallery {
          childImageSharp {
            gatsbyImageData(layout: FIXED, pngOptions: {quality: 100})
          }
          relativePath
        }
        socialImage {
          childImageSharp {
              gatsbyImageData(layout: FIXED, pngOptions: {quality: 100})
          }
        }
        timeline
        role
        link
      }
      body
    }
  }
`