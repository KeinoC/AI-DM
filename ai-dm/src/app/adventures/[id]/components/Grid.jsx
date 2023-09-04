import React, {useState, useEffect } from 'react';

import GridToolbar from './GridToolbar';

import './grid.css'
import { set } from 'firebase/database';

import { realtimeDB } from '@/app/firebase/firebase-config';
import { useAdventure } from '@/app/contexts/AdventureContext';

import { listenRealtimeTokens, realtimeTokens, updateGamestate, getTokensData, testRealtimeGet } from '@/app/firebase/firebase-db-adventures';

const Grid = (selectedAdventure) => {

  // const { tokens, setTokens } = useAdventure()
  const [gridWidth, setGridWidth] = useState(15);
  const [gridHeight, setGridHeight] = useState(15);
  const [mapImage, setMapImage] = useState("https://i.imgur.com/ppIn5BV.jpg");

  const adventureId = selectedAdventure.selectedAdventure.id

  const [selectedToken, setSelectedToken] = useState("")

  const [tokens, setTokens] = useState(selectedAdventure.selectedAdventure?.tokens)

  // Character Token Functions
  const getPlayersAtPosition = (x,y, players) => {
    const isPlayerHere =  players?.filter(player => player.position?.x === x && player.position?.y === y )
    return isPlayerHere
  }

  const handleDragStart = (event, x, y) => {
    event.dataTransfer.setData('text/plain', JSON.stringify({ x, y }));
    event.target.position({x, y})
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, x, y) => {
    event.preventDefault();

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
    
      updateGamestate(adventureId, updatedTokens)
      // realtimeTokens(adventureId)
    }
  };

  // progress on this, we had a type in our path. working out kinks now.
  // useEffect(() =>{
  //   if(adventureId) {
  //     testRealtimeGet(adventureId)
  //   }
  // },[])


  // useEffect(() => {
  //   console.log("beginning of useEffect")
  //   const initialTokenData = async () => {
  //     if (!adventureId) return
  //     try {
  //       const initialTokensData = await realtimeTokens(adventureId);
  //       console.log("Initial Token Data: ", initialTokensData);
  //       await setTokens(initialTokensData)
  //       console.log("Initial Tokens Fetched Successfully: ", tokens)

  //     } catch(error) {
  //       console.error(error)
  //       throw error
  //     }

  //     initialTokenData()

  //     const tokenRef = ref(realtimeDB, `adventures/${adventureId}/game-state/tokens`)
  //     const handleTokenData = (snapshot) => {
  //       const tokenData = snapshot.val()
  //       setTokens(tokenData)
  //     }
  //     const unsubscribe = onChildAdded(tokenRef, handleTokenData);

  //     return () => {
  //       unsubscribe(tokenRef, handleTokenData)
  //     }

  //   }
  // }, [])

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
        const playersHere = getPlayersAtPosition(x, y, tokens)

        grid.push(
          // Grid Tiles
          <div 
            key={`${x}-${y}`}
            className={` w-10 h-10 flex items-center justify-center z-20 relative
            ${playersHere && 'grabbable draggable'}`} 
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, x, y)}
            >

              {/* Player Token Styles and Drag */}
              {playersHere && playersHere.map((tokensObj) => {
                return (
                  <img 
                    key={tokensObj.id} 
                    onDragStart={() => setSelectedToken(tokensObj)}
                    id={tokensObj.id} src={tokensObj.img} name={tokensObj.user} position={tokensObj.position} className="grabbable draggable absolute z-30"
                    />)}
                )
              }

              {/* Grid Lines + Drop */}
              {!playersHere.length && (
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
        mapImage={mapImage} setMapImage={setMapImage}
        tokens={tokens} setTokens={setTokens}
        selectedAdventure={selectedAdventure} />

    </div>
  );
};

export default Grid;