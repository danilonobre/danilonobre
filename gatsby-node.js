exports.createPages = async ({ actions, graphql, reporter }) => {

    const { createPage } = actions

    const path = require("path")
    const workTemplate = path.resolve("./src/templates/work.js")
  
    const result = await graphql(`
      {
        allMdx(
          filter: {internal: {contentFilePath: {regex: "/works/"}}}
          sort: {frontmatter: {order: DESC}}
        ) {
          edges {
            node {
              frontmatter {
                slug
              }
              internal {
                contentFilePath
              }
            }
          }
        }
      }
  `)

  if (result.errors) {
    reporter.panicOnBuild('Error loading MDX result', result.errors)
  }

  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: `${workTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        slug: node.frontmatter.slug,
        id: node.id,
      },
    })
  })
}