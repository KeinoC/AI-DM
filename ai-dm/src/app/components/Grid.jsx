import React, {useState } from 'react';

import './grid.css'

const Grid = () => {
  const [gridWidth, setGridWidth] = useState(15);
  const [gridHeight, setGridHeight] = useState(15);
  const [mapImage, setMapImage] = useState("https://i.imgur.com/ppIn5BV.jpg");

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
    console.log('handleDrop testing', event.target.name)
    console.log('handleDrop testing-pos', event.target.value)
  };

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridWidth}, 1fr)`,
    display: 'relative'
  };

  const handleWidthChange = (e) => {
    setGridWidth(parseInt(e.target.value));
    setGridHeight(parseInt(e.target.value));
  };

  const handleHeightChange = (e) => {
    setGridWidth(parseInt(e.target.value));
    setGridHeight(parseInt(e.target.value));
  };

  let tokenArray = [
    {
      id: 1,
      name: "Umnos",
      img: "https://i.imgur.com/0wWKQfp.png",
      user: "Drewski",
      position: {x: 0,y: 0}
    },
    {
      id: 2,
      name: "Discord",
      img: "https://i.imgur.com/zAljZQy.png",
      position: {x:0, y: 0},
    }
  ]

  // Grid Tiles
  const renderGrid = () => {
    const grid = [];
    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        const isPlayerHere = x === playerPosition.x && y === playerPosition.y
        grid.push(
          // Grid Tiles
          <div 
            // name={tokenArray[0].user} 
            // value={tokenArray[0].position}
            key={`${x}-${y}`}
            className={` w-10 h-10 flex items-center justify-center z-20 relative
            ${isPlayerHere && 'grabbable draggable'}`} 
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, x, y)}
            >

              {/* Player Token */}
              {isPlayerHere && <img src={tokenArray[0].img} name={tokenArray[0].user} value={tokenArray[0].position} className="grabbable absolute z-30"
                // onDragStart={(e) => handleDragStart(e, x, y)}
                // onDragOver={handleDragOver}
                // onDrop={(e) => handleDrop(e, x, y)}
                />}

              {/* Grid Lines + Drop */}
              {!isPlayerHere && (
                <div
                  className="w-10 h-10 opacity-25 border-white border-[1px] absolute"
                  onDragStart={(e) => handleDragStart(e, x, y)}
                ></div>
              )}
              
          </div>
        );
      }
    }
    return grid;
  };

  return (
    // Grid Box
    <div className="flex flex-col items-center p-4 pb-8">
      {/* Grid */}
      <div className='grid relative' style={gridContainerStyle}>
        
        {/* Map Image */}
        <img src={mapImage} className="absolute top-0 left-0 z-10"/>

        {/* Grid Tiles - See Above */}
        {renderGrid()}
      </div>

      {/* Grid Size Inputs */}
      <div className="flex my-4">
        <label className="mr-2">Width:</label>
        <input
          type="number"
          value={gridWidth}
          onChange={handleWidthChange}
          className="border border-gray-300 p-1"
        />
        <label className="ml-4 mr-2">Height:</label>
        <input
          type="number"
          value={gridHeight}
          onChange={handleHeightChange}
          className="border border-gray-300 p-1"
        />
      </div>
    </div>
  );
};

export default Grid;