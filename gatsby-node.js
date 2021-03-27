exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions
  
    const workTemplate = require.resolve(`./src/templates/work.js`)
  
    const result = await graphql(`
      {
        allMdx(
          sort: { order: DESC, fields: [frontmatter___order] }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                slug
              }
            }
          }
        }
      }
    `)
  
    // Handle errors
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }
  
    result.data.allMdx.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.slug,
        component: workTemplate,
        context: {
          // additional data can be passed via context
          slug: node.frontmatter.slug,
        },
      })
    })
}