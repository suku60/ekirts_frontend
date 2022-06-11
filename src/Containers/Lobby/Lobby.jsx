import React, { useEffect, useState } from 'react';
import './Lobby.css';

import axios from 'axios';

import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Lobby = (props) => {

  let navigate = useNavigate("");

    const [customMsg, setCustomMsg] = useState("");

    const [playersData, setPlayersData] = useState([]);
    const [userPlayerId, setUserPlayerId] = useState(undefined);
    
    const [displayOwnerPannel, setDisplayOwnerPannel] = useState("none");

    let lobby = {
        turnTimer : props.lobby?.lobbydata?.turnSecondsTimer,
        maxDuration : props.lobby?.lobbydata?.gameMaxMinutesTimer,
        privacity : props.lobby?.lobbydata?.privateGame
    }

    let lobbyId = props.lobby?.lobbydata?.id

    let config = {
      headers: { Authorization: `Bearer ${props?.passport?.token}` }
    }; 

    useEffect(()=> {

      if(!playersData.length) {
        bringPlayers()
      }

      if(!props.passport?.token){
        navigate("/");
       }

    },[]);

    useEffect(()=> {

        if(!props.passport?.token){
            navigate("/");
        }

        if(props.passport?.user?.id === props.lobby?.lobbydata?.ownerId){
            setDisplayOwnerPannel("flex")
        }

    },[playersData]);

    const bringPlayers = async () => {

      let lobbyData;

      try {
          
          let lobbyData = await axios.get(`https://cryptic-citadel-48065.herokuapp.com/lobbies/find/${lobbyId}`, config);
     
          console.log("data", lobbyData)
      } catch (error) {

          setCustomMsg(error.data)

      }

      try {

            let playersFromLobbyData = await axios.get(`https://cryptic-citadel-48065.herokuapp.com/players/find/lobby/${lobbyId}`, config);

            console.log("players", playersFromLobbyData)
            
            if (playersFromLobbyData.data.length) {
                setPlayersData(playersFromLobbyData.data)
            }
  
        } catch (error) {
  
            setCustomMsg(error.data)
  
        }
    }

    const leaveLobby = async (pk) => {

        try {

            let playerLeavingData = await axios.delete(`https://cryptic-citadel-48065.herokuapp.com/players/${pk}`, config);

            if(playerLeavingData.status === 200){
              navigate("/lobbies")
            }
        
  
        } catch (error) {
  
            setCustomMsg(error.data)
    
        }
    }

    const deleteLobby = async (pk) => {

        try {

            let playerDeletingLobby = await axios.delete(`https://cryptic-citadel-48065.herokuapp.com/lobbies/delete/${pk}`, config);

            console.log("response from deleting lobby", playerDeletingLobby)

            if(playerDeletingLobby.status === 200){
              navigate("/lobbies")
            }
        
  
        } catch (error) {
  
            setCustomMsg(error.data)
    
        }
    }    

  return (
    <div className="box_basic_container box_bg Lobby">
      <div className="board" id='animItemFromBottomToTop'>
      </div>
    </div>
  )
}

export default connect((state) => ({
  passport: state.passport,
  lobby: state.lobby
}))(Lobby);