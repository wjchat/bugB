import React,{useState, useEffect, useCallback} from 'react';
import "../styles/landingProducts.scss"
import {useStaticQuery, graphql} from "gatsby"
import gsap from 'gsap'
import { OutboundLink } from "gatsby-plugin-google-analytics"
import Img from "gatsby-image"


const LandingCard = props =>{
    let animate
    let top
    let duration = .2
    const [hovering, updateHover] = useState(false)
    const [topIn, updateTopIn] = useState(null)
    
    //initialize ref and give it to state
    useEffect(()=>{
        if(top){
            updateTopIn(top)
        }
    }, [top])
    
    //top image fades in while hovering over container. otherwise, fades out.
    const showTop  = useCallback((b)=>{
        if(!topIn){
            alert("oops")
            return
        }
        let op = b === true ? 1 : 0;
        let blur = b === true ? 0 : 2;
        gsap.to(topIn, .3,{
            opacity: op,
            filter: `blur(${blur}px)`,
        })
        console.log(topIn)
    }, [topIn])
    return(<div className = {props.className}>
       <div>
          {props.item.soldOut ? <div className = "soldOut">
              <h3>Sold Out</h3>
          </div> : ""}
           <OutboundLink href={props.item.link} 
               target = "_blank"
               className = "link"
               >
               <div className = "imgContainer" ref = {div=>animate=div}
                    onMouseEnter = {()=>showTop(true)}
                    onMouseLeave = {()=>showTop(false)}
                   >
                    <Img 
                    fluid={props.item.image.childImageSharp.fluid} alt={props.item.name}/>     
                    <div className = "top" ref = {div=>top=div}>      
                   <Img
                    fluid={props.item.image2.childImageSharp.fluid} alt={props.item.name}/> 
                    </div>
                </div>
            </OutboundLink>
            <h1>{props.item.name}</h1>
            <h2><span>Size: {props.item.size != undefined ? <span>{props.item.size}</span> : <span>N/A</span>}</span>
            <span>${props.item.price}</span>
            </h2>
        </div>
    </div>)
}
const LandingProducts = props =>{
    const data = useStaticQuery(graphql`
    query landingCollection {
      allStrapiCollections {
        edges {
          node {
            id
            clothing_pieces {
                name
                price
                link
                size
                soldOut
                image {
                  childImageSharp {
                    fluid(quality: 90) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
                image2{
                  childImageSharp {
                    fluid(quality: 90) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
            }
            }
          }
        }
      }
    }
`)
    const allCol = data.allStrapiCollections.edges;
    const recentCol = allCol[allCol.length - 1]
    const clothing = recentCol.node.clothing_pieces
    useEffect(()=>{
        for(let each of clothing){
//            console.log(each.Piece[0])
        }
    })
    return(<div className = "productsContainer">
        <h1>From the most recent collection</h1>
        <div className = "flexbox">
            {clothing.map((item) =>
                <LandingCard className = "item" key = {item.name} item = {item} />
            )}
        </div>
    </div>)
}
export default LandingProducts