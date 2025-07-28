import * as React from "react"
import { graphql } from "gatsby"

const WorkTemplate = ({ data }) => {
  const work = data.contentfulWorks

  return (
    <main className="work-page" style={{ backgroundColor: work.color }}>
      <h1>{work.title}</h1>
      
      {work.project && <p><strong>Projeto:</strong> {work.project}</p>}
      {work.timeline && <p><strong>Timeline:</strong> {work.timeline}</p>}

      {/* Se tiver Rich Text ou Imagens, a gente renderiza aqui depois */}

    </main>
  )
}

export const query = graphql`
  query WorkBySlug($slug: String!) {
    contentfulWorks(slug: { eq: $slug }) {
      title
      color
      project
      timeline
      slug
    }
  }
`

export default WorkTemplate