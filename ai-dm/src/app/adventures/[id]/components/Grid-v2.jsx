import React, { useState, useEffect } from "react";
import { useUser } from "@/app/contexts/UserContext";
import { useAdventure } from "@/app/contexts/AdventureContext";
import { useParams } from "next/navigation";
import Draggable from "react-draggable";
import { getAdventureById } from "@/app/firebase/firebase-db-adventures";
import {
    getRealtimeAdventure,
    updateRealtimeAdventure,
} from "@/app/firebase/firebase-db-adventures";

export default function GridV2() {
    const params = useParams();
    const adventureId = params.id;
    const [adventure, setAdventure] = useState({});
    const [gridSize, setGridSize] = useState({ length: 40, width: 40 });


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
        linear-gradient(to right, grey 1px, transparent 1px),
        linear-gradient(to bottom, grey 1px, transparent 1px)
      `,
        };
    };

    const renderTokens = () => {
        const tokens = adventure.tokens;
        console.log(tokens);

        return tokens?.map((token) => {
            console.log("here1");
            console.log(token);
            return (
                <Draggable
                    // handle=".handle"/
                    defaultPosition={{
                        x: token.position.x * 40,
                        y: token.position.y * 40,
                    }}
                    grid={[40, 40]}
                >
                    <div className="cursor-grab box handle absolute z-50">
                        <img src={token.img} className="w-10 h-10 z-50" />
                    </div>
                </Draggable>
            );
        });
    };

    return (
        <div className="border rounded-md h-full w-full">
            Grid v2
            <div
                style={generateGridBackground()}
                className="overflow-hidden w-full h-full relative"
            >
                {renderTokens()}
            </div>
        </div>
    );
}
