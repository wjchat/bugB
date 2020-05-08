import React, { useState, useEffect, useCallback } from "react"
import { TimelineMax, TweenLite } from "gsap"
import Menu from "./navMenu.jsx"
import Logo from "../images/logo.svg"
import TransitionLink from 'gatsby-plugin-transition-link'

import "../styles/header.scss"

const NavContain = React.forwardRef((props, ref) => {
  let animate
  let tl = new TimelineMax({ paused: true })
  let duration = 0.3
    
  useEffect(() => {
    let lastScroll = 0
    window.addEventListener("scroll", () => {
      if (window.scrollY > window.innerHeight * .5) {
        if (window.scrollY > lastScroll) {
          let tween = TweenLite.to(animate, duration,{
              y: -10,
              opacity: 0,
          })
          lastScroll = window.scrollY
        } else {
          let tween = TweenLite.to(animate, duration,{
              y: 0,
              opacity: 1,
          })
          lastScroll = window.scrollY
        }
      }
    })
  })
  return (
    <nav ref={div => (animate = div)} className="nav">
      {props.children}
    </nav>
  )
})
const NavItem = props => {
  const [lineShow, toggleLine] = useState(false)
  let circle
  let text

  useEffect(() => {
    let duration = 0
    if (lineShow === true) {
      let tw = TweenLite.to(circle, duration, {
        opacity: 1,
      })
      let tw2 = TweenLite.to(text, duration, {
        x: 0,
      })
    } else {
      let tw = TweenLite.to(circle, duration, {
        opacity: 0,
      })
      let tw2 = TweenLite.to(text, duration, {
        x: "0%",
      })
    }
  })
  return (
    <div
      className="navItem"
      onMouseEnter={() => toggleLine(true)}
      onMouseLeave={() => toggleLine(false)}
    >
          {props.to != null? 
          <TransitionLink 
          exit = {{
                        trigger: () => props.transitionOut(),
                        length: 4,
                  }}
        entry = {{
                      delay: .5,
                  }}
          activeClassName = "active" 
          to = {props.to}>
          <div ref={div => (circle = div)} className="circle"></div>
          <div className="circle circle2"></div>
          <h1 ref={div => (text = div)}>
          {props.title}
          </h1>
          </TransitionLink>
          :
          <a href = "https://www.etsy.com/shop/BugBVintage?ref=simple-shop-header-name&listing_id=782336324" target = "__blank" >
          <div ref={div => (circle = div)} className="circle"></div>
          <h1 ref={div => (text = div)}>
          {props.title}
          </h1>
          </a>
          }
    </div>
  )
}
const Header = (props) => {
  const [navMen, toggleNav] = useState(false)
  let one
  let two
  let three
  let four
  let pop1
  let pop2
  let pop3
  let pop4
  let pop5
  let pop6
  let pop7
  let pop8
  let tl = new TimelineMax({ delay: 0.6 })
  let tl2 = new TimelineMax({ repeat: -1 })
  let nav
  let navItems
  let logo
  let menu
  tl2.pause()

  const mouseIn = useCallback(() => {
    let speed = 0.03
    let popray = [pop1, pop2, pop3, pop4, pop5, pop6, pop7, pop8]
    tl2.staggerTo(
      popray,
      0,
      {
        opacity: 1,
      },
      speed
    )
    tl2.staggerTo(
      popray,
      0,
      {
        opacity: 0,
      },
      speed
    )
    tl2.play()
  })

  const mouseOut = useCallback(() => {
    let popray = [pop1, pop4, pop3, pop2, pop6, pop8, pop5, pop7]
    tl2.pause()
    for (let each of popray) {
      let tw = TweenLite.to(each, 0, {
        opacity: 0,
      })
    }
  })
  useEffect(() => {
    let lastY = window.scrollY
    let tween = TweenLite.to(one, 1, {
      opacity: 1,
      x: 0,
    })
    let array = [two, three, four]
    tl.staggerTo(
      array,
      1,
      {
        opacity: 1,
        y: 0,
      },
      0.2
    )
    let tl2 = new TimelineMax({ paused: true })
    let dur1 = 0.3
    tl2
      .to(
        one,
        dur1,
        {
//        y: "-3%",
//          scale: 0.95,
          ease: "easeInOut",
        },
        0
      )
      .to(
        navItems,
        dur1,
        {
          opacity: 0,
        },
        0
      ) 
      .to(navItems, 0, {
        display: "none",
      })
      .to(menu, 0, {
        display: "block",
      })
      .from(menu, dur1 / 3, {
        opacity: 0,
      }, 0)
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10 && window.scrollY < window.innerHeight * 5 ) {
        tl2.play()
          setTimeout(()=>{
              toggleNav(true);
          }, dur1 * 1000);
      } else if (window.scrollY < 10) {
        tl2.reverse()
          setTimeout(()=>{
              toggleNav(false);
          }, dur1 * 1000);
      }
    })
  }, [])
  return (
    <NavContain ref={div => (nav = div)}>
      <div
        onMouseLeave={()=>mouseOut()}
        onMouseOver={()=>mouseIn()}
        ref={div => (one = div)}
        className="image"
      >
        <TransitionLink
        onClick = {()=>mouseOut()}
        exit = {{
                        trigger: () => props.transitionOut(),
                        length: 4,
                  }}
        entry = {{
                      delay: .5,
                  }}
          to ="/"><img ref={div => (logo = div)} src={Logo} alt="Logo" /></TransitionLink>
        <div className="pop pop1" ref={div => (pop1 = div)}></div>
        <div className="pop pop2" ref={div => (pop2 = div)}></div>
        <div className="pop pop3" ref={div => (pop3 = div)}></div>
        <div className="pop pop4" ref={div => (pop4 = div)}></div>
        <div className="pop pop5" ref={div => (pop5 = div)}></div>
        <div className="pop pop6" ref={div => (pop6 = div)}></div>
        <div className="pop pop7" ref={div => (pop7 = div)}></div>
        <div className="pop pop8" ref={div => (pop8 = div)}></div>
      </div>
      <div className="linkContainer">
        <div ref={div => (menu = div)} className="navMenu">
          {navMen ? <Menu toggleNav = {props.toggleNav} /> : ""}
        </div>

        <div className="flexC" ref={div => (navItems = div)}>
          <div ref={div => (two = div)}>
            <NavItem 
            transitionIn = {props.transitionIn} 
            transitionOut = {props.transitionOut} 
            to = "/about" title="ABOUT" />
          </div>
          <div ref={div => (three = div)}>
            <NavItem 
            transitionIn = {props.transitionIn}
            transitionOut = {props.transitionOut}
              to = "/collections" title="COLLECTIONS" />
          </div>
          <div ref={div => (four = div)}>
            <NavItem  to = {null} title="STORE" />
          </div>
        </div>
      </div>
    </NavContain>
  )
}

export default Header
