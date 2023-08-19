import { Holtwood_One_SC } from 'next/font/google';
import React, { useState, useEffect } from 'react';

import './grid.css'

const Grid = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });

  const handleDragStart = (event, x, y) => {
    event.dataTransfer.setData('text/plain', JSON.stringify({ x, y }));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, x, y) => {
    event.preventDefault();
    setPlayerPosition({ x: x, y: y });
  };


  // const [playerPositions, setPlayerPositions] = useState(null); // Initialize playerPositions state
  
  // let characters = [
  //   {
  //     id: 1,
  //     name: "Rangerfuxx",
  //     user: "drewford",
  //     player: 2,
  //     inPlay: false,
  //     position: { x: 3, y: 2 }
  //   }
  // ];
  
  // let adventure1 = {
  //   host: "1",
  //   players: ["1", "2", "3"]
  // };
  
  // function loadPlayersOnBoard(adventure) {
  //   const playersIds = adventure.players;
  //   console.log(playersIds);
  
  //   const positions = {}; // Create an object to store positions
  
  //   playersIds.forEach((playerId) => {
  //     const player = characters.find((character) => character.id === playerId);
  
  //     if (player) {
  //       const position = { x: player.position.x, y: player.position.y };
  //       positions[playerId] = position; // Store position in the object
  //     } else {
  //       console.log("Player not found for ID:", playerId);
  //     }
  //   });
  
  //   setPlayerPositions(positions); // Update playerPositions state
  //   console.log(positions)
  // }
  
  // useEffect(() => {
  //   loadPlayersOnBoard(adventure1);
  // },[])
  
  // ... Rest of your component code


  
 




  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 25 }, (_, index) => {
          const x = index % 5;
          const y = Math.floor(index / 5);
          const isPlayerHere = x === playerPosition.x && y === playerPosition.y;

          return (
            <div
              key={index}
              className={`w-12 h-12 bg-gray-300 ${
                isPlayerHere && 'grabbable' 
              }`}
              draggable
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, x, y)}
            >{isPlayerHere && <img src="https://i.imgur.com/0wWKQfp.png" />}
              {!isPlayerHere && (
                <div
                  className="w-12 h-12 "
                  draggable
                  onDragStart={(e) => handleDragStart(e, x, y)}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Grid;