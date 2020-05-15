/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React,{useState, useEffect} from "react"
import PropTypes from "prop-types"
import Header from "./header"
import Footer from "./footer"
import LargeNav from './largeNav.jsx'
import {gsap, Power2} from 'gsap'
import { TransitionPortal } from "gatsby-plugin-transition-link";
import Logo from '../images/logo.svg'
import ScrollBar from './Scrollbar.jsx'
import ScrollPops from "./ScrollPops.jsx"



import "../styles/default.css"
import "../styles/layout.scss"

const LoadingIcon = () =>{
    let animate
//    useEffect(()=>{
//        let tl = gsap.timeline({repeat: -1});
//        let items = animate.getElementsByClassName("pop");
//        console.log(items)
//        tl.staggerTo(items, .3,{
//            opacity: 1,
//        }, .3)
//        tl.staggerTo(items, .3, {
//            opacity: 0,
//        }, .3)
//    })
    return(
        <div className = "contain" ref = {div=>animate=div}>
            <div className="pop pop5"></div>
            <div className="pop pop2"></div>
            <div className="pop pop8"></div>
            <div className="pop pop4"></div>
            <div className="pop pop6"></div>
            <div className="pop pop3"></div>
            <div className="pop pop7"></div>
            <div className="pop pop1"></div>
            <img src={Logo} alt=""/>
        </div>
        )
}

const Layout = ({ children }) => {
    let animate
    let front
    let passProps
    const [anOb, updateAn] = useState(null)
    const [frontTing, updateFront] = useState(null)
    useEffect(()=>{
        updateAn(animate)
        updateFront(front)
        for(let each of passProps.childNodes){
            each.transitionOut = () => transitionOut
        }
    })
    const[largeNav, toggleLarge] = useState(false);
    
    const transitionOut = () =>{
        let tl = gsap.timeline();
        tl.set(anOb,{
            width: 0,
            x: 0,
        })
       tl.to(anOb, .5, {
           width: "100vw",
           ease: Power2.easeIn
       })
        tl.set(frontTing, {
            display: "none"
        })
        tl.to(anOb.getElementsByClassName('contain'), .3,{
            opacity: 1,
        })
        tl.to(anOb, .5, {
            x: "100%" ,
            ease: Power2.easeIn,
        }, `+=1`)
    }
  return (
    <>
      <head>
       <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;1,200;1,300;1,400;1,500;1,600&display=swap');
        </style>
      </head>
      <div ref = {div=>front=div}>
      {largeNav ? <LargeNav transitionOut = {() => transitionOut()}   toggleNav = {() => toggleLarge(false)} /> :""}
      <Header
      transitionOut = {() => transitionOut()} 
       toggleNav = {() => toggleLarge(true)} />
      <main ref = {div=>passProps=div}>{children}</main>
      <Footer />
      <ScrollPops />
       </div>
      <TransitionPortal>
        <div ref = {div=>animate=div} className = "transitionPage">
            <div className = "contain">
                <LoadingIcon />
            </div>
        </div>
        </TransitionPortal>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
