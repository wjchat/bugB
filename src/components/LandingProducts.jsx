import React,{useState, useEffect} from 'react';
import "../styles/landingProducts.scss"
import products from './data'
import {useStaticQuery, graphql} from "gatsby"

const LandingCard = props =>{
    const [currentImage, updateImate] = useState(props.item.images.publicURL)
    return(<div className = {props.className}>
       <div>
           <a href={props.item.link} target = "__blank">
                <img 
                onMouseEnter = {()=>updateImate(props.item.images.publicURL)}
                onMouseLeave = {()=>updateImate(props.item.images.publicURL)}
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
              Piece {
                name
                price
                link
                size
                images {
                  publicURL
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
                <LandingCard className = "item" key = {item.Piece[0].name} item = {item.Piece[0]} />
            )}
        </div>
    </div>)
}
export default LandingProducts