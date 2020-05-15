import React, { useState, useEffect } from "react"
import gsap from "gsap"
import "../styles/scrollbar.scss"

const ScrollBar = props => {
  let animate
  let [showing, updateShow] = useState(false)
  useEffect(() => {
    let topPercent = 0.1 * window.innerHeight
//    let height = 200000 / document.body.clientHeight
    let height = 5;
    gsap.set(animate, {
      height: height,
    })
    const tween = gsap.to(animate, 0.5, {
      y: window.innerHeight - height - topPercent - 10 ,
      ease: "none",
      paused: true,
    })
    window.addEventListener("resize", () => {
        console.log('ok')
      tween.progress(
        window.scrollY / (document.body.scrollHeight - window.innerHeight)
      )
    gsap.set(animate, {
      height: 200000 / document.body.clientHeight,
    })
    })
    window.addEventListener("scroll", () => {
      tween.progress(
        window.scrollY / (document.body.scrollHeight - window.innerHeight)
      )
      if (window.scrollY < 10) {
        updateShow(false)
      } else {
        updateShow(true)
      }
    })
  }, [])
  useEffect(() => {
    if (showing) {
      gsap.to(animate, 0.2, {
        opacity: 1,
      })
    } else {
      gsap.to(animate, 0.2, {
        opacity: 0,
      })
    }
  }, [showing])
  return <div ref={div => (animate = div)} className="scrollBar"></div>
}

export default ScrollBar
