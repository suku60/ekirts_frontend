import React, { useEffect, useState } from 'react';
import './AbsoluteBackground.css';

const AbsoluteBackground = (props) => {

  const [backgroundAnimation, setBackgroundAnimation] = useState("running");

  useEffect(() => {
  },[]);

  useEffect(() => {
    if(!props.bgAnimationState){
      setBackgroundAnimation("paused");
    }else{
      setBackgroundAnimation("running");
    }
  },[props]);


  return (
    <div className="box_absolute_bg bg_image">
      <div className="background_animation box_bg"  id="animAbsoluteBg" style={{animationPlayState:backgroundAnimation}}></div>
    </div>
  )
}

export default AbsoluteBackground;