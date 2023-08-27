import React, { useEffect } from "react";
import { useAdventure } from "@/app/contexts/AdventureContext";
import { useUser } from "@/app/contexts/UserContext";
import { useChat } from "@/app/contexts/ChatContext";
import { sendAdvMessage } from "@/app/firebase/firebase-chat";

// TODO: --

export default function AdvChatComponent() {
    
    // ****** STATES & VARIABLES ------------------------------------->
    const { selectedAdventure } = useAdventure();
    const { currentUser } = useUser();
    const { chatHistory, setChatHistory, newChatMessage, setNewChatMessage } =
    useChat();
    
    console.log(`selected adventure id: ${selectedAdventure.id}`)
    // ****** HANDLERS ----------------------------------------------->

    // const selectedAdventureMessageHistory = () => {

    // }
    const handleNewChatMessage = async (e) => {
        e.preventDefault();
        try{
            await setNewChatMessage(e.target.value)
        } catch(error) {
            console.error(error)
        }
    }

    const handleSendAdvMessage = async (e) => {
        if (e.key !== 'Enter') return; // recent addition, the function was reading all keystrokes. 
        try {
            await sendAdvMessage(
                selectedAdventure.id,
                currentUser,
                newChatMessage
            );
            setNewChatMessage("");
            console.log(
                "message sent successfully - console.log marked for deletion"
            );
        } catch (error) {
            console.error(error);
        }
    };

    // ****** PREROLLS : CAN BE MOVED IF COMPONENT GETS CONGESTED ---->

    const ChatInputBox = () => {
        return(
    <div className="flex mt-4">


        <input
            type="text"
            value={newChatMessage}
            onChange={handleNewChatMessage}
            onKeyUp={handleSendAdvMessage} // Handle Enter key press
            className="flex-grow border-none outline-none rounded-l p-2 text-white"
            />
        <button
            // onSubmit={() => handleSubmit("submit")}
            // onClick={() => handleSubmit("submit")}
            className="bg-green-700 text-white px-4 py-2 rounded-r"
            >
            Send
        </button>

    </div>
        )
    }

    // ****** USE EFFECTS -------------------------------------------->

    return(
        <div>
            <ChatInputBox />
        </div>
    )
}
