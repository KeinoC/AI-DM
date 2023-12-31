import { Holtwood_One_SC } from 'next/font/google';
import React, { useState, useEffect } from 'react';

import './grid.css'

const Grid = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [player2Position, setPlayer2Position] = useState({ x: 0, y: 0});

  const [mapImage, setMapImage] = useState("https://i.imgur.com/ppIn5BV.jpg");

  const [columnSize, setColumnSize] = useState(15);
  const gridArea = columnSize*columnSize
  const gridClass = `grid grid-cols-${columnSize} relative`

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columnSize}, 1fr)`,
    display: 'relative'
  };

  const handleGridSize= (e) => {
    setColumnSize(parseInt(e.target.value));
  };

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

  // let tokenArray = [
  //   {
  //     id: 1,
  //     name: "Umnos",
  //     img: "https://i.imgur.com/GhlfoHH.png",
  //     position: ""
  //   },
  //   {
  //     id: 2,
  //     name: "Discord",
  //     img: "https://i.imgur.com/zAljZQy.png",
  //     position: ""
  //   }
  // ]

  return (
    <div className="flex flex-col justify-center items-center h-screen relative">
      
      {/* Grid Box */}
      <div className={gridClass} style={gridContainerStyle}>

      {/* Map Image */}
      <img src={mapImage} className="absolute top-0 left-0 z-10"/>

        {/* Grid Squares */}
        {Array.from({ length: gridArea}, (_, index) => {
          const x = index % columnSize;
          const y = Math.floor(index / columnSize);
          const isPlayerHere = x === playerPosition.x && y === playerPosition.y;
          // const isPlayer2Here = x === player2Position.x && y === player2Position.y;

          return (
            // Grid Tile
            <div
              key={index}
              className={`w-12 h-12  relative z-20 ${
                // player style
                isPlayerHere && 'grabbable draggable' 
                
              }`}
              
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, x, y)}
            >
              {/* Player Token */}
              {isPlayerHere && <img src="https://i.imgur.com/0wWKQfp.png" className="absolute z-30"/>}
              {/* {isPlayer2Here && <img src="https://i.imgur.com/zAljZQy.png" />}  */}

              {!isPlayerHere && (
                <div
                  className="w-12 h-12 opacity-25 border-white border-[1px]"
                  onDragStart={(e) => handleDragStart(e, x, y)}
                ></div>
              )}
            </div>
          );
        })}
      </div>

      <br />
      <div>
      <label className="mr-2">Grid Square:</label>
        <input
          type="number"
          value={columnSize}
          onChange={handleGridSize}
          className="border border-gray-300 p-1"
        />
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