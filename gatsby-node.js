exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const path = require("path")
  const workTemplate = path.resolve("./src/templates/work.js")

  const result = await graphql(`
    {
      allContentfulWorks {
        nodes {
          id
          slug
          restricted
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild("Error loading Contentful works", result.errors)
    return
  }

  reporter.info(
    `[createPages] works found: ${result.data.allContentfulWorks.nodes.length}`
  )

  result.data.allContentfulWorks.nodes.forEach((work) => {
    const pagePath = `/${work.slug}/`
    reporter.info(`[createPages] creating: ${pagePath}`)

    createPage({
      path: pagePath,
      component: workTemplate,
      context: {
        id: work.id,
        slug: work.slug,
        restricted: work.restricted || false,
      },
    })
  })
}
