import React, { useEffect, useCallback } from "react"
import { TweenLite, TimelineMax, Power2 } from "gsap"
import { Link, useStaticQuery, graphql } from "gatsby"
import "../styles/largeNav.scss"
import ImgWindow from "./ImgWindow.jsx"
import insta from "../images/instagram.svg"
import facebook from "../images/facebook.svg"
import pintrest from "../images/pinterest.svg"
import back from "../images/letter-x.svg"
import TransitionLink from "gatsby-plugin-transition-link"
import { OutboundLink } from "gatsby-plugin-google-analytics"

const Back = props => {
  let animate
  let duration = 0.1
  const hover = useCallback(enter => {
    if (enter) {
      TweenLite.to(animate, duration, {
        x: "0%",
        scale: 1.1,
        opacity: 1,
      })
    } else {
      TweenLite.to(animate, duration, {
        x: "0%",
        scale: 1,
      })
    }
  })
  return (
    <img
      onMouseEnter={() => hover(true)}
      onMouseLeave={() => hover(false)}
      onClick={props.toggleNav}
      ref={div => (animate = div)}
      src={back}
      alt="back"
    />
  )
}
const Social = props => {
  let animate
  let duration = 0.1
  const hover = useCallback(enter => {
    if (enter) {
      TweenLite.to(animate, duration, {
        scale: 1,
        opacity: 0.4,
      })
    } else {
      TweenLite.to(animate, duration, {
        scale: 1,
        opacity: 1,
      })
    }
  })
  return (
    <OutboundLink href={props.url} target="_blank">
      <img
        onMouseEnter={() => hover(true)}
        onMouseLeave={() => hover(false)}
        ref={div => (animate = div)}
        src={props.src}
        alt={props.alt}
      />
    </OutboundLink>
  )
}
const NavItem = props => {
  let space
  let circle
  let duration = 0
  const hover = useCallback(enter => {
    if (enter) {
      TweenLite.to(circle, duration, {
        opacity: 1,
      })
    } else {
      TweenLite.to(circle, duration, {
        opacity: 0,
      })
    }
  })
  return (
    <h1
      onMouseEnter={() => hover(true)}
      onMouseLeave={() => hover(false)}
      ref={div => (space = div)}
    >
      {props.url != null ? (
        <TransitionLink
          exit={{
            trigger: () => props.transitionOut(),
            length: 4,
          }}
          entry={{
            delay: 0.5,
          }}
          to={props.url}
          activeClassName="active"
        >
          <div ref={div => (circle = div)} className="circle"></div>
          <div className="circle circle2"></div>
          <span>{props.name} </span>
        </TransitionLink>
      ) : (
        <OutboundLink href={props.storeLink} target="__blank">
          <div ref={div => (circle = div)} className="circle"></div>
          <div className="circle circle2"></div>
          <span>{props.name} </span>
        </OutboundLink>
      )}
    </h1>
  )
}
const LargeScreen = props => {
  let background
  let sideNav
  let back
  let social
  let image
  let tl = new TimelineMax({ pause: false })

  useEffect(() => {
    let rows = background.childNodes
    let navItems = sideNav.childNodes
    let backItems = back
    let socialItems = social.childNodes

    let duration = 0.6
    let stagger = 0.025
    let toX = 0
    let Ease = Power2.easeInOut

    tl.staggerTo(
      rows,
      duration,
      {
        width: "110%",
        opacity: 1,
        ease: Ease,
      },
      stagger
    )
    tl.to(
      image,
      duration,
      {
        opacity: 1,
        x: toX,
        ease: Ease,
      },
      stagger,
      `-=${0}`
    )
    tl.staggerTo(
      backItems,
      duration,
      {
        opacity: 1,
        x: toX,
        ease: Ease,
      },
      stagger,
      `-=${duration * 0.75}`
    )
    tl.staggerTo(
      socialItems,
      duration,
      {
        opacity: 1,
        x: toX,
        ease: Ease,
      },
      stagger * -1,
      `-=${duration}`
    )
    tl.staggerTo(
      navItems,
      duration,
      {
        opacity: 1,
        x: toX,
        ease: Ease,
      },
      stagger * -1,
      `-=${duration * 1.2}`
    )
  }, [])

  const handleClick = useCallback(() => {
    let rows = background.childNodes
    let navItems = sideNav.childNodes
    let backItems = back
    let socialItems = social.childNodes

    let duration = 0.4
    let stagger = 0.025
    let toX = 15
    let Ease = Power2.easeInOut
    let tl2 = new TimelineMax({ paused: false })
    tl2.staggerTo(
      backItems,
      duration,
      {
        opacity: 0,
        x: toX,
        ease: Ease,
      },
      stagger
    )
    tl2.staggerTo(
      socialItems,
      duration,
      {
        opacity: 0,
        x: toX,
        ease: Ease,
      },
      stagger,
      0
    )
    tl2.staggerTo(
      navItems,
      duration,
      {
        opacity: 0,
        x: toX,
        ease: Ease,
      },
      stagger,
      `-=${duration * 0.8}`
    )
    tl2.to(
      image,
      duration,
      {
        opacity: 0,
        x: toX,
        ease: Ease,
      },
      stagger,
      `-=${duration}`
    )
    tl2.staggerTo(
      rows,
      duration,
      {
        opacity: 0,
        width: "0%",
        ease: Ease,
      },
      stagger,
      `-=${duration * 0.8}`
    )
    tl2.eventCallback("onComplete", () => {
      props.toggleNav()
    })
  }, [])
  const data = useStaticQuery(graphql`
    query LargeNav {
      strapiLargeNav {
        instagramLink
        facebookLink
        pinterestLink
        storeLink
        navPhoto {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  `)
  const info = data.strapiLargeNav
  return (
    <div className="largeScreen">
      <div ref={div => (background = div)} className="background">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="grid">
        <div
          ref={div => {
            sideNav = div
          }}
          className="sidenav"
        >
          <NavItem transitionOut={props.transitionOut} url={"/"} name="Home" />
          <NavItem
            transitionOut={props.transitionOut}
            url={"about"}
            name="About"
          />
          <NavItem
            transitionOut={props.transitionOut}
            url="collections"
            name="Collections"
          />
          <NavItem storeLink={info.storeLink} url={null} name="Store" />
        </div>
        <div className="back">
          <div ref={div => (back = div)}>
            <Back toggleNav={handleClick} />
          </div>
        </div>
        <div className="social">
          <div ref={div => (social = div)}>
            <Social url={info.instagramLink} src={insta} alt="instagram" />
            <Social url={info.facebookLink} src={facebook} alt="facebook" />
            <Social url={info.pinterestLink} src={pintrest} alt="pinterest" />
          </div>
        </div>
        <div ref={div => (image = div)} className="img">
          <ImgWindow image={info.navPhoto.childImageSharp.fluid} />
        </div>
      </div>
    </div>
  )
}

export default LargeScreen
