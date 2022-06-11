import React, { useEffect, useState }from 'react';
import axios from 'axios';

import { mainURL } from '../../environments';

import Notification from '../../Components/Notification/Notification';
import LobbyCard from '../../Components/LobbyCard/LobbyCard';

import { connect } from "react-redux";

import './Lobbies.css';
import { useNavigate } from 'react-router-dom';
import AbsoluteBackground from '../../Components/AbsoluteBackground/AbsoluteBackground';

const Lobbies = (props) => {

  let navigate = useNavigate();

  const [lobbies, setLobbies] = useState([]);

  const [notificationDisplay, setNotificationDisplay] = useState("none");
  const [msg, setMsg] = useState("");
  const [bgAnimationStateContainer, setBgAnimationStateContainer] = useState(true);
  const [animationTextIndicator, setAnimationTextIndicator] = useState("on");



  useEffect(() => {

    if(!lobbies.length){
    bringLobbies();
    }

    if(!props.passport?.token){
      navigate("/");
  }

  });

  useEffect(() => {
  },[]);
 

  const backgroundAnimState = () => {

    if(bgAnimationStateContainer){
      setBgAnimationStateContainer(false);
      setAnimationTextIndicator("off");
    }else{
      setBgAnimationStateContainer(true);
      setAnimationTextIndicator("on");
    }

  }
  
  // Services
  const bringLobbies = async (type) => {

    if(!type){
      type = "Available"
    }


    let lobbiesResponse;

    try {

        let config = {
          headers: { Authorization: `Bearer ${props?.passport?.token}` }
        };


        let lobbiesResponse = await axios.get(`${mainURL}/lobbies/find${type}`, config);
        

        if (lobbiesResponse.data.length !== 0) {
            setLobbies(lobbiesResponse.data)
        }

    } catch (error) {

      setMsg("Something went wrong, please try again later");
     
      // // console.log(error)


    }


  }


  return (
    <div className="box_basic_container Lobbies">
      <AbsoluteBackground bgAnimationState={bgAnimationStateContainer}/>
      <Notification notificationDisplay={notificationDisplay} customMsg={msg}/>
      
      <div className="animation_btn centered_content" onClick={()=>{backgroundAnimState()}}>animations {animationTextIndicator}</div>
     <div className="board"  id='animItemFromTopToBottom'>
        
      { lobbies.map(lobbyObject => {
        // console.log("lobbyObject", lobbyObject);
        return(
          <LobbyCard
          key={lobbyObject.id}
          lobbyName={lobbyObject.lobbyName}
          playersSize={lobbyObject.playersSize}
          turnSecondsTimer={lobbyObject.turnSecondsTimer}
          gameMaxMinutesTimer={lobbyObject.gameMaxMinutesTimer}
          isPrivate={lobbyObject.privateGame}
          isActive={lobbyObject.inactive}
          isFull={lobbyObject.full}
          />
        )
      })}
      </div>
    </div>
  )
}

export default connect((state) => ({
  passport: state.passport,
  lobby: state.lobby
}))(Lobbies);