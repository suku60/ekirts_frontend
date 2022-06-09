import React, { useEffect, useState }from 'react';
import Notification from '../../Components/Notification/Notification';
import LobbyCard from '../../Components/LobbyCard/LobbyCard';
import axios from 'axios';

import './Lobbies.css';

const Lobbies = (props) => {

  const [lobbies, setLobbies] = useState([{
    id: '1',
    lobbyName: 'obbt1',
    playersSize: "3",
    turnSecondsTimer: '2',
    gameMaxMinutesTimer: '2',
  },
  {
    id: '2',
    lobbyName: '2obbt1',
    playersSize: "23",
    turnSecondsTimer: '22',
    gameMaxMinutesTimer: '22',
  }]);

  const [notificationDisplay, setNotificationDisplay] = useState("none");
  const [customMsg, setCustomMsg] = useState("");

  useEffect(() => {
  });

  useEffect(() => {
  },[]);
 

  // Services
  // const bringAvailableLobbies = async () => {

  //   let dataResponse;

  //   try {
  //       let config = {
  //         headers: { Authorization: `Bearer ${props?.passport?.token}` }
  //       };

  //       let dataResponse = await axios.get(`https://cryptic-citadel-48065.herokuapp.com/lobbies/findAvailable`, config);
        
  //       if (dataResponse.data.length !== 0) {
  //           setLobbies(dataResponse.data)
  //       }

  //   } catch (error) {

  //     setNotificationDisplay("flex");
  //       setCustomMsg("Something went wrong, please try again later");
  //       console.log(error)


  //   }


  // }

  // bringAvailableLobbies();

  console.log("lobbies", lobbies);

  return (
    <div className="box_basic_container Lobbies">
      <Notification notificationDisplay={notificationDisplay} customMsg={customMsg}/>
      <div className="board"  id='animItemFallingFromTop'>
        
      { lobbies.map(lobbyObject => {
        return(
          <LobbyCard
          id={lobbyObject.id}
          lobbyName={lobbyObject.lobbyName}
          playersSize={lobbyObject.playersSize}
          turnSecondsTimer={lobbyObject.turnSecondsTimer}
          gameMaxMinutesTimer={lobbyObject.gameMaxMinutesTimer}
          />
        )
      })}
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