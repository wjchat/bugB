import React,{useState,useEffect} from 'react'
import "../styles/values.scss"
import {gsap, Power2} from "gsap"
import {useStaticQuery, graphql} from "gatsby"
import ReactMarkdown from "react-markdown"

const Values = props => {
    const data = useStaticQuery(graphql`
    query Values {
          strapiAboutPage {
            value1
            value2
            value3
            aboutText
          }
        }
`)
    let animate
    const [animated, triggerAnimate] = useState(false)
    useEffect(()=>{
        if(animate != null){
            if(!animated){
                gsap.set(animate.getElementsByTagName("li"),{
                    opacity: 0,
                    rotate: 1,
                    y: 30,
                    x: -5,
                })
            }else{
                let tl = gsap.timeline();
                tl.staggerTo(animate.getElementsByTagName("li"), 1,{
                    opacity: 1,
                    rotate: 0,
                    y: 0,
                    x: 0,
                }, .1)
            }
        }
    }, [animated, animate])
    const stickIt = (item, fixed, position)=>{
        if(fixed){
            if(!animated){
                triggerAnimate(true)
            }
            gsap.set(item.getElementsByTagName("ul")[0], {
                position: "fixed",
                top: 0,
            })
        }else{
            if(position === "top"){
                gsap.set(item.getElementsByTagName("ul")[0],{
                    position: "absolute",
                    top: 0,
                    bottom: "auto"
                })
            } else if(position === "bottom"){
                gsap.set(item.getElementsByTagName("ul")[0],{
                    position: "absolute",
                    top: "auto",
                    bottom: 0
                })
            }
        }
    }
    useEffect(()=>{
        if(animate != null){
            let ob = animate.getElementsByClassName("first")[0]
            window.addEventListener("scroll", ()=>{
                if(window.scrollY >= ob.offsetTop && window.scrollY < ob.offsetTop + ob.offsetHeight - window.innerHeight){
                    stickIt(ob, true, null);
                }else{
                    if(window.scrollY < ob.offsetTop){
                        stickIt(ob, false, "top")
                    }else{
                        stickIt(ob, false, "bottom")
                    }
                }
            }, {passive: true}) 
        }
    }, [animate])

    return(<div ref = {div=>animate=div} className = "values">
       <div className = "first">
            <ul>
                <li>{data.strapiAboutPage.value1}.</li>
                <li>{data.strapiAboutPage.value2}.</li>
                <li>{data.strapiAboutPage.value3}.</li>
            </ul>
       </div>       
        <div className = "mobileValues">
            <h2>
                {data.strapiAboutPage.value1},
                {data.strapiAboutPage.value2},
                {data.strapiAboutPage.value3}.
            </h2>
       </div>
        <div className = "second">
            <p className = "container">
                <ReactMarkdown source = {data.strapiAboutPage.aboutText} />
            </p>
        </div>
    </div>)
}

export default Values