import React,{useEffect, useState} from 'react';
import Layout from "../components/layout.jsx"
import Insta from "../components/Insta.jsx"
import Values from "../components/values.jsx"
import "../styles/about.scss"
import {graphql, useStaticQuery} from "gatsby"
import SEO from '../components/seo.js'


const AboutPage = props =>{
    return(<Layout>
       <SEO title = "about" />
        <div className = "aboutContainer">
            <h1>About Us</h1>
            <Values />
            <Insta />
        </div>
    </Layout>)
}

export default AboutPage