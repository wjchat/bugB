import React,{useEffect, useState} from 'react'
import "../styles/scrollPapi.scss"
import {gsap, Power2} from "gsap"

const ScrollPops =props=>{
    let animate
    const [tween, updateTween] = useState(null)
    const [numPop, updateNumPop] = useState(0)
    const [windowHeight, updateWindowHeight] = useState(null)
    useEffect(()=>{
        window.addEventListener("resize", ()=>{
            updateWindowHeight(window.innerHeight)
        })
    }, [])
    useEffect(()=>{
        if(windowHeight === null){
            updateWindowHeight(window.innerHeight)
        }else{
            let numPopz = Math.round(windowHeight / 15);
            updateNumPop(22);
        }
    }, [windowHeight])
    
    useEffect(()=>{
        if(animate != null && numPop != 0){
            
            //reset everything
//            for(let each of animate.childNodes){
//                gsap.set(each, {
//                    opacity: 0
//                })
//            }
            
            let tl = gsap.timeline({paused: true})
            tl.staggerTo(animate.childNodes, .05,{
                opacity: 1,
                ease: "none",
            }, .04)
        updateTween(tl)
        }
    }, [numPop, animate])
    
    useEffect(()=>{
        if(tween != null){
            //tween.progress(window.scrollY / (docHeight - winHeight))
            window.addEventListener("resize", ()=>{
//                console.log(window.scrollY / (docHeight - winHeight))
                tween.progress(window.scrollY / (document.body.clientHeight - window.innerHeight))
            })            
            window.addEventListener("scroll", ()=>{
//                console.log(window.scrollY / (docHeight - winHeight))
                tween.progress(window.scrollY / (document.body.clientHeight - window.innerHeight))
            })                       
        }
    }, [tween])
    return(<div ref = {div=>animate=div} className = "scrollPopContainer">
        {Array.apply(null, { length: numPop }).map((e, i) => (
                <img key = {i} className = "papi" src="https://img.icons8.com/ios-filled/50/000000/circled.png"/> 
))}
    </div>)
}

export default ScrollPops