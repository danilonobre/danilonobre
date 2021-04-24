import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Shots = ({...props}) => {

    const data = useStaticQuery(graphql`

        query ShotsQuery {
            allMdx(
                sort: {order: ASC, fields: [frontmatter___order]}
                filter: {fileAbsolutePath: {regex: "/(shots)/"}}
            ) {
                nodes {
                    frontmatter {
                        hover
                        shot {
                            childImageSharp {
                                gatsbyImageData(layout: FIXED, pngOptions: {quality: 100})
                            }
                        }
                        hoverimage {
                            childImageSharp {
                                gatsbyImageData(layout: FIXED, pngOptions: {quality: 100})
                            }
                        }
                    }
                }
            }
        }
    `)
  
    return (
  
        <section className={"block-shots"}>
            
            {data.allMdx.nodes.map(({ frontmatter },index) => {

                return (

                    <article className={'shot '+frontmatter.hover} key={index}>

                        <img src={frontmatter.shot.childImageSharp.gatsbyImageData.images.fallback.src} alt={index} />

                        {frontmatter.hoverimage &&

                            <img className="shot-hover" src={frontmatter.hoverimage.childImageSharp.gatsbyImageData.images.fallback.src} alt={index} />

                        }

                    </article>

                )

            })}

        </section>

    )

}
  
export default Shots