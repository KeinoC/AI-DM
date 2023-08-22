import React, {useState } from 'react';

const GameGrid = () => {
  const [gridWidth, setGridWidth] = useState(5);
  const [gridHeight, setGridHeight] = useState(5);

  const gridClass = `grid relative`

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridWidth}, 1fr)`, // 3 columns, each taking up 1 fraction of the available space
    gap: '16px', // 16px gap between rows & columns
    padding: '16px'
  };

  const gridItemStyle = {
    backgroundColor: '#3490dc', // Color for demonstration
    padding: '16px',
    borderRadius: '8px', // Rounded corners
    color: 'white' // Text color
  };

  const handleWidthChange = (e) => {
    setGridWidth(parseInt(e.target.value));
  };

  const handleHeightChange = (e) => {
    setGridHeight(parseInt(e.target.value));
  };

  const renderGrid = () => {
    const grid = [];
    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        grid.push(
          <div
            key={`${x}-${y}`}
            className="border border-gray-300 w-10 h-10 flex items-center justify-center"
          >
            {`${x},${y}`}
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
      <div className={gridClass} style={gridContainerStyle}>{renderGrid()}</div>
    </div>
  );
};

export default GameGrid;