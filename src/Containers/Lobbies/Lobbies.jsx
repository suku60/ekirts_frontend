import React, { useEffect, useState }from 'react';
import axios from 'axios';

import { developmentURL } from '../../environments';

import Notification from '../../Components/Notification/Notification';
import LobbyCard from '../../Components/LobbyCard/LobbyCard';

import { connect } from "react-redux";

import './Lobbies.css';
import { useNavigate } from 'react-router-dom';

const Lobbies = (props) => {

  let navigate = useNavigate();

  const [lobbies, setLobbies] = useState([]);

  const [notificationDisplay, setNotificationDisplay] = useState("none");
  const [customMsg, setCustomMsg] = useState("");

  useEffect(() => {

    if(!lobbies.length){
    bringAvailableLobbies();
    }

    if(!props.passport?.token){
      navigate("/");
  }

  });

  useEffect(() => {
  },[]);
 

  // Services
  const bringAvailableLobbies = async () => {

    let dataResponse;

    try {
        let config = {
          headers: { Authorization: `Bearer ${props?.passport?.token}` }
        };

        console.log(config)

        let dataResponse = await axios.get(`${developmentURL}/lobbies/findAvailable`, config);
        
        console.log(dataResponse);

        if (dataResponse.data.length !== 0) {
            setLobbies(dataResponse.data)
        }

    } catch (error) {

      setCustomMsg("Something went wrong, please try again later");
      setTimeout(() => {
        // setCustomMsg("");
      }, 2000);
      console.log(error)


    }


  }


  console.log("lobbies", lobbies);

  return (
    <div className="box_basic_container Lobbies">
      <Notification notificationDisplay={notificationDisplay} customMsg={customMsg}/>
      <div className="board"  id='animItemFromTopToBottom'>
        
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

export default connect((state) => ({
  passport: state.passport,
  lobby: state.lobby
}))(Lobbies);