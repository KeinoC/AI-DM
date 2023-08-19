import React, { useState } from 'react';

const Grid = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });

  const handleDragStart = (event, x, y) => {
    event.dataTransfer.setData('text/plain', JSON.stringify({ x, y }));
    console.log('drag started from ', {x, y})
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, x, y) => {
    event.preventDefault();
    setPlayerPosition({ x: x, y: y });
  };

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
              className={`w-12 h-12 ${
                isPlayerHere ? 'bg-blue-300' : 'bg-gray-300'
              }`}
              draggable
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, x, y)}
            >{isPlayerHere && "P1"}
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