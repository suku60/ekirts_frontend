import React, { useEffect, useState } from 'react';
import './AbsoluteBackground.css';

const AbsoluteBackground = (props) => {

  const [backgroundAnimation, setBackgroundAnimation] = useState("animAbsoluteBg");

  useEffect(() => {
  },[]);

  useEffect(() => {
    if(!props.bgAnimationState){
      setBackgroundAnimation("");
    }else{
      setBackgroundAnimation("animAbsoluteBg");
    }
  },[props]);


  return (
    <div className="box_absolute_bg box_bg" id={backgroundAnimation}>
    </div>
  )
}

export default AbsoluteBackground;