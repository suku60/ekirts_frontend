import React, { useEffect, useState }from 'react';
import Notification from '../../Components/Notification/Notification';
import axios from 'axios';

import './Lobbies.css';
import { getValue } from '@testing-library/user-event/dist/utils';
import Lobby from '../../Components/LobbyCard/LobbyCard';

const Lobbies = () => {

  const [lobbies, setLobbies] = useState([]);

  const [notificationDisplay, setNotificationDisplay] = useState("none");
  const [customMsg, setCustomMsg] = useState("");

  useEffect(() => {
  });

  useEffect(() => {
  },[]);
 

  // Services
//   const bringAvailableLobbies = async () => {

//     let dataResponse;

//     try {
//         let config = {
//           headers: { Authorization: `Bearer ${props?.passport?.token}` }
//         };

//         let dataResponse = await axios.get(`https://cryptic-citadel-48065.herokuapp.com/lobbies/findAvailable`, config);
        
//         if (dataResponse.data.length !== 0) {
//             setLobbies(dataResponse.data)
//         }

//     } catch (error) {

//       setNotificationDisplay("flex");
//         setCustomMsg("Something went wrong, please try again later");
//         console.log(error)


//     }


//   }

//   bringAvailableLobbies();

  return (
    <div className="box_basic_container Lobbies" id='animItemFallingFromTop'>
      <Notification notificationDisplay={notificationDisplay} customMsg={customMsg}/>
      <div className="board">
        <Lobby
        id="2"
        lobbyName="Lobby 1"
        playersSize="2"
        turnSecondsTimer="30"
        gameMaxMinutesTimer="60"
        />
        <Lobby/>
        <Lobby/>
        <Lobby/>
        <Lobby/>
        <Lobby/>
        <Lobby/>

      </div>
    </div>
  )
}

// id
// lobbyName
// turnSecondsTimer
// gameMaxMinutesTimer
// playersSize

export default Lobbies;