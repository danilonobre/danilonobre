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
                filter: {frontmatter: {published: {eq: true}}}
            ) {
                nodes {
                    frontmatter {
                        title
                        project
                        colorone
                        colortwo
                        slug
                        timeline
                    }
                }
            }
        }
    `)
  
    return (
  
        <section className={"block-works block-works-"+layout}>    

            {data.allMdx.nodes.map(({ body, frontmatter },index) => {

                <article className="work" style={{backgroundImage: "linear-gradient(120deg, "+frontmatter.colorone+", "+frontmatter.colortwo+" 72.55%)"}} key={index}>
                    
                    <Link to={"/"+frontmatter.slug+"/"}>

                        <h3 className="work-title">{frontmatter.title}</h3>

                    </Link>

                </article>
            
            })}

        </section>

    )

}
  
export default Works