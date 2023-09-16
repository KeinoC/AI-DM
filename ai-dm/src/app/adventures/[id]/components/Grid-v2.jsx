import React, { useState, useEffect } from "react";
import { useUser } from "@/app/contexts/UserContext";
import { useAdventure } from "@/app/contexts/AdventureContext";
import { useParams } from "next/navigation";
import Draggable from "react-draggable";
import ReactDOM from 'react-dom';
import { getAdventureById } from "@/app/firebase/firebase-db-adventures";
import {
    getRealtimeAdventure,
    updateRealtimeAdventure,
} from "@/app/firebase/firebase-db-adventures";

export default function GridV2() {
    const params = useParams();
    const adventureId = params.id;
    const [adventure, setAdventure] = useState({});
    const [gridSize, setGridSize] = useState({ length: 50, width: 50 });
    const [turnStats, setTurnStats] = useState({
        isTurn: true,
        moved: 0,
    });

    useEffect(() => {
        try {
            console.log(adventureId);
            const refreshGame = async () => {
                const adventure = await getRealtimeAdventure(adventureId);
                await updateRealtimeAdventure(adventureId, adventure);
                setAdventure(adventure);
            };
            refreshGame();
        } catch (e) {
            console.error(e);
        }
    }, []);

    const generateGridBackground = () => {
        return {
            backgroundSize: `${gridSize.length}px ${gridSize.width}px`,
            backgroundImage: `
      `,
        };
    };

    const handleDragStart = (e, data) => {
        console.log("Drag started:", data);
    };

    const handleDragOver = (e, data) => {
        console.log("Dragging:", data);
    };

    const handleDragDrop = async (e, data) => {
        // const data = e
        // Your drag drop logic here
        console.log("Drag stopped:", data);

        // Update token position in the adventure state
        const newTokens = adventure?.tokens.map((token) => {
            console.log(data)
            if (token.id.toString() === data?.node.id) {
                return {
                    ...token,
                    position: {
                        x: data.x,
                        y: data.y,
                    },
                };
            }
            return token;
        });

        const updatedAdventure = { ...adventure, tokens: newTokens };
        setAdventure(updatedAdventure);

        // save updated state to the server
        console.log('updating realtime with adventure data. ')
        await updateRealtimeAdventure(adventureId, updatedAdventure);
    };


    const handleTokenMove = (e, data) => {
        console.log("Token moved:", data);
      };


    const renderTokens = () => {
        const tokens = adventure.tokens;
        console.log(adventure);

        return tokens?.map((token) => {
            return (
                <Draggable
                    key={token.id}
                    // handle=".handle"/
                    // bounds={{ top: -240, left: -240, right: 240, bottom: 240 }}
                    defaultPosition={{
                        x: token.position.x,
                        y: token.position.y,
                    }}
                    // grid={[50, 50]}
                    onStart={handleDragStart}
                    onDrag={handleDragOver}
                    onStop={handleDragDrop}
                >
                    <div id={token.id}  className="cursor-grab box handle absolute z-50 w-[50px] h-[50px] pm-0 flex flex-col items-center ">
                        <img id={token.id} src={token.img} className="w-[50px] h-[50px] z-50 pm-0" />
                        <div className="font-thin text-xs">{token?.name}</div>
                    </div>
                </Draggable>
            );
        });
    };

    return (
        <div className="border rounded-md h-full w-full">
            <div
                style={generateGridBackground()}
                className="overflow-hidden w-full h-full relative"
            >
                {renderTokens()}
            </div>
        </div>
    );
}
