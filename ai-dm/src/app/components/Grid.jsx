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

  // Grid Tiles
  const renderGrid = () => {
    const grid = [];
    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        const isPlayerHere = x === playerPosition.x && y === playerPosition.y
        grid.push(
          <div
            key={`${x}-${y}`}
            className={` w-10 h-10 flex items-center justify-center z-20 relative
            ${isPlayerHere && 'grabbable draggable'}`} 
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, x, y)}
            >

              {isPlayerHere && <img src="https://i.imgur.com/0wWKQfp.png" className="absolute z-30"/>}

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
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Game Grid</h2>
      <div className="flex mb-4">
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
      <div className='grid relative' style={gridContainerStyle}>
        
        {/* Map Image */}
        <img src={mapImage} className="absolute top-0 left-0 z-10"/>
        {/* Grid Tiles */}
        {renderGrid()}
      </div>
    </div>
  );
};

export default Grid;