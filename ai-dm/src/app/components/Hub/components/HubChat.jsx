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
        try {
            await setNewChatMessage(e.target.value);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSendAdvMessage = async (e, source) => {
        if (source === 'keyboard' && e.key !== 'Enter') return;

        try {
            await sendGlobalMessage(currentUser, newChatMessage);
            setNewChatMessage("");
            console.log("message sent successfully");
        } catch (error) {
            console.error(error);
        }
    };

    // CHAT INPUT BOX COMPONENT
    return (
        <div className="flex mt-4">
            <label htmlFor="smh">Message</label>
            <input
                id="smh"
                name="smh"
                type="text"
                value={newChatMessage}
                onChange={handleNewChatMessage}
                onKeyUp={(e) => handleSendAdvMessage(e, "keyboard")}
                placeholder="Type a message..."
                className="flex-grow border-none outline-none rounded-l p-2"
            />

            <button
                onClick={(e) => handleSendAdvMessage(e, "button")}
                className="bg-green-700 text-white px-4 py-2 rounded-r"
            >
                Send
            </button>
        </div>
    );
}
