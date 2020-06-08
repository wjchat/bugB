import React, { useEffect, useCallback, useState } from "react"
import { gsap } from "gsap"
import "../styles/navMen.scss"


const Menu = (props) => {
  let animate
  
  
  const hover = useCallback((enter) => {
    let items = animate.childNodes
    let duration2 = .1

    if(enter === true){
        let tl2 = gsap.timeline();
        tl2.to(animate, duration2 * 2,{
            x: "-10%",
        })
        tl2.to(items[0], duration2, {
          width: "90%",
        }, 0)
        tl2.to(items[1], duration2, {
          width: "100%",
        }, `-= ${duration2 * .5}`)
        tl2.to(items[2], duration2, {
          width: "80%",
        }, `-= ${duration2 * .5}`)
    }else{
        let tl = gsap.timeline();
        tl.to(items[2], duration2, {
            width: '100%'
        })        
        tl.to(items[0], duration2, {
            width: '100%'
        }, 0)        
        tl.to(animate, duration2, {
            x: '0%'
        }, 0)
        tl.to(items[1], duration2, {
            width: "80%",
        }, `-=${duration2 /2}`)
    }
  })
  useEffect(() => {
    let tl = gsap.timeline()
    let items = animate.childNodes
    let duration = 0.2
    tl.to(items[2], duration, {
      width: "100%",
      opacity: 1,
    })
    tl.to(
      items[1],
      duration,
      {
        width: "100%",
        opacity: 1,
      },
      `-=${duration * 0.8}`
    )
    tl.to(items[1], 0, {
      marginLeft: "auto",
    })
    tl.to(items[1], duration * 0.8, {
      width: "80%",
    })
    tl.to(
      items[0],
      duration,
      {
        width: "100%",
        opacity: 1,
      },
      `-=${duration * 1.15}`
    )
    tl.play()
  }, [])
  const handleClick = () =>{
      hover(false);
      props.toggleNav();
      hover(false);
  }
  return (
    <div
      onMouseEnter={()=>hover(true)}
      onMouseLeave={() => hover(false)}
      className="navMen"
      onClick = {()=>handleClick()}
    >
     <div className  = "container"
         ref={div => (animate = div)}
         >
          <div></div>
          <div className="extend"></div>
          <div></div>
      </div>
    </div> 
  )
}

export default Menu
