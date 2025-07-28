exports.createPages = async ({ actions, graphql, reporter }) => {

    const { createPage } = actions

    const path = require("path")
    const workTemplate = path.resolve("./src/templates/work.js")
  
    const result = await graphql(`
    {
      allContentfulWorks {
        nodes {
          slug
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('Error loading MDX result', result.errors)
  }

  result.data.allContentfulWorks.nodes.forEach((work) => {
    createPage({
      path: `/${work.slug}/`,
      component: require.resolve(`./src/templates/work.js`),
      context: {
        slug: work.slug,
      },
    })
  })
  
}