import React, { useEffect, useState } from "react"
import { TweenLite, TimelineMax, gsap, Power2 } from "gsap"
import ParrallaxBox from "./ParrallaxBox.jsx"

import Image1 from "../images/home.jpg"
import Image2 from "../images/home2.jpg"
import Image3 from "../images/home3.jpg"
import "../styles/frontText.scss"
import { useStaticQuery, graphql } from "gatsby"

let images = [Image1, Image2, Image3]

const ImageFlip = props => {
  const [current, updateCurrent] = useState(0)
  let ref
  let rect
  let lastScroll

  useEffect(() => {
    lastScroll = ref.getBoundingClientRect().y
    window.addEventListener("scroll", () => {
      if (ref != null) {
        rect = ref.getBoundingClientRect()
      } else if (ref === null || rect === undefined) {
        return
      }

      let currentScroll = rect.y
      if (Math.abs(currentScroll - lastScroll) > props.rate * 100) {
        if (current < props.images.length - 1) {
          updateCurrent(current + 1)
        } else {
          updateCurrent(0)
        }
        lastScroll = currentScroll
      }
    })
  })
  return (
    <img
      ref={div => (ref = div)}
      src={props.imgsrc}
      alt="img"
      className={props.className}
    />
  )
}

const Text = () => {
  const data = useStaticQuery(graphql`
      query
      landingText {
        strapiFrontPage {
          LandingText
            secondPhoto {
              publicURL
            }
        }
  }
  `)
  const landingText = data.strapiFrontPage.LandingText;
  const imgscr = data.strapiFrontPage.secondPhoto.publicURL;
  let ref
  let one
  let two
  let three
  let animated = false
  let tl = new TimelineMax()

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (ref === null) {
        return
      }
      if (ref.getBoundingClientRect().y < window.innerHeight * (2 / 5)) {
        if (animated === false) {
          let items = []
          for (let each of one.childNodes) {
            items.push(each)
          }
          let next = ref.childNodes
          items.push(next[1])
//          items.push(next[2])

          tl.staggerTo(items,1,{
              opacity: 1,
              y: 0,
              rotate: "0deg",
              ease: Power2.easeOut,
            },0.1)

          animated = true
        }
      }
    })
  })
  return (
    <div ref={div => (ref = div)} className="frontText">
      <h1 ref={div => (one = div)}>
        <h1>Sustainable,</h1>
        <h1>Quality,</h1>
        <h1> Unique.</h1>
      </h1>
      <h2>
        {landingText}
      </h2>
      <ParrallaxBox duration={0.1} speed={0.4} className="box1 imgContainer">
        <ImageFlip imgsrc = {imgscr} className="image" />
      </ParrallaxBox>
    </div>
  )
}

export default Text
