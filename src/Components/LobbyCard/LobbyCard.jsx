import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import './LobbyCard.css';

import {ReactComponent as PrivateSvg} from '../../assets/svg/private.svg'
import {ReactComponent as PublicSvg} from '../../assets/svg/public.svg'
import {ReactComponent as ActiveSvg} from '../../assets/svg/active.svg'
import {ReactComponent as PlayersSvg} from '../../assets/svg/players.svg'
import {ReactComponent as TimerSvg} from '../../assets/svg/clock.svg'
import {ReactComponent as JoinBtnSvg} from '../../assets/svg/join.svg'
import {ReactComponent as EyeSvg} from '../../assets/svg/eye.svg'

const LobbyCard = (props) => {

  let navigate = useNavigate();
// console.log(props)

  const [isPrivate, setIsPrivate] = useState(props.isPrivate);
  const [isFull, setIsFull] = useState(props.isFull);
  const [isActive, setIsActive] = useState(props.isActive);

  const userJoinsThisLobby = async (lobby) => {


    // let config = {
    //   headers: { Authorization: `Bearer ${props?.passport?.token}` }
    // };

    // let addingPlayerdataResponse;

    // let playerJoiningDatabody = {
    //   playerColor  : playerColorData,
    //   userId  : props.passport?.user?.id,
    //   lobbyId : lobby?.id,
    // }

    // try  {

    //   let addingPlayerdataResponse = await axios.post(`https://cryptic-citadel-48065.herokuapp.com/players/create`, playerJoiningDatabody, config);


    //   if(!addingPlayerdataResponse?.data?.id){

    //     setMsg(addingPlayerdataResponse.data)
        
    //   }else{

    //     navigate(`/lobbies/${playerJoiningDatabody.lobbyId + Math.round(666*Math.random(666))}`)


    //   }


    // }catch(errorDisplay) {

    //   hideIndicator()
    //   setMsg("Can't join this lobby right now")
    
    // }

  }

  return (
    <div className="box_lobby_card  italic_text" 
    id="animReverseFade">
      <div className="lobby_card_name centered_content">        
        <div className="lobby_name">
          {props.lobbyName}
        </div> 
        <div className="temporary_join_btn centered_content" onClick={()=>{userJoinsThisLobby(props.key)}}>
          join
        </div> 
      </div>
      <div className="lobby_card_data centered_content">
        <div className="lobby_data data_size_timer  centered_content ">
          <PlayersSvg/>
          <p>
            {props.playersSize}
            
            </p>
        </div>
       
        <div className="lobby_data centered_content data_size_timer">
          <TimerSvg/>
          {props.turnSecondsTimer}s | {props.gameMaxMinutesTimer}min
        </div>
        <div className="lobby_data status centered_content">
          { isPrivate ? <PrivateSvg fill="red" /> : <PublicSvg fill="green"/> }
          { isFull ? <PlayersSvg fill="red"/> : <PlayersSvg fill="green"/> }
          { isActive ? <ActiveSvg fill="red"/> : <ActiveSvg fill="green"/> }
        </div>
        <div className="lobby_data centered_content data_watch">
          <EyeSvg/>
        </div>
      </div>
    </div>
  )
}

export default LobbyCard;