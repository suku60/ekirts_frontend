import React, {useEffect, useState} from 'react';
import './Floor.css';

const Floor = (props) => {

  let style = props.style 

  return (
    <div className="box_floor" style={style}>
        <div className="floor_left"></div>
        <div className="floor_right"></div>

    </div>
  )
}
export default Floor;