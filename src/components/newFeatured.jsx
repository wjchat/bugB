import React, { useEffect, useState } from "react"

import { TweenLite } from "gsap"
import { useStaticQuery, graphql, Link } from "gatsby"
import "../styles/newFeatured.scss"
import TransitionLink from "gatsby-plugin-transition-link"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import Image from "gatsby-image"


const Overlay = props => {
  const [mouseIn, toggleMouse] = useState(null)
  let animate
  let duration = 0.2

  useEffect(() => {
    let twS = TweenLite.to(sibIMG, 0, {
      scale: 1.31,
    })
    let sibIMG = animate.nextSibling
    if (mouseIn === true) {
      let tw = TweenLite.to(animate, duration, {
        filter: "blur(0px)",
        opacity: 1,
      })
      let tw2 = TweenLite.to(sibIMG, duration, {
        scale: 1.31,
      })
    } else if (mouseIn === false) {
      let tw = TweenLite.to(animate, duration, {
        filter: "blur(5px)",
        opacity: 0,
      })
      let tw2 = TweenLite.to(sibIMG, duration, {
        scale: 1.3,
      })
    }
  })
  return (
    <div
      onMouseEnter={() => toggleMouse(true)}
      onMouseLeave={() => toggleMouse(false)}
      ref={div => (animate = div)}
      className="overlay"
    >
      <h2>{props.name}</h2>
      <h3>{props.price}</h3>
    </div>
  )
}
const Parrallax = props => {
  let img1
  let speed = props.speed * 0.1

  useEffect(() => {
    let yPos = 0
    let lastScrollTop = window.scrollY
    let rect
    window.addEventListener(
      "scroll",
      () => {
        if (img1 != null) {
          rect = img1.getBoundingClientRect()
        } else if (img1 === null || rect === undefined) {
          return
        }
        if (rect.y < window.innerHeight && rect.x + rect.height > 0) {
          let currentScroll = window.scrollY
          if (currentScroll > lastScrollTop) {
            yPos -= speed
            let tw = TweenLite.to(img1, 0.1, {
              y: yPos,
            })
          } else if (currentScroll < lastScrollTop) {
            yPos += speed
            let tw = TweenLite.to(img1, 0.1, {
              y: yPos,
            })
          }
          lastScrollTop = currentScroll
        }
      },
      []
    )
  })
  return (
    <div
    ref={div => (img1 = div)}
     className={props.className}
    >
    <Image fluid = {props.src} alt = {props.alt} />
    </div>
  )
}
const NewFeaturedContainer = props => {
  const data = useStaticQuery(graphql`
    query newFeatured {
      strapiFrontPage {
        id
        featuredClothing1 {
          Name
          link
          Price
          photo {
            publicURL
            childImageSharp {
              fluid(quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        featuredClothing2 {
          Name
          link
          Price
          photo {
            publicURL
            childImageSharp {
              fluid(quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
      allStrapiCollections {
        edges {
          node {
            name
            cover {
              publicURL
            childImageSharp {
              fluid(quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
            }
            strapiId
            id
          }
        }
      }
    }
  `)
  const featured1 = data.strapiFrontPage.featuredClothing1
  const featured2 = data.strapiFrontPage.featuredClothing2
  const allCol = data.allStrapiCollections.edges
  const collection = allCol[allCol.length - 1].node
  let passProps
  const [transition, updateTrans] = useState(null)
  useEffect(() => {
    updateTrans(passProps.transitionOut)
  })
  const handleClick = () => {
    transition()
  }
  return (
    <div ref={div => (passProps = div)} className="arrivalsContainer">
      <div className="text">
        <h1>New & Featured</h1>
      </div>
      <div className="collection desktop">
        <TransitionLink
          exit={{
            trigger: () => handleClick(),
            length: 4,
          }}
          entry={{
            delay: 0.5,
          }}
          to={`/collection/${collection.strapiId}`}
        >
          <Overlay name={collection.name} price="Collection" />
          <Parrallax
            speed={4}
            src={collection.cover.childImageSharp.fluid}
            alt="ok"
            className="image"
          />
        </TransitionLink>
      </div>
      <div className="collection mobile">
        <TransitionLink
          exit={{
            trigger: () => handleClick(),
            length: 4,
          }}
          entry={{
            delay: 0.5,
          }}
          to={`/collection/${collection.strapiId}`}
        >
          <div className="overlay mobile">
            <h2>{collection.name}</h2>
            <h3>Collection</h3>
          </div>
          <Parrallax
            speed={2}
            src={collection.cover.childImageSharp.fluid}
            alt="ok"
            className="image"
          />
        </TransitionLink>
      </div>
      <div className="feat1">
        <OutboundLink href={featured1.link} target="__blank">
          <Overlay name={featured1.Name} price={`$${featured1.Price}`} />
          <Parrallax
            speed={1}
            src={featured1.photo.childImageSharp.fluid}
            alt="ok"
            className="image"
          />
        </OutboundLink>
      </div>
      <div className="feat1 mobile">
        <OutboundLink href={featured1.link} target="__blank">
          <div className="overlay mobile">
            <h2>{featured1.Name}</h2>
            <h3>${featured1.Price}</h3>
          </div>
          <Parrallax
            speed={1}
            src={featured1.photo.childImageSharp.fluid}
            alt="ok"
            className="image"
          />
        </OutboundLink>
      </div>
      <div className="feat2">
        <OutboundLink href={featured2.link} target="__blank">
          <Overlay name={featured2.Name} price={`$${featured2.Price}`} />
          <Parrallax
            speed={1}
            src={featured2.photo.childImageSharp.fluid}
            alt="ok"
            className="image"
          />
        </OutboundLink>
      </div>
      <div className="feat2 mobile">
        <OutboundLink href={featured2.link} target="__blank">
          <div className="overlay mobile">
            <h2>{featured2.Name}</h2>
            <h3>${featured2.Price}</h3>
          </div>
          <Parrallax
            speed={1}
            src={featured2.photo.childImageSharp.fluid}
            alt="ok"
            className="image"
          />
        </OutboundLink>
      </div>
    </div>
  )
}

export default NewFeaturedContainer
