exports.createPages = async ({ graphql, actions }) => {  
  const { createPage } = actions
  const result = await graphql(
    `
      {
        collections: allStrapiCollections {
          edges {
            node {
              strapiId
            }
          }
        }
      }
    `
  )
  
   if (result.errors) {
    throw result.errors
  }

  // Create blog articles pages.
  const collections = result.data.collections.edges
  collections.forEach((collection, index) => {
    createPage({
      path: `/collection/${collection.node.strapiId}`,
      component: require.resolve("./src/templates/collection.jsx"),
      context: {
        id: collection.node.strapiId,
      },
    })
  })
}