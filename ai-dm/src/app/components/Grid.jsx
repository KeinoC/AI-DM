import { Holtwood_One_SC } from 'next/font/google';
import React, { useState, useEffect } from 'react';

import './grid.css'

const Grid = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });

  const [mapImage, setMapImage] = useState("https://i.imgur.com/GhlfoHH.png");

  const [columnSize, setColumnSize] = useState(10);
  const gridArea = columnSize*columnSize
  const gridClass = `grid grid-cols-${columnSize} relative`

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

  return (
    <div className="flex justify-center items-center h-screen relative">
      
      <div className={gridClass}>

      <img src={mapImage} className="absolute top-0 left-0 z-10"/>


        {Array.from({ length: gridArea}, (_, index) => {
          const x = index % columnSize;
          const y = Math.floor(index / columnSize);
          const isPlayerHere = x === playerPosition.x && y === playerPosition.y;

          return (
            <div
              key={index}
              className={`w-12 h-12 border-[1px] border-white z-20 ${
                isPlayerHere && 'grabbable draggable' 
              }`}
              
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, x, y)}
            >{isPlayerHere && <img src="https://i.imgur.com/0wWKQfp.png" />}

              {!isPlayerHere && (
                <div
                  className="w-12 h-12"
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