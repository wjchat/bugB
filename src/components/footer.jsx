import React, {useState, useEffect} from 'react';
import gsap from "gsap";
import "../styles/footer.scss";

const Footer = () => {
    const today = new Date();
    let animate;
    const [showing, updateShowing] = useState(false)
    const [scrollDif, updateScrollDif] = useState(null)
    useEffect(()=>{
        window.addEventListener("scroll", ()=>{
            let currentScroll = window.scrollY + window.innerHeight;
            let totalHeight = document.body.clientHeight;
            updateScrollDif(totalHeight - currentScroll);
        }, ({passive: true}))
        gsap.set(animate,{
            opacity: 0,
            y: 10,
        })
    }, [])
    useEffect(()=>{
        if(Math.abs(scrollDif) < 5){
            updateShowing(true)
        }else{
            updateShowing(false)
        }
    }, [scrollDif])
    useEffect(()=>{
        if(showing){
            gsap.to(animate, .2,{
                opacity: 1,
                y: 0,
            })
        }else{
            gsap.to(animate, .2,{
                opacity: 0,
                y: 3
            })
        }
    }, [showing])
    return(
    <div className = "footy">
        <div ref = {div=>animate=div} className = "container">
            <div>&copy;{today.getFullYear()} </div>
            <div>Bug B. Vintage</div>
        </div>
    </div>
    )
}

export default Footer;