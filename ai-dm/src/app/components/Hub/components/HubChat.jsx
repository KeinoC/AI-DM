import React, {useEffect} from "react";
import { useUser } from "@/app/contexts/UserContext";
import { useChat } from "@/app/contexts/ChatContext";
import { getChatHistoryByChannel, subscribeToChatUpdates, sendGlobalMessage } from "@/app/firebase/firebase-chat";

export default function HubChatComponent() {

// ******* STATES & VARIABLES ******* ---------------------------------------------->

    const { currentUser } = useUser();
    const { newGlobalMessage, setNewGlobalMessage, globalChatHistory, setGlobalChatHistory } = useChat();

// ******* HANDLERS ******* -------------------------------------------------------->

    const handleNewGlobalMessage = async (e) => {
        try {
            await setNewGlobalMessage(e.target.value);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSendGlobalMessage = async (e, source) => {
        if (source === 'keyboard' && e.key !== 'Enter') return;

        try {
            await sendGlobalMessage(currentUser, newGlobalMessage);
            setNewGlobalMessage("");
            console.log("message sent successfully");
        } catch (error) {
            console.error(error);
        }
    };

// ******* USE EFFECT ******* ------------------------------------------------------>

    useEffect(() => {
        const channel = "chats/global"; // Or use dynamic channel based on props or context

        // Fetch initial chat history
        const initializeChat = async () => {
            try {
                const initialHistory = await getChatHistoryByChannel(channel);
                setChatHistory(initialHistory);
            } catch (error) {
                console.error("Failed to fetch initial chat history: ", error);
            }
        };

        initializeChat();

        // Set up a listener for new messages
        let unsubscribe;
        try {
            unsubscribe = subscribeToChatUpdates(channel, newMessage => {
                setChatHistory(prevChats => [...prevChats, newMessage]);
            });
        } catch (error) {
            console.error("Failed to subscribe to chat updates: ", error);
        }

        // Clean up the listener when the component unmounts
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);


    // CHAT INPUT BOX COMPONENT
    return (
        <div className="flex mt-4">
            <label htmlFor="smh">Message</label>
            <input
                id="smh"
                name="smh"
                type="text"
                value={newGlobalMessage}
                onChange={handleNewGlobalMessage}
                onKeyUp={(e) => handleSendGlobalMessage(e, "keyboard")}
                placeholder="Type a message..."
                className="flex-grow border-none outline-none rounded-l p-2"
            />

            <button
                onClick={(e) => handleSendGlobalMessage(e, "button")}
                className="bg-green-700 text-white px-4 py-2 rounded-r"
            >
                Send
            </button>
        </div>
    );
}
