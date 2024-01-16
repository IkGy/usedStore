import image1 from "./adImage.png";
import React from "react";
import './adComponent.css'

function AdComponent() {
  return(
    <div className="main_ad">
      <img className="ad_style" src={image1}></img>
    </div>
  )
}

export default AdComponent 