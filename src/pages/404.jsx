import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/404.scss"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div className ="notFound">
        <h1>404</h1>
    </div>
  </Layout>
)

export default NotFoundPage
