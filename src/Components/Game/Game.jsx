import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { connect } from "react-redux";
import { LOBBYLOG, ISUSERJOININGLOBBY, ANIMATIONSLOG } from "../../redux/types";

import axios from 'axios'; 

import './Game.css';
import Loader from '../Loader/Loader';
import Notification from '../Notification/Notification';
import AbsoluteBackground from '../AbsoluteBackground/AbsoluteBackground';


const Game = (props) => {

  console.log(props.lobbyData, props.playersData);

    let navigate = useNavigate("");

    let config = {
      headers: { Authorization: `Bearer ${props?.passport?.token}` }
    }; 

    const [notificationDisplay, setNotificationDisplay] = useState("none");
    const [customMsg, setCustomMsg] = useState("");
    const [loaderDisplay, setLoaderDisplay] = useState("none");

    const [gameDisplay, setGameDisplay] = useState(props.gameDisplay);

    const [gameBoard, setGameBoard] = useState(Array(120).fill({cell: "", backgroundColor: ""}));

    const [bgAnimationStateContainer, setBgAnimationStateContainer] = useState(props.userOptions.animations);

    useEffect(() => {
    },[]);

    useEffect(() => {
      
      setGameDisplay(props.gameDisplay);

    },[props.gameDisplay, gameBoard]);

    // const closeGame = () => {
    //   setGameDisplay("none");
    // }

    const cellClicked = (cell) => {
      console.log(cell, gameBoard[cell].backgroundColor);
      
      if(gameBoard[cell].backgroundColor === ""){
        let index = cell;
        setGameBoard[index].backgroundColor("red");
      }else{
        setGameBoard[cell].backgroundColor("");
      }
    }

    const endGameAndDeleteLobby = async (pk) => {

      setCustomMsg("ENDING GAME...");
      setLoaderDisplay("flex");

        try {

            let playerDeletingLobby = await axios.delete(`https://cryptic-citadel-48065.herokuapp.com/lobbies/delete/${pk}`, config);

            // console.log("response from deleting lobby", playerDeletingLobby)
            
            setTimeout(() => {
              
              if(playerDeletingLobby.status === 200){
                navigate("/lobbies")
              }
              setLoaderDisplay("none");
              
            }, 1500);

        } catch (error) {
  
            setCustomMsg(error.data)
            setLoaderDisplay("none");
    
        }
    }


    return (
    <div className="box_game centered_content" id="animReverseFade" style={{display:gameDisplay}}>
      <Loader loaderState={loaderDisplay}/>
      <Notification notificationDisplay={notificationDisplay} customMsg={customMsg}/>
      <div className="game_board">
        {
          
          gameBoard.map((slot, index) => {
            return (
              <button className="game_slot" 
              key={index} 
              style={{backgroundColor: slot.backgroundColor}}
              onClick={()=>cellClicked(index)}>
                </button>
            )})
        }
      </div>
      <div className="game_interface">
        <div className="close_game_button" onClick={()=>{endGameAndDeleteLobby(props.lobbyData?.id)}}>END GAME</div>

      </div>

    </div>
  )
}

export default connect((state) => ({
  passport: state.passport,
  lobby: state.lobby,
  userOptions: state.userOptions

}))(Game);