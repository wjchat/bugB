import React,{useEffect, useState} from 'react'
import "../styles/collectionsTemplate.scss"
import externalLink from '../images/externalLink.svg';
import letterX from '../images/letter-x.svg';
import gsap from "gsap";
import ReactMarkdown from "react-markdown" 
import Magnifier from "react-magnifier";

const ArticleDeats = props =>{
    const item = props.item
    return(<div className = "deatsContainer" >
        <div className = "deatsImageContainer">
           <img onClick = {()=>props.updateArticle(null)} className = "small" src={letterX} alt=""/>
            <img src={item.image.publicURL} alt=""  />
            <a className = "small"  target = "_blank" href={item.link}>
               <img src={externalLink} alt=""/>
           </a>
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
    const [selected, updateSelected] = useState(false)
    useEffect(()=>{
        if(props.active != null){
            if(props.active.name != props.item.name){
                updateSelected(false)
                gsap.set(animate,{
                    cursor: "pointer",
                })
            }
        } else{
            updateSelected(false)
            gsap.set(animate,{
                cursor: "pointer",
            })
        }
    }, [props.active])
    
    useEffect(()=>{
        if(selected){
            gsap.set(animate,{
                cursor: "default",
            })
            if(props.canUpdate){
                    if(selected){
                        props.updateArticle(props.item)
            }
            else{
                        props.updateArticle(null)
                        gsap.set(animate,{
                            cursor: "pointer",
                        })
                }
            }
        }
    }, [selected])
    useEffect(()=>{
        if(props.item.soldOut){
            gsap.set(animate, {
                pointerEvents: "none",
            })
        }
    }, [props.item.soldOut])
    return(<div className = "article">
        <div 
           ref = {div=>animate=div}
            onClick = {()=> {
                if(props.canUpdate){
                        updateSelected(true)
                    }
                }
            }
           className = "imgContainer">
           
            <img src={props.item.image.publicURL} alt={props.item.name}/>
            {!props.item.soldOut ? 
            "" : 
            <div className = "soldOut"><h3>Sold Out</h3></div> 
            }
        </div>
           
            
        <div className = "title">
            <h3>{props.item.name}</h3>
        </div>
    </div>)
}
const CollectionArticle = props =>{
    let animate
    const [articleDeats, updateArticle] = useState(null)
    const [canUpdate, updateCanUpdate] = useState(true)
    const handleUpdate = (article) =>{
        console.log(article)
        if(canUpdate){
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


    }
    return(<div className = "collectionArticleContainer">
        <div ref = {div=>animate=div} className = "imageContainer">
            <Magnifier 
            mgShape = "circle"
            mgBorderWidth = {0}
            mgWidth = {150}
            mgHeight = {150}
            zoomFactor = "1.5"
            src = {props.item.image.publicURL} alt=""/>
            <span className = "invisible">
            {articleDeats === null ? "" : 
            <ArticleDeats updateArticle = {(article) => handleUpdate(article)} item = {articleDeats} />
            }
            </span>
        </div>
        <div className = "articleContainer">
            {props.item.clothing_pieces.map((item)=>
                <div className = "articleBox"><Article 
                                active = {articleDeats}
                                canUpdate = {canUpdate}  
                                updateArticle = {(article)=>handleUpdate(article)} 
                                item = {item} /></div>
                                 )}
        </div>
    </div>)
}

export default CollectionArticle