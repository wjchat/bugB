import React,{useEffect, useState} from 'react';
import {graphql, useStaticQuery} from "gatsby"
import gsap from "gsap"
import "../styles/insta.scss"
import { OutboundLink } from "gatsby-plugin-google-analytics"



const Post = props =>{
    let animate
    const [caption, updateCaption] = useState(null)
    const [date, updateDate] = useState(new Date(props.timestamp * 1000))
    const [hovering, updateHover] = useState(false)
    useEffect(()=>{
        let splitCaption = props.caption.split(' ');
        let newCaption = []
        for(let each of splitCaption){
            newCaption.push(each + " ");
        }
        let hashtagCount = 0;
        if(newCaption.length > 20){
            let revisedCaption = newCaption.slice(0, 20);
            revisedCaption.push("...")
            updateCaption(revisedCaption);
        }
        else{
            updateCaption(props.caption)
        }
    }, [props.caption])
    useEffect(()=>{
        if(animate != null){
            let duration = .2
            if(hovering){
                gsap.to(animate.getElementsByTagName("img")[0], duration, {
                    scale: 1,
                })
                gsap.to(animate.getElementsByClassName("overlay")[0], duration, {
                    opacity: 1,
                })
            } else{
                gsap.to(animate.getElementsByTagName("img")[0], duration, {
                    scale: 1.05,
                })
                gsap.to(animate.getElementsByClassName("overlay")[0], duration, {
                    opacity: 0,
                })
            }
        }
    }, [animate, hovering])
    return(
                  <div 
                       onMouseEnter = {()=>updateHover(true)}
                       onMouseLeave = {()=>updateHover(false)}
                       ref = {div=>animate=div} className = "post">
                        <OutboundLink href={props.link} target = "_blank">
                      <img src={props.image} alt="bugb vintage"/>
                      <div className = "overlay">
                          <h2>{caption}</h2>
                          <h2>{
                                  `${date.toLocaleDateString('default', {month: 'long'})} ${date.getDate()}, ${date.getFullYear()} `
                              }
                                 
                                  </h2>
                      </div>
                      </OutboundLink>
                  </div>
    )
}
const Insta = props =>{
    const data = useStaticQuery(graphql`
    query Posts {
  strapiLargeNav {
    instagramLink
  }
}
`)
//    const items = data.allInstaNode.edges
    const link = data.strapiLargeNav.instagramLink
//    useEffect(()=>{
//        console.log(items)
//        console.log('ok')
//    }, [])
    return(
        <div className = "instaFlex">
       <div className = "title">
           <h1>Connect with us on Instagram</h1>
           <h2><a href={link} target = "_blank">@bugbvintage</a></h2>
       </div>
        {/*
        {items.map((item)=>
                <Post 
                link = {link}
                 image = {item.node.original}
                 caption = {item.node.caption}
                 timestamp = {item.node.timestamp}
                 />
                  )}
                  */}
    </div>
    )
}

export default Insta