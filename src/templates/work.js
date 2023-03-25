
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
                
                {frontmatter.project &&
             			 <div className="work-company">
                			<span>{frontmatter.project}</span>
              			</div>
            			}

                {frontmatter.timeline &&
                  <div className="work-timeline">
                    <i><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.0227 0.818176C13.0227 0.403963 12.6869 0.0681763 12.2727 0.0681763C11.8585 0.0681763 11.5227 0.403963 11.5227 0.818176V1.70454H6.47726V0.818176C6.47726 0.403963 6.14148 0.0681763 5.72726 0.0681763C5.31305 0.0681763 4.97726 0.403963 4.97726 0.818176V1.70454H3.27272C1.95476 1.70454 0.886353 2.77295 0.886353 4.0909V7.36363V15.5454C0.886353 16.8634 1.95476 17.9318 3.27272 17.9318H14.7273C16.0452 17.9318 17.1136 16.8634 17.1136 15.5454V7.36363V4.0909C17.1136 2.77295 16.0452 1.70454 14.7273 1.70454H13.0227V0.818176ZM15.6136 6.61363V4.0909C15.6136 3.60138 15.2168 3.20454 14.7273 3.20454H13.0227V4.0909C13.0227 4.50512 12.6869 4.8409 12.2727 4.8409C11.8585 4.8409 11.5227 4.50512 11.5227 4.0909V3.20454H6.47726V4.0909C6.47726 4.50512 6.14148 4.8409 5.72726 4.8409C5.31305 4.8409 4.97726 4.50512 4.97726 4.0909V3.20454H3.27272C2.78319 3.20454 2.38635 3.60138 2.38635 4.0909V6.61363H15.6136ZM2.38635 8.11363H15.6136V15.5454C15.6136 16.035 15.2168 16.4318 14.7273 16.4318H3.27272C2.78319 16.4318 2.38635 16.035 2.38635 15.5454V8.11363Z" fill="white"/></svg></i>
                    <span>{frontmatter.timeline}</span>
                  </div>
                }
              
              </div>

            </div>

          </header>


            {frontmatter.aboutcompany &&
              <div className="work-text work-wrapper">
                <p>{frontmatter.aboutcompany}</p>
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