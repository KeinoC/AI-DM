import React, { useState, useEffect } from "react";

import GridToolbar from "./GridToolbar";

import "./grid.css";
import { set } from "firebase/database";

import { realtimeDB } from "@/app/firebase/firebase-config";
import { useAdventure } from "@/app/contexts/AdventureContext";

import {
    listenRealtimeTokens,
    realtimeTokens,
    updateGamestate,
    getTokensData,
    testRealtimeGet,
} from "@/app/firebase/firebase-db-adventures";

const Grid = () => {
    const { selectedAdventure, selectedAdventureId, tokens, setTokens } =
        useAdventure();

    // console.log(selectedAdventure);

    const [gridWidth, setGridWidth] = useState(15);
    const [gridHeight, setGridHeight] = useState(15);
    const [mapImage, setMapImage] = useState("https://i.imgur.com/ppIn5BV.jpg");

    // const adventureId = selectedAdventure?.id

    const [selectedToken, setSelectedToken] = useState("");


    console.log(tokens);
    // Character Token Functions
    const getPlayersAtPosition = (x, y, players) => {
        if (!players || players.length === 0) {
            return [];
        }

        const isPlayerHere = players.filter(
            (player) => player.position?.x === x && player.position?.y === y
        );
        console.log(players)
          console.log(isPlayerHere);
        return isPlayerHere || [];
    };

    const handleDragStart = (event, x, y) => {
        event.dataTransfer.setData("text/plain", JSON.stringify({ x, y }));
        event.target.position({ x, y });
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event, x, y) => {
        event.preventDefault();

        if (selectedToken) {
            const updatedTokens = tokens.map((token) => {
                if (token.id === selectedToken.id) {
                    return {
                        ...token,
                        position: { x: x, y: y },
                    };
                }
                return token;
            });

            // setTokens(updatedTokens);
            setSelectedToken(
                updatedTokens.find((token) => token.id === selectedToken.id)
            );
        }
    };


    // Dynamic Grid Style Function
    const gridContainerStyle = {
        display: "grid",
        gridTemplateColumns: `repeat(${gridWidth}, 1fr)`,
        display: "relative",
    };

    // Grid Tiles
    const renderGrid = () => {
        const grid = [];
        for (let y = 0; y < gridHeight; y++) {
            for (let x = 0; x < gridWidth; x++) {
                const playersHere = () => getPlayersAtPosition(x, y, tokens);

                grid.push(
                    // Grid Tiles
                    <div
                        key={`${x}-${y}`}
                        className={` w-10 h-10 flex items-center justify-center z-20 relative
            ${playersHere && "grabbable draggable"}`}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, x, y)}
                    >
                        {/* Player Token Styles and Drag */}
                        {playersHere &&
                            playersHere?.map((tokensObj) => {
                                return (
                                    <img
                                        key={tokensObj.id}
                                        onDragStart={() =>
                                            setSelectedToken(tokensObj)
                                        }
                                        id={tokensObj.id}
                                        src={tokensObj.img}
                                        name={tokensObj.user}
                                        position={tokensObj.position}
                                        className="grabbable draggable absolute z-30"
                                    />
                                );
                            })}

                        {/* Grid Lines + Drop */}
                        {!playersHere?.length && (
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
            <div
                className="grid relative overflow-hidden"
                style={gridContainerStyle}
            >
                {/* Map Image */}
                <img src={mapImage} className="absolute top-0 left-0 z-10" />

                {/* Grid Tiles - See Above */}
                {renderGrid()}
            </div>

            <GridToolbar
                gridWidth={gridWidth}
                setGridWidth={setGridWidth}
                gridHeight={gridHeight}
                setGridHeight={setGridHeight}
                mapImage={mapImage}
                setMapImage={setMapImage}
                tokens={tokens}
                // setTokens={setTokens}
                // selectedAdventure={selectedAdventure}
            />
        </div>
    );
};

export default Grid;
