import React,{useState,useEffect} from 'react'
import "../styles/values.scss"
import {gsap, Power2} from "gsap"

const Values = props => {
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
                <li>Sustainable.</li>
                <li>Quality.</li>
                <li>Unique.</li>
            </ul>
       </div>
        <div className = "second">
            <p>

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula est et porttitor semper. Cras congue commodo mollis. Sed vehicula, diam in fringilla placerat, mauris tellus blandit turpis, sed dapibus magna ligula id ipsum. Sed feugiat laoreet leo, in convallis neque porta gravida. In ullamcorper posuere fringilla. Suspendisse eu erat magna. Donec pharetra vehicula risus, eget faucibus massa euismod sit amet. In augue ante, finibus eget posuere a, sodales sed ipsum. Fusce lobortis vitae elit non tempus. Suspendisse potenti. Mauris sed cursus lorem, aliquam dignissim lectus. Donec mi tortor, finibus sit amet risus a, accumsan rhoncus odio.
<br/><br/>

Aliquam in urna nec sapien consectetur ornare. In eget lorem risus. Proin id placerat erat. Quisque sodales feugiat cursus. Morbi ex justo, lacinia in dapibus sit amet, hendrerit id neque. Morbi luctus mattis justo in maximus. Donec tincidunt urna sed quam vulputate porttitor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis purus magna, tincidunt quis consequat at, cursus id nisi. Curabitur velit ligula, tristique quis leo a, aliquam viverra odio.
            </p>
        </div>
    </div>)
}

export default Values