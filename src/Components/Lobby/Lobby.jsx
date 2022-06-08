import React, {useEffect, useState} from 'react';
import './Lobby.css';

import {ReactComponent as PrivateSvg} from '../../assets/svg/private.svg'
import {ReactComponent as PlayersSvg} from '../../assets/svg/players.svg'
import {ReactComponent as JoinBtnSvg} from '../../assets/svg/join.svg'
import {ReactComponent as EyeSvg} from '../../assets/svg/eye.svg'

const Lobby = (props) => {



  return (
    <div className="box_lobby_card">
      <div className="lobby_data centered_content">

      </div>
      <div className="lobby_data centered_content">
        <PlayersSvg/>
        
      </div>
      <div className="lobby_data centered_content">
        
      </div>
      <div className="lobby_data centered_content">
        
      </div>
    </div>
  )
}

// id
// lobbyName
// turnSecondsTimer
// gameMaxMinutesTimer
// playersSize

export default Lobby;