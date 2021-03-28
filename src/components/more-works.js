import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"

const Moreworks = ({ exclude, ...props }) => {
  
    const data = useStaticQuery(graphql`

        query MoreWorksQuery {
            allMdx(
                sort: {order: ASC, fields: frontmatter___order}
                filter: {frontmatter: { published: {eq: true}}}
            ) {
                nodes {
                    frontmatter {
                        title
                        project
                        colorone
                        colortwo
                        tags
                        slug
                        mock {
                            childImageSharp {
                                gatsbyImageData(layout: FIXED)
                            }
                        }
                        mockMobile {
                            childImageSharp {
                                gatsbyImageData(layout: FIXED)
                            }
                        }
                    }
                }
            }
        }
    `)
  
    return (
  
        <section className="block-works block-works-banner works-related">

            <h2>More works</h2>

            <div className="works">

                {data.allMdx.nodes.map(({ frontmatter },index) => {

                    if (frontmatter.slug !== exclude) {

                        return (

                            <article className="work" style={{backgroundImage: "linear-gradient(120deg, "+frontmatter.colorone+", "+frontmatter.colortwo+" 72.55%)"}} key={index}>
                            
                                <Link to={"/"+frontmatter.slug+"/"}>

                                    <div className="work-info">

                                        <div className="work-text">

                                            <h3 className="work-title">{frontmatter.title}</h3>
                                        
                                            {frontmatter.project && <div className="work-description"><p>{frontmatter.project}</p></div> }

                                        </div>

                                        {frontmatter.tags && 

                                            <ul className="work-tags">
            
                                                {frontmatter.tags.map((item,index) =>
                                            
                                                    <li>
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

                        );
                    
                    }

                    return null

                })}
                
            </div>

        </section>

    )

}
  
Moreworks.propTypes = {
    children: PropTypes.node.isRequired,
}
  
export default Moreworks