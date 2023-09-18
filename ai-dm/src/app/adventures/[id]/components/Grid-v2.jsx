import React, { useState, useEffect } from "react";
import { useUser } from "@/app/contexts/UserContext";
import { useAdventure } from "@/app/contexts/AdventureContext";
import { useParams } from "next/navigation";
import Draggable from "react-draggable";
import ReactDOM from "react-dom";
import { realtimeDB } from "@/app/firebase/firebase-config";
import { ref, on, onValue, set } from "firebase/database";
import { getAdventureById } from "@/app/firebase/firebase-db-adventures";
import {
    getRealtimeAdventure,
    updateRealtimeAdventure,
} from "@/app/firebase/firebase-db-adventures";

// TODO:
//* [ ]listeners for full adventure in realtime
//  Mini Listeners to reduce data usage
//--- [ ] tokens only
//--- [ ] turn order
//* [ ] Character sheets to inport token as, all data from sheet will transfer to token array.
//--- [ ] brainstorm a way to track buffs. I'm thinking an array of objects tempEffects = [{name: 'Bless', duration: 10, effect: '1d4'}]
//--- [ ] ** Priority over the above, just adding icons. make a drop down of items to add to a token, and have that in an array of icons via react icons or svgs.
//* [ ] Movement Logic refinement
//--- [ ] character speed to determine character range.

export default function GridV2() {
    const params = useParams();
    const adventureId = params.id;
    const [adventure, setAdventure] = useState({});
    const [gridSize, setGridSize] = useState({ length: 50, width: 50 });
    const [turnStats, setTurnStats] = useState({
        isTurn: true,
        moved: 0,
    });

    const adventureRef = ref(realtimeDB, `/adventures/${adventureId}`);

    useEffect(() => {
        const adventureListener = onValue(adventureRef, (snapshot) => {
            const updatedAdventure = snapshot.val();
            console.log(snapshot.val());
            setAdventure(updatedAdventure);
        });

        return () => {
            off(adventureRef, adventureListener);
        };
    }, [adventureId]);

    // useEffect(() => {
    //     try {
    //         console.log(adventureId);
    //         const refreshGame = async () => {

    //             const adventure = await getRealtimeAdventure(adventureId);
    //             await updateRealtimeAdventure(adventureId, adventure);
    //             setAdventure(adventure);
    //         };
    //         refreshGame();
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }, [adventureId]);

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
        // console.log("Dragging:", data);
    };

    const handleDragDrop = async (e, data) => {
        try {
            // Your existing code here
            console.log("Drag stopped:", data);

            // Update token position in the adventure state
            const newTokens = adventure?.tokens.map((token) => {
                console.log(data);
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

            // await set(adventureRef, adventure);
            // save updated state to the server
            console.log("updating realtime with adventure data.");

            // Uncomment this if you want to use updateRealtimeAdventure function
            // await updateRealtimeAdventure(updatedAdventure, adventureRef);
        } catch (error) {
            console.error("Error handling drag-drop:", error);
        }
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
                    // onDrag={handleDragOver}
                    onStop={handleDragDrop}
                >
                    <div
                        id={token.id}
                        className="cursor-grab box handle absolute z-50 w-[50px] h-[50px] pm-0 flex flex-col items-center "
                    >
                        <img
                            id={token.id}
                            src={token.img}
                            className="w-[50px] h-[50px] z-50 pm-0"
                        />
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
