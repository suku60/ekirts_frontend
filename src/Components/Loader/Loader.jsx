import React, {useEffect, useState} from 'react';
import './Loader.css';

const Loader = (props) => {

  const [loaderDisplay, setLoaderDisplay] = useState("none");

  useEffect(() => {
  });

  useEffect(() => {

    if(props.loaderState){
      setLoaderDisplay(props.loaderState);
    }

  },[props?.loaderState]);

  console.log("display, ", loaderDisplay);

  return (
    <div className="box_loader centered_content" id="animReverseFade" style={{display: loaderDisplay}}>
      <div className="loader" id="animLoader">

        {/* first line */}
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="full" id="animConstantOpacityChange" style={{animationDelay:".2s"}}></div>
        <div className="full" id="animConstantOpacityChange" style={{animationDelay:".4s"}}></div>
        <div className="full" id="animConstantOpacityChange" style={{animationDelay:".6s"}}></div>
        <div className="full" id="animConstantOpacityChange" style={{animationDelay:".8s"}}></div>
        <div className="empty"></div>
        <div className="empty"></div>

        {/* second line */}
        <div className="empty"></div>
        <div className="full" id="animConstantOpacityChange" style={{animationDelay:"4s"}}></div>
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="full" id="animConstantOpacityChange" style={{animationDelay:"1s"}}></div>
        <div className="empty"></div>

        {/* third line */}
        <div className="full" id="animConstantOpacityChange" style={{animationDelay:"3.8s"}}></div>
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="full" id="animConstantOpacityChange" style={{animationDelay:"1.2s"}}></div>
        
        {/* fourth line */}
        <div className="full" id="animConstantOpacityChange" style={{animationDelay:"3.5s"}}></div>
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="full" id="animConstantOpacityChange" style={{animationDelay:"1.4s"}}></div>
        
        {/* fifth line */}
        <div className="full" id="animConstantOpacityChange" style={{animationDelay:"3.4s"}}></div>
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="full" id="animConstantOpacityChange" style={{animationDelay:"1.6s"}}></div>
        
        {/* sixth line */}
        <div className="full" id="animConstantOpacityChange" style={{animationDelay:"3.2s"}}></div>
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="full" id="animConstantOpacityChange" style={{animationDelay:"1.8s"}}></div>
        
        {/* seventh line */}
        <div className="empty"></div>
        <div className="full" id="animConstantOpacityChange" style={{animationDelay:"3s"}}></div>
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="full" id="animConstantOpacityChange" style={{animationDelay:"2s"}}></div>
        <div className="empty"></div>
        
        {/* eight line */}
        <div className="empty"></div>
        <div className="empty"></div>
        <div className="full" id="animConstantOpacityChange" style={{animationDelay:"2.8s"}}></div>
        <div className="full" id="animConstantOpacityChange" style={{animationDelay:"2.6s"}}></div>
        <div className="full" id="animConstantOpacityChange" style={{animationDelay:"2.4s"}}></div>
        <div className="full" id="animConstantOpacityChange" style={{animationDelay:"2.2s"}}></div>
        <div className="empty"></div>
        <div className="empty"></div>
      </div>
      
    </div>
  )
}

export default Loader;