import React, { useEffect } from "react"

import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import CollectionArticle from "../components/CollectionArticle"
import "../styles/collectionsTemplate.scss"

export const query = graphql`
  query CollectionQuery($id: Int!) {
    strapiCollections(strapiId: { eq: $id }) {
      strapiId
      name
      id
      description
    }
    allStrapiClothingImages {
      edges {
        node {
          collection {
            id
          }
          image {
            childImageSharp {
              fluid {
                src
              }
            }
          }
          clothing_pieces {
            soldOut
            description
            link
            name
            price
            size
            image {
              publicURL 
            }
          }
        }
      }
    }
  }
`
const CollectionTemplate = ({ data }) => {
  const collectionID = data.strapiCollections.strapiId
  const collectionName = data.strapiCollections.name
  const allImages = data.allStrapiClothingImages.edges
  const description = data.strapiCollections.description
  let collectionImages = []
  for (let each of allImages) {
    if (each.node.collection.id === collectionID) {
      collectionImages.push(each.node)
    }
  }
  return (
    <Layout>
      <SEO title={collectionName} />
      <div className="collectionTemplateContainer">
        <h1>{collectionName}</h1>
        <h3>{description}</h3>
        <div className="flexbox">
          {collectionImages.map(item => (
            <div className="flexItem">
              <CollectionArticle item={item} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default CollectionTemplate
