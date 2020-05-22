import React, { useEffect, useCallback } from "react"
import "../styles/home.scss"

import { TimelineMax, TweenMax } from "gsap"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const ImageMover = React.forwardRef((props, ref) => (
    <div ref={ref} className={`${props.className} animateIn`}>
      <Img
        fluid={props.src}
        alt={props.alt}
      />
    </div>
))

const Home = () => {
  const data = useStaticQuery(graphql`
    query FrontVid {
      strapiFrontPage {
        landingPhoto {
          publicURL
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  `)
  const src = data.strapiFrontPage.landingPhoto.childImageSharp.fluid
  let one
  let two
  let three
  let four
  let img1 = React.createRef()
  let img2 = React.createRef()
  let tl = new TimelineMax({ delay: 0.2 })

  const onMove = useCallback(() => {
    let items = [img1.current]
    for (let each of items) {
      let rect = each.getBoundingClientRect()
      let e = window.event
      let tween = TweenMax.to(each, 4, {
        x: (e.pageX - rect.x - rect.width / 2) / 25,
        y: (e.pageY - rect.y - rect.height / 2) / 25,
      })
    }

    //    let tween = TweenMax.to(img, .1, {
    //        x:((window.event.pageX - img.getBoundingClientRect().left) - (img.getBoundingClientRect().clientWidth) / 2)
    //    })
  })
  useEffect(() => {
    let array = [img1.current, img2.current, one, two, three, four]
    tl.staggerTo(
      array,
      0.8,
      {
        opacity: 1,
        x: 0,
        ease: "power1.out",
      },
      0.15,
      `+=1`
    )
  })
  return (
    <div className="home">
      <div onMouseMove={onMove} className="title">
        <div className="mainContain">
          <ImageMover
            ref={img1}
            src={src}
            className="image"
            alt="fashion at the best"
          />

          <div className="rightContain">
            <div className="text">
              <div ref={div => (one = div)}>Vintage Styles</div>
              <div ref={div => (two = div)}>for the</div>
              <div ref={div => (three = div)}>Modern World</div>
              <div ref={div => (four = div)}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
