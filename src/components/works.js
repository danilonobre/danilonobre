import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Youtube from "../components/youtube"
//import Video from "../components/video"
import Slider from "react-slick";

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
}

const Works = ({ exclude, layout, ...props }) => {
  
    const data = useStaticQuery(graphql`

        query WorksQuery {
            allMdx(
                sort: {order: ASC, fields: frontmatter___order}
                filter: {frontmatter: { published: {eq: true}}}
            ) {
                nodes {
                    frontmatter {
                        title
                        aboutcompany
                        project
                        tags
                        colorone
                        colortwo
                        slug
                        mock {
                            childImageSharp {
                                gatsbyImageData(layout: FIXED, pngOptions: {quality: 100})
                            }
                        }
                        mockMobile {
                            childImageSharp {
                                gatsbyImageData(layout: FIXED, pngOptions: {quality: 100})
                            }
                        }
                        gallery {
                            childImageSharp {
                                gatsbyImageData(layout: FIXED, pngOptions: {quality: 100})
                            }
                        }
                    }
                    body
                }
            }
        }
    `)
  
    return (
  
        <section className={"block-works block-works-"+layout}>    

            {data.allMdx.nodes.map(({ body, frontmatter },index) => {

                if (layout === 'full') {
                    
                    return (

                        <article className="work" style={{backgroundImage: "linear-gradient(120deg, "+frontmatter.colorone+", "+frontmatter.colortwo+" 72.55%)"}} key={index}>

                            <h2 className="work-title"><Link to={"/"+frontmatter.slug+"/"}>{frontmatter.title}</Link></h2>
                        
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

                        </article>
                    
                    )

                }

                if (layout === 'banner') {

                    return (

                        <article className="work" style={{backgroundImage: "linear-gradient(120deg, "+frontmatter.colorone+", "+frontmatter.colortwo+" 72.55%)"}} key={index}>
                            
                            <Link to={"/"+frontmatter.slug+"/"}>

                                <div className="work-info">

                                    <div className="work-text">

                                        <h2 className="work-title">{frontmatter.title}</h2>
                                    
                                        {frontmatter.project && <div className="work-description"><p>{frontmatter.project}</p></div> }

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

                                <div className="work-mock">
                                            
                                    <img
                                        src={frontmatter.mock.childImageSharp.gatsbyImageData.images.fallback.src}
                                        alt={frontmatter.title}
                                        className="only-desktop"
                                    />

                                    <img
                                        src={frontmatter.mockMobile.childImageSharp.gatsbyImageData.images.fallback.src}
                                        alt={frontmatter.title}
                                        className="only-mobile"
                                    />

                                </div>

                            </Link>

                        </article>
    
                    )

                }

                return null
            
            })}

        </section>

    )

}
  
export default Works