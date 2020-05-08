import React, { useEffect, useState } from "react"
import { gsap, Power2 } from "gsap"
import "../styles/imageWindow.scss"

const ImgWindow = props => {
    let animate
    const [mousePos, updatePos] = useState({x: null, y: null});
    useEffect(()=>{
        window.addEventListener("mousemove", (event)=>{
            updatePos({x: event.x,y: event.y})
        })
    }, [])
    useEffect(()=>{
        let rate = 20;
        if(mousePos.x != null && mousePos.y != null){
            let xDif = mousePos.x - (window.innerWidth / 2);
            let yDif = mousePos.y - (window.innerHeight / 2);
            gsap.to(animate, 1, {
                x: xDif / rate,
                y: yDif / rate,
                ease: Power2.easeOut,
            })
        }
    })
  return (
    <div className="window">
      <img ref={div=>animate=div} src={props.image} alt="BugB Vintage" />
    </div>
  )
}
export default ImgWindow
