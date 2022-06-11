import React, { useEffect, useState } from 'react';
import './GameTitle.css';

const GameTitle = () => {

  // WILL BE REFACTORED LATER SO WE ONLY HAVE TO WRITE A TEXT
  let gameTitle = ["A","A","C","A","A","C","A","A","C" ]

  return (
    <div className="box_game_title">
      <ul>
      { gameTitle.map((gameTitle, index) => {
              return ( 
                 <li key={index}>
                   <input type="checkbox" />
                     <div className="centered_children">
                       {gameTitle}
                     </div>
                 </li>
                )})}
      </ul>
    </div>
  )
}

export default GameTitle;