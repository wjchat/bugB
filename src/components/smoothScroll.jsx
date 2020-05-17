import React from 'react';
import "../styles/smoothScroll.scss";

const SmoothScroll = props =>{
    return(<div className = "viewport">
       <div className = "smoothScrollContainer">
            {props.children}
        </div>
    </div>)
}

export default SmoothScroll