import React,{useState, useEffect} from 'react';
import "../styles/landingProducts.scss"
import products from './data'
import {useStaticQuery, graphql} from "gatsby"
import externalLink from "../images/newWindow.png"
import gsap from 'gsap'

const LandingCard = props =>{
    let animate
    let duration = .2
    const [hovering, updateHover] = useState(false)
    const [currentImage, updateImage] = useState(props.item.image.publicURL)
    useEffect(()=>{
        if(hovering){
            gsap.to(animate, duration,{
//                scale: 1.05,
            })
        }else{
            gsap.to(animate, duration,{
//                scale: 1,
            })
        }
    }, [hovering])
    return(<div className = {props.className}>
       <div>
          {props.item.soldOut ? <div className = "soldOut">
              <h3>Sold Out</h3>
          </div> : ""}
           <a href={props.item.link} 
               target = "_blank"
               onMouseEnter = {()=>updateHover(true)}
               onMouseLeave = {()=>updateHover(false)}
               className = "link"
               >
                <img 
                ref = {div=>animate=div}
                onMouseEnter = {()=>updateImage(props.item.image2.publicURL)}
                onMouseLeave = {()=>updateImage(props.item.image.publicURL)}
                src={currentImage} alt={props.item.name}/>
            </a>
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
                  publicURL
                }
                image2{
                publicURL
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