
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
        <meta property="og:image" content={frontmatter.socialImage.childImageSharp.gatsbyImageData.images.fallback.src} />
        <meta property="og:image:type" content="image/png"></meta>
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta property="og:title" content={frontmatter.title+" | Danilo Nobre UI/UX Designer"} />
        <meta property="og:description" content={frontmatter.project} />
        <meta property="twitter:description" content={frontmatter.project} />
      </Helmet>

      <section className="block-works block-works-full">

        <article className="work" style={{backgroundImage: "linear-gradient(120deg, "+frontmatter.colorone+", "+frontmatter.colortwo+" 72.55%)"}}>

          <h1>{frontmatter.title} - {frontmatter.socialimage}</h1>
                     
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
        gallery {
          childImageSharp {
            gatsbyImageData(layout: FIXED)
          }
          relativePath
        }
        socialImage {
          childImageSharp {
              gatsbyImageData(layout: FIXED)
          }
        }
      }
      body
    }
  }
`