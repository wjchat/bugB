import React,{useState, useEffect} from 'react';
import "../styles/landingProducts.scss"
import {useStaticQuery, graphql} from "gatsby"
import gsap from 'gsap'
import { OutboundLink } from "gatsby-plugin-google-analytics"
import Img from "gatsby-image"


const LandingCard = props =>{
    let animate
    let duration = .2
    const [hovering, updateHover] = useState(false)
    const [showImg, updateShow] = useState(false)
    return(<div className = {props.className}>
       <div>
          {props.item.soldOut ? <div className = "soldOut">
              <h3>Sold Out</h3>
          </div> : ""}
           <OutboundLink href={props.item.link} 
               target = "_blank"
               onMouseEnter = {()=>updateHover(true)}
               onMouseLeave = {()=>updateHover(false)}
               className = "link"
               >
               <div className = "imgContainer" ref = {div=>animate=div}
                    onMouseEnter = {()=>updateShow(true)}
                    onMouseLeave = {()=>updateShow(false)}
                   >
                    <Img 
                    fluid={props.item.image.childImageSharp.fluid} alt={props.item.name}/>     
                                   
                   {showImg ? <Img className = "top"
                    fluid={props.item.image2.childImageSharp.fluid} alt={props.item.name}/> : ""}
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
                    fluid {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
                image2{
                  childImageSharp {
                    fluid {
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