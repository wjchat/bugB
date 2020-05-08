import React, {useEffect} from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Landing from '../components/home';
import Text from '../components/LandingText';
import LandingProducts from '../components/LandingProducts';
import NewFeatured from '../components/newFeatured';


const IndexPage = () => {  
return(
  <Layout>
    <SEO title="Home" />
    <Landing />
     <NewFeatured/>
     <Text />
     <LandingProducts />
  </Layout>
)}

export default IndexPage
