import React, {useState, useEffect } from 'react';

import GridToolbar from '../[id]/components/GridToolbar';

import './grid.css'
import { set } from 'firebase/database';

const Grid = () => {

  let tokenArray = [
    {
      id: "id-1",
      name: "Umnos",
      img: "https://i.imgur.com/0wWKQfp.png",
      user: "Drewski",
      position: {x: 0,y: 0}
    },
    {
      id: "id-2",
      name: "Discord",
      img: "https://i.imgur.com/zAljZQy.png",
      user: "Not Drewski",
      position: {x:1, y: 1},
    }
  ]

  const [gridWidth, setGridWidth] = useState(15);
  const [gridHeight, setGridHeight] = useState(15);
  const [mapImage, setMapImage] = useState("https://i.imgur.com/ppIn5BV.jpg");
  // player id/token id of selectedToken
  const [selectedToken, setSelectedToken] = useState("")
  const [tokens, setTokens] = useState(tokenArray)
  // ^^^tokens

  // const updateTokens = () => {
  //   const updatedTokens = tokens.map((tokens) => {

  //     setTokens(...prev, )
  //   })
  // }

  // tokens[selectedToken].postion = {x: x, y: y}

  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });

  // Character Token Functions
  const handleDragStart = (event, x, y) => {
    // collect starting tile location (x, y coordinates)
    event.dataTransfer.setData('text/plain', JSON.stringify({ x, y }));
    // check user id to see if player has access to token
    event.target.position({x, y})
    // record x,y coordinates from token object
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, x, y) => {
    event.preventDefault();
    // tokens[selectedToken].position=({ x: x, y: y });
    // event.target.value = {x: x, y: y}
    // selectedToken.positions=({ x: x, y: y})
    // selectedToken.positions.x = x
    // selectedToken.postitions.y = y

    if (selectedToken) {
      const updatedTokens = tokens.map(token => {
        if (token.id === selectedToken.id) {
          return {
            ...token,
            position: { x: x, y: y }
          };
        }
        return token;
      });


      setTokens(updatedTokens);
      setSelectedToken(updatedTokens.find(token => token.id === selectedToken.id));

      console.log(tokens[0].position)
    }

    useEffect(() => {
      // console.log(selectedToken, playerPosition)
      // selectedToken.length && console.log(tokens[selectedToken]?.position)
      // console.log(selectedToken)
      // console.log(tokens)
    }, [selectedToken, playerPosition])
  

    // console.log('handleDrop testing', event.target.name)
    // console.log('handleDrop testing-pos', event.target.value)
    // console.log('handleDrop-position', event.target.position)

    // console.log(playerPosition)

    // update token object key/value position with tile position for character targeted from handleDragStart::
    // -record tile destination coordinates
    // -target token from handleDragStart
    // -update tokenObject position from tile destination coordinates
  };

  // Dynamic Grid Style Function
  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridWidth}, 1fr)`,
    display: 'relative'
  };

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

              {isPlayerHere && tokens.map((tokensObj) => {
                return (
                  <img 
                    key={tokensObj.id} 
                    onDragStart={() => setSelectedToken(tokensObj)}
                    id={tokensObj.id} src={tokensObj.img} name={tokensObj.user} position={tokensObj.position} className="grabbable draggable absolute z-30"
                    // onDragStart={(e) => handleDragStart(e, x, y)}
                    // onDragOver={handleDragOver}
                    // onDrop={(e) => handleDrop(e, x, y)}
                    />)}
                )
              }

              {/* Player Token */}
              {isPlayerHere && <img 
                onDragStart={() => setSelectedToken(tokens[0].id)}
                id={tokens[0].id} src={tokens[0].img} name={tokens[0].user} position={tokens[0].position} className="grabbable draggable absolute z-30"
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
      <div className='grid relative overflow-hidden' style={gridContainerStyle}>
        
        {/* Map Image */}
        <img src={mapImage} className="absolute top-0 left-0 z-10"/>

        {/* Grid Tiles - See Above */}
        {renderGrid()}
      </div>

      <GridToolbar 
        gridWidth={gridWidth} setGridWidth={setGridWidth} 
        gridHeight={gridHeight} setGridHeight={setGridHeight} 
        mapImage={mapImage} setMapImage={setMapImage}/>

    </div>
  );
};

export default Grid;