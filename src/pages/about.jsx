import React,{useEffect, useState} from 'react';
import Layout from "../components/layout.jsx"
import Insta from "../components/Insta.jsx"
import Values from "../components/values.jsx"
import "../styles/about.scss"
import {graphql, useStaticQuery} from "gatsby"


const AboutPage = props =>{
    return(<Layout>
        <div className = "aboutContainer">
            <h1>About Us</h1>
            <Values />
            <Insta />
        </div>
    </Layout>)
}

export default AboutPage