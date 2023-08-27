import React from "react";
import { useUser } from "@/app/contexts/UserContext";
import { useChat } from "@/app/contexts/ChatContext";
import { sendGlobalMessage } from "@/app/firebase/firebase-chat";

export default function HubChatComponent() {
    
    // STATES & VARIABLES
    const { currentUser } = useUser();
    const { newChatMessage, setNewChatMessage } = useChat();
    
    // HANDLERS
    const handleNewChatMessage = async (e) => {
        e.preventDefault();
        try{
            await setNewChatMessage(e.target.value)
        } catch(error) {
            console.error(error)
        }
    }

    const handleSendAdvMessage = async (e) => {
        if (e.key !== 'Enter') return;
        
        try {
            await sendGlobalMessage(currentUser, newChatMessage);
            setNewChatMessage("");
            console.log("message sent successfully");
        } catch (error) {
            console.error(error);
        }
    };

    // CHAT INPUT BOX COMPONENT
    const ChatInputBox = () => {
        return (
            <div className="flex mt-4">
                <label htmlfor="smh">Message</label>
                <input
                    id="smh"
                    name="smh"
                    type="text"
                    value={newChatMessage}
                    onChange={handleNewChatMessage}
                    onKeyUp={handleSendAdvMessage}
                    placeholder="Type a message..."
                    className="flex-grow border-none outline-none rounded-l p-2"
                />
                <button onClick={handleSendAdvMessage} className="bg-green-700 text-white px-4 py-2 rounded-r">
                    Send
                </button>
            </div>
        )
        }   
        
        return (
            <ChatInputBox />
        )
    }