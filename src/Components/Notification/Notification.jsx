import React, { useEffect, useState} from 'react';
import './Notification.css';

import {ReactComponent as CloseSvg} from '../../assets/svg/CloseNotification.svg'


const Notification = (props) => {

  const [notificationDisplay, setNotificationDisplay] = useState(props.notificationDisplay || "none");

  useEffect(() => {
  });

  useEffect(() => {

    // console.log(props.customMsg)

    if(props.customMsg && props.notificationDisplay === "none"){
      setNotificationDisplay("flex");
    }

    if(props.customMsg === ""){
      setNotificationDisplay("none");
    }

  },[props.customMsg]);

  const hideNotification = () => {
    if(notificationDisplay === "flex"){
      setNotificationDisplay("none");
    }
  }


  return (
    <div className="box_notification" id="animItemFromRightToLeft" style={{display:notificationDisplay}}>
        <div className="notification_close_button" onClick={()=>{hideNotification()}}>
          <CloseSvg/>
        </div>
        <p>{props.customMsg}</p>
      </div>
  )
}

export default Notification;