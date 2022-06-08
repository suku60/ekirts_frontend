import React, { useState} from 'react';
import './Notification.css';

const Notification = (props) => {

  const [notificationDisplay, setNotificationDisplay] = useState("none");

  const hideNotification = () => {
    if(notificationDisplay === "flex"){
      setNotificationDisplay("none");
    }
  }


  return (
    <div className="box_notification" id="animItemFromRightToLeft" style={{display:notificationDisplay}}>
        <div className="notification_close_button" onClick={()=>{hideNotification()}}></div>
        <p>{props.customMsg}</p>
      </div>
  )
}

export default Notification;