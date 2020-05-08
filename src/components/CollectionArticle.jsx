import React,{useEffect, useState} from 'react'
import "../styles/collectionsTemplate.scss"
import externalLink from '../images/externalLink.svg';
import gsap from "gsap";
import ReactMarkdown from "react-markdown" 
import Magnifier from "react-magnifier";

const ArticleDeats = props =>{
    const item = props.item
    return(<div className = "deatsContainer" >
        <div className = "deatsImageContainer">
            <img src={item.images.publicURL} alt=""/>
        </div>
        <div className = "name">
            <h2>{item.name}</h2>
        </div>
        <div className = "priceSize">
           <div>
                <h3>Size: {item.size ? <span>{item.size}</span> : <span>N/A</span>}</h3>
                <h3>${item.price}</h3>
            </div>
        </div>
        <div className = "dscr">
            <ReactMarkdown source={item.description} />
        </div>
    </div>)
}
const Article = props =>{
    let animate
    const [hovering, updateHover] = useState(false)
    useEffect(()=>{
        if(hovering){
            props.updateArticle(props.item.Piece[0])
            gsap.to(animate.getElementsByClassName("externalLink"), .1, {
                opacity: 1,
            }) }else{
                props.updateArticle(null)
                gsap.to(animate.getElementsByClassName("externalLink"), .1, {
                opacity: 0,
            })
        }
        
    }, [hovering])
    useEffect(()=>{
        if(props.item.soldOut){
            gsap.set(animate, {
                pointerEvents: "none",
            })
        }
    }, [props.item.soldOut])
    return(<div ref = {div=>animate=div} className = "article">
        <div 
            onMouseEnter = {()=>updateHover(true)}
           onMouseLeave = {()=>updateHover(false)}
           className = "imgContainer">
           
            <img src={props.item.Piece[0].images.publicURL} alt={props.item.Piece[0].name}/>
            {!props.item.soldOut ? <a href={props.item.Piece[0].link} className = {"externalLink"} target = "__blank">
                <img src={externalLink} alt="External Link"/>
            </a> : ""}
            {props.item.soldOut ? 
            <div className = "soldOut"><h3>Sold Out</h3></div> : "" 
            }
        </div>
           
            
        <div className = "title">
            <h3>{props.item.Piece[0].name}</h3>
        </div>
    </div>)
}
const CollectionArticle = props =>{
    let animate
    const [articleDeats, updateArticle] = useState(null)
    const handleUpdate = (article) =>{
        if(article != null){ 
            let tl = gsap.timeline();
            tl.call(()=>updateArticle(article))
            tl.to(animate.childNodes[0], .2,{
                opacity: 0,
            })
            tl.to(animate.childNodes[1], .2,{
                opacity: 1,
            }, 0)
        }else{
            let tl = gsap.timeline();
            tl.to(animate.childNodes[0], .2,{
                opacity: 1,
            })
            tl.to(animate.childNodes[1], .2,{
                opacity: 0,
            }, 0)
            tl.call(()=>updateArticle(article))
        }

    }
    return(<div className = "collectionArticleContainer">
        <div ref = {div=>animate=div} className = "imageContainer">
            <Magnifier 
            mgShape = "circle"
            mgBorderWidth = {0}
            mgWidth = {200}
            mgHeight = {200}
            zoomFactor = "2"
            src = {props.item.image.publicURL} alt=""/>
            <span className = "invisible">
            {articleDeats === null ? "" : 
            <ArticleDeats item = {articleDeats} />
            }
            </span>
        </div>
        <div className = "articleContainer">
            {props.item.clothing_pieces.map((item)=>
                <div className = "articleBox"><Article updateArticle = {(article)=>handleUpdate(article)} item = {item} /></div>
                                 )}
        </div>
    </div>)
}

export default CollectionArticle