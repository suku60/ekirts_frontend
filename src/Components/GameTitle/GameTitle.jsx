import React, { useEffect, useState } from 'react';
import './GameTitle.css';

const GameTitle = () => {

  // WILL BE REFACTORED LATER SO WE ONLY HAVE TO WRITE A TEXT
  let gameTitle = ["S","C","R","A","B","A","L","A","D","D","E","R" ]

  return (
    <div className="box_game_title">
      <ul>
      { gameTitle.map((gameTitle, index) => {
              return ( 
                 <li key={index}>
                   <input type="checkbox" />
                     <div className="centered_children letter_container">
                       {gameTitle}
                     </div>
                 </li>
                )})}
      </ul>
    </div>
  )
}

export default GameTitle;