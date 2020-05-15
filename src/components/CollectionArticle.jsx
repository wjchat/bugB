import React,{useEffect, useState} from 'react'
import "../styles/collectionsTemplate.scss"
import externalLink from '../images/externalLink.svg';
import letterX from '../images/letter-x.svg';
import {gsap, Power2} from "gsap";
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
const Switcher = props =>{
    let anmt
    const [slot1, updateSlot1] = useState(null)
    const [slot2, updateSlot2] = useState(<img  className = "image" src = {props.item.image.publicURL} alt=""/>)
    const [animate, updateAnimate] = useState(null)
    useEffect(()=>{
        if(anmt != null){
            updateAnimate(anmt)
        }
    }, [anmt])
    useEffect(()=>{
        const duration = .3
        if(animate != null){
            if(slot1 === null){
                console.log('firing1')
               //get net frame ting
                let nextFrame
                if(props.articleDeats ===null){
                    nextFrame = <img  className = "image" src = {props.item.image.publicURL} alt=""/>
                } else{
                    nextFrame = <ArticleDeats updateArticle = {(article) => props.updateArticle(article)} item = {props.articleDeats} />
                }
                //animation
                let tl = gsap.timeline();
                tl.set(animate.getElementsByClassName("slot1")[0], {
                    opacity: 0,
                    pointerEvents: "all",
                })
                tl.set(animate.getElementsByClassName("slot2")[0],{
                    opacity: 1,
                    pointerEvents: "none",
                })
                //setup^
                tl.call(()=>updateSlot1(nextFrame))
                tl.to(animate.getElementsByClassName("slot1")[0], duration, {
                    opacity: 1,
                })
                tl.to(animate.getElementsByClassName("slot2")[0], duration, {
                    opacity: 0,
                }, `-=${duration}`)
                tl.call(()=>updateSlot2(null))
            }else if(slot2 === null){
                let nextFrame
                if(props.articleDeats ===null){
                    nextFrame = <img  className = "image" src = {props.item.image.publicURL} alt=""/>
                } else{
                    nextFrame = <ArticleDeats updateArticle = {(article) => props.updateArticle(article)} item = {props.articleDeats} />
                }
                //animation
                let tl = gsap.timeline();
                tl.set(animate.getElementsByClassName("slot2")[0], {
                    opacity: 0,
                    pointerEvents: "all",
                })
                tl.set(animate.getElementsByClassName("slot1")[0],{
                    opacity: 1,
                    pointerEvents: "none",
                })
                //setup^
                tl.call(()=>updateSlot2(nextFrame))
                tl.to(animate.getElementsByClassName("slot2")[0], duration, {
                    opacity: 1,
                })
                tl.to(animate.getElementsByClassName("slot1")[0], duration, {
                    opacity: 0,
                }, `-=${duration}`)
                tl.call(()=>updateSlot1(null))
            }
        }
}, [props.articleDeats, animate])
    return(<div ref = {div=>anmt=div} className = "switcherContain">
        <div className = "slot1">{slot1}</div>
        <div className = "slot2">{slot2}</div>
    </div>)
}
const CollectionArticle = props =>{
    let animate
    let fadeIn
    const [articleDeats, updateArticle] = useState(null)
    const [canUpdate, updateCanUpdate] = useState(true)
    const [fadeContain, updateFade] = useState(null)
    const [fade, triggerFade] = useState(false)
    
    useEffect(()=>{
        if(fadeIn != null){
            updateFade(fadeIn)
        }
    }, [fadeIn])
    useEffect(()=>{
        if(fadeContain != null){
            gsap.set(fadeContain,{
                opacity: 0,
                y: 40,
            })
            const scrollPos = fadeContain.offsetTop
            window.addEventListener("scroll", (e)=>{
                if(fadeContain.getBoundingClientRect().top <= window.innerHeight * .4){
                    triggerFade(true)
                }
            }, {passive: true})
        }
    }, [fadeContain])
    useEffect(()=>{
        if(fade){
            gsap.to(fadeContain, 1,{
                opacity: 1,
                y: 0,
                ease: Power2.easeOut
            })
        }
    }, [fade])
    const handleUpdate = (article) =>{
        updateArticle(article)
    }
    return(<div ref = {div=>fadeIn=div} className = "collectionArticleContainer">
        <div ref = {div=>animate=div} className = "imageContainer">
           <Switcher 
           item = {props.item}
           updateArticle = {(newArt)=>updateArticle(newArt)}
           articleDeats = {articleDeats}
           />
        </div>
        <div className = "articleContainer">
           <div className = "flexBox">
            {props.item.clothing_pieces.map((item)=>
                <div className = "articleBox"><Article 
                                active = {articleDeats}
                                canUpdate = {canUpdate}  
                                updateArticle = {(article)=>handleUpdate(article)} 
                                item = {item} /></div>
                                 )}
            </div>
        </div>
    </div>)
}



export default CollectionArticle