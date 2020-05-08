import React,{useEffect, useState} from 'react';
import "../styles/collections.scss"
import {useStaticQuery, graphql, Link} from "gatsby"
import {gsap, Power2} from "gsap";
import TransitionLink from 'gatsby-plugin-transition-link'




const CollectionCard = props =>{
    let animate
    const [hovering, updateHover] = useState(false);
    useEffect(()=>{
        if(hovering){
            gsap.to(animate.getElementsByClassName("image"), .2,{
                scale: 1.05,
                ease: Power2.easeOut,
            })            
            gsap.to(animate.getElementsByClassName("name"), .2,{
                scale: 1.1,
                ease: Power2.easeOut,
            })
            gsap.to(animate.getElementsByClassName("overlay"), .2,{
                backgroundColor: "rgba(0,0,0,.6)"
            })
        } else{
            gsap.to(animate.getElementsByClassName("image"), .2,{
                scale: 1.1,
                ease: Power2.easeOut,
            })            
            gsap.to(animate.getElementsByClassName("name"), .2,{
                scale: 1,
                ease: Power2.easeOut,
            })
            gsap.to(animate.getElementsByClassName("overlay"), .2,{
                backgroundColor: "rgba(0,0,0,.1)"
            })
        }
    }, [hovering])
    useEffect(()=>{
        console.log(props.transitionOut)
    })
    return(<div ref = {div=>animate=div} className = {props.className}
       onMouseEnter = {()=>updateHover(true)}
       onMouseLeave = {()=>updateHover(false)}
       >
       <TransitionLink 
        exit = {{
                        trigger: () => props.transitionOut(),
                        length: 4,
                  }}
        entry = {{
                      delay: .5,
                  }}
       className = "link" to = {`collection/${props.item.strapiId}`}>
        <div className = "overlay">
            <h2 className = "name">{props.item.name}</h2>
        </div>
        <img className = "image" src={props.item.cover.publicURL} alt=""/>
        </TransitionLink>
    </div>)
}
const Collections = props =>{
    const data = useStaticQuery(graphql`
query collections {
  allStrapiCollections {
    edges {
      node {
        name
        strapiId
        cover {
          publicURL
        }
      }
    }
  }
}
`)
    const allCollections = data.allStrapiCollections.edges
    let passProps
    const [pageTrans, updateTrans] = useState(null)
    useEffect(()=>{
        updateTrans(passProps.transitionOut)
    })
    
    return(<div ref = {div=>passProps=div} className = "collectionsContainer">
        <div className = "header">
            <h1 className = "title">Collections & Lookbooks</h1>
            <div className = "flexbox">
                {allCollections.map((item) =>
                    <CollectionCard transitionOut = {pageTrans} className = "collection" item = {item.node} />
                )}
            </div>
        </div>
    </div>)
}

export default Collections