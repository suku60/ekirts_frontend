import React, {useEffect, useState} from 'react';
import './LobbyCard.css';

import {ReactComponent as PrivateSvg} from '../../assets/svg/private.svg'
import {ReactComponent as PublicSvg} from '../../assets/svg/public.svg'
import {ReactComponent as ActiveSvg} from '../../assets/svg/active.svg'
import {ReactComponent as PlayersSvg} from '../../assets/svg/players.svg'
import {ReactComponent as TimerSvg} from '../../assets/svg/clock.svg'
import {ReactComponent as JoinBtnSvg} from '../../assets/svg/join.svg'
import {ReactComponent as EyeSvg} from '../../assets/svg/eye.svg'

const LobbyCard = (props) => {

// console.log(props)

  const [isPrivate, setIsPrivate] = useState(props.isPrivate);
  const [isFull, setIsFull] = useState(props.isFull);
  const [isActive, setIsActive] = useState(props.isActive);

  return (
    <div className="box_lobby_card  italic_text" 
    id="animReverseFade">
      <div className="lobby_card_name centered_content">        
        <div className="lobby_name">
          {props.lobbyName}
        </div> 
        <div className="temporary_join_btn centered_content">
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