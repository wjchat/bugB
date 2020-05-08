import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import LandingProducts from '../components/LandingProducts';
import Collections from '../components/Collections';


const CollectionsPage = () => (
  <Layout>
    <SEO title="Collections" />
    <Collections />
  </Layout>
)

export default CollectionsPage