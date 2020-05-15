import React,{useEffect} from'react'
import TweenLite from 'gsap';

//simple parrallax box
//takes speed, duration, and class as props
//wrap around items u want to move

const ParrallaxBox = props => {
    let pBox;
    let speed = props.speed;
    let duration = props.duration;
    let rect
  useEffect(() => {
    let yPos = 0;
    let lastScrollTop = window.scrollY
    window.addEventListener(
      "scroll",
      () => {
        if (pBox != null) {
          rect = pBox.getBoundingClientRect()
        } else if(pBox === null || rect === undefined){
            return;
        }
        if (rect.y < window.innerHeight && rect.x + rect.height > 0) { 
          let currentScroll = window.scrollY
          if (currentScroll > lastScrollTop) {
            yPos -= speed
            let tw = TweenLite.to(pBox, duration, {
              y: yPos,
            ease: "none",
            })
          } else if (currentScroll < lastScrollTop) {
            yPos += speed
            let tw = TweenLite.to(pBox, duration, {
              y: yPos,
            ease: "none",
            })
          }
          lastScrollTop = currentScroll
        }
      }
    )
  })
  let box
  return (
    <div ref={div => pBox = div} className={props.className}>
     
      {props.children}
      
    </div>
  )
} 

export default ParrallaxBox;