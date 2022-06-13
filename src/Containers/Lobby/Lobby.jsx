import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { connect } from "react-redux";
import { LOBBYLOG, ISUSERJOININGLOBBY, ANIMATIONSLOG, VIEWLOG } from "../../redux/types";

import axios from 'axios';

import './Lobby.css';
import Loader from '../../Components/Loader/Loader';
import Notification from '../../Components/Notification/Notification';
import AbsoluteBackground from '../../Components/AbsoluteBackground/AbsoluteBackground';
import Game from '../../Components/Game/Game';


const Lobby = (props) => {

  // console.log(props);

    let navigate = useNavigate("");

    const [notificationDisplay, setNotificationDisplay] = useState("none");
    const [customMsg, setCustomMsg] = useState("");

    const [playersData, setPlayersData] = useState([]);
    const [userPlayerId, setUserPlayerId] = useState(undefined);

    const [lobbyData, setLobbyData] = useState(undefined);

    const [isPlayerJoining, setIsPlayerJoining] = useState(false);
    const [isUserAbleToJoin, setIsUserAbleToJoin] = useState(true);

    const [loaderDisplay, setLoaderDisplay] = useState("none");
    const [joinButtonDisplay, setJoinButtonDisplay] = useState("flex");
    const [displayAdminOptions, setDisplayAdminOptions] = useState("none");

    const [gameDisplay, setGameDisplay] = useState("none");
  
    const [bgAnimationStateContainer, setBgAnimationStateContainer] = useState(props.userOptions.animations);
    const [animationTextIndicator, setAnimationTextIndicator] = useState("on");
    
    
    // const [displayOwnerPannel, setDisplayOwnerPannel] = useState("none");

    let lobby = {
        turnTimer : props.lobby?.lobbydata?.turnSecondsTimer,
        maxDuration : props.lobby?.lobbydata?.gameMaxMinutesTimer,
        privacity : props.lobby?.lobbydata?.privateGame
    }

    let lobbyId = props.lobby?.lobbyData 

    let config = {
      headers: { Authorization: `Bearer ${props?.passport?.token}` }
    }; 

    useEffect(()=> {

      if(!props.userOptions.isUserInLobby){
        props.dispatch({type: VIEWLOG, payload: true})
      }
      
      if(!props.passport?.token){
        navigate("/");
       }

      if(!playersData.length) {
        getLobbyData()
        getPlayersData()
      }

      if(props.lobby.isUserJoining) {
        
        for(let i = 0; i < playersData.length; i++) {

          if(playersData[i].userId === props.passport?.user?.id) {
            setIsUserAbleToJoin(false);
            setIsPlayerJoining(false);
            props.dispatch({type: ISUSERJOININGLOBBY, payload: false})
            
            setCustomMsg("User has joined this lobby");
            return 
          }
        }
      }

      if(props.lobby.isUserJoining && isUserAbleToJoin) {
        getColor(lobbyId);
      }

      if(props.passport.user.admin){
        setDisplayAdminOptions("flex");
      }


    });

    useEffect(()=> {

        if(isPlayerJoining){
          getPlayersData()
          setIsPlayerJoining(false)
        }

        if(!props.passport?.token){
            navigate("/");
        }

        for(let i = 0; i < playersData.length; i++) {
            if(playersData[i].userId === props.passport?.user?.id) {
              setJoinButtonDisplay("none");
            }
          }

        if(lobbyData?.ownerId === props.passport?.user?.id) {
          setDisplayAdminOptions("flex");
        }

        if(lobbyData ===  null){
          // console.log("Lobby is empty");
          navigate("/");
        }

    },[playersData, isPlayerJoining, lobbyData]);

    const playGame = () => {
      // MAKE VALIDATIONS...
      setGameDisplay("flex");
    }
    
    const backgroundAnimState = () => {

      if(bgAnimationStateContainer){
        props.dispatch({type: ANIMATIONSLOG, payload: false})
        setBgAnimationStateContainer(false);
        setAnimationTextIndicator("off");
      }else{
        setBgAnimationStateContainer(true);
        props.dispatch({type: ANIMATIONSLOG, payload: true})
        setAnimationTextIndicator("on");
      }
  
    }

    const getLobbyData = async () => {

      let lobbyData;

      try {
          
          let lobbyData = await axios.get(`https://cryptic-citadel-48065.herokuapp.com/lobbies/find/${lobbyId}`, config);

          setLobbyData(lobbyData.data);

      } catch (error) {

          setCustomMsg(error.data)
          console.log(error)

      }

      
    }

    const getPlayersData = async () => {

      setLoaderDisplay("flex");

      try {

            let playersFromLobbyData = await axios.get(`https://cryptic-citadel-48065.herokuapp.com/players/find/lobby/${lobbyId}`, config);

            // console.log("players", playersFromLobbyData.data)
            
            if (playersFromLobbyData.data.length) {
                setPlayersData(playersFromLobbyData.data)
            }

            setLoaderDisplay("none");
  
        } catch (error) {
  
          setLoaderDisplay("none");
          setCustomMsg(error.data)
          console.log(error)

  
        }
      }
    
    const getColor = async (lobbyId) => {

      if(isUserAbleToJoin){
        setIsUserAbleToJoin(false);
      }else{
        return;
      }

      setLoaderDisplay("flex");

      let randomNumber = Math.round(Math.random() * (0 - 361) + 361)

      try {

        let colorsResponse = await axios.get(`https://www.thecolorapi.com/id?hsl=${randomNumber},100%,34%&format=json`)

        joinLobby(lobbyId, colorsResponse?.data?.hex?.value)

      }catch(error){
        
        setCustomMsg("Error while fetching colors")
        setLoaderDisplay("none");
        console.log(error)


      }

    }

    const joinLobby = async (lobby, color) => {

      if(lobby !== props.lobby.lobbyData){
        return;
      }

      setLoaderDisplay("flex");

      let addingPlayerdataResponse;
  
      let playerJoiningDatabody = {
        playerColor : color,
        userId : props.passport?.user?.id,
        lobbyId : lobby,
      }
  
      try  {
  
        let addingPlayerdataResponse = await axios.post(`https://cryptic-citadel-48065.herokuapp.com/players/create`, playerJoiningDatabody, config);
  
        if(!addingPlayerdataResponse?.data?.id){
  
          setLoaderDisplay("none");
          setCustomMsg(addingPlayerdataResponse.data)
          
        }else{
  
          setIsPlayerJoining(true);
          setLoaderDisplay("none");
          navigate(`/lobbies/${lobby}`)
  
        }
  
      }catch(error) {
  
        setLoaderDisplay("none");
        setCustomMsg("Can't join this lobby right now")
        console.log(2, error)
      
      }
  
    }

    const leaveLobby = async (pk) => {

      setLoaderDisplay("flex");

      // console.log(pk)

        try {

            let playerLeavingData = await axios.delete(`https://cryptic-citadel-48065.herokuapp.com/players/${pk}`, config);

            if(playerLeavingData.status === 200){
              navigate("/lobbies")
            }
        
  
        } catch (error) {

          setLoaderDisplay("none");  
          setCustomMsg(error.data)
          console.log(error)
    
        }
    }

    const deleteLobby = async (pk) => {

      setLoaderDisplay("flex");

        try {

            let playerDeletingLobby = await axios.delete(`https://cryptic-citadel-48065.herokuapp.com/lobbies/delete/${pk}`, config);

            // console.log("response from deleting lobby", playerDeletingLobby)

            if(playerDeletingLobby.status === 200){
              navigate("/lobbies")
            }

            setLoaderDisplay("none");

        } catch (error) {
  
            setCustomMsg(error.data)
            setLoaderDisplay("none");
    
        }
    }    

    return (
    <div className="box_basic_container lobby italic_text">
      <Game lobbyData={lobbyData} playersData={playersData} gameDisplay={gameDisplay}/>
      <AbsoluteBackground bgAnimationState={bgAnimationStateContainer}/>
      <Loader loaderState={loaderDisplay}/>
      <Notification notificationDisplay={notificationDisplay} customMsg={customMsg}/>
      <div className="board top_content" id='animReverseFade'>
        <div className="container_lobby_name centered_content">
          <h1 className="lobby_name">{lobbyData?.lobbyName}</h1>
        </div>   
        {playersData.map((player, index) => {
          // console.log(player.userId, props.passport?.user?.id)
          if(player.userId === props.passport?.user?.id){
            return (
              <div key={index} className="player" style={{ marginBottom:"14%"}}>
                {/* we may get some random names from an api based on these 2 ids */}
                <div className="player_data centered_content" style={{ backgroundColor: player.playerColor }}>
                  <div className="player_name">{props.passport.user.username}</div>
                </div>
                <button className="player_leave_btn centered_content" onClick={()=>{leaveLobby(player.id)}}>leave</button>
              </div>
            )}else{
              return (
                <div key={index} className="player">
                  {/* we may get some random names from an api based on these 2 ids */}
                  <div className="player_data centered_content" style={{ backgroundColor: player.playerColor }}>
                    <div className="player_name">player nº{player.userId}/{player.id}</div>
                  </div>
                </div>
            )}}
          )
        }
        <div className="player_join_btn centered_content" onClick={()=>{getColor(lobbyId)}} style={{display:joinButtonDisplay, marginBottom:"10%"}}>join lobby</div>
        <div className="container_admin_owner_options" style={{display: displayAdminOptions}}>
            <div className="owner_btn play_btn centered_content" onClick={()=>{playGame(true)}}>play</div>
            <div className="owner_btn delete_btn centered_content" onClick={()=>deleteLobby(lobbyId)}>delete lobby</div>
        </div>
      </div>
    </div>
  )
}

export default connect((state) => ({
  passport: state.passport,
  lobby: state.lobby,
  userOptions: state.userOptions

}))(Lobby);