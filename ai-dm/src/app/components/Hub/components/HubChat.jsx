import React, { useEffect, useRef } from "react";
import { useUser } from "@/app/contexts/UserContext";
import { useChat } from "@/app/contexts/ChatContext";
import {
    getChatHistoryByChannel,
    subscribeToChatUpdates,
    sendGlobalMessage,
} from "@/app/firebase/firebase-chat";
import { renderChatHistoryWindow } from "../../ChatHistoryTemplate";
import { realtimeDB } from "../../../firebase/firebase-config";
import { ref, onChildAdded, off } from "firebase/database";


export default function HubChatComponent() {
    const scrollRef = useRef(null);
    const channel = "chat/global-chat/";
    const { currentUser } = useUser();
    const {
        newGlobalMessage,
        setNewGlobalMessage,
        globalChatHistory,
        setGlobalChatHistory,
    } = useChat();

    // Handler for setting new message
    const handleNewGlobalMessage = (e) => {
        setNewGlobalMessage(e.target.value);
    };

    // Handler for sending a new message
    const handleSendGlobalMessage = async (e, source) => {
        if (source === "keyboard" && e.key !== "Enter") return;

        try {
            await sendGlobalMessage(currentUser, newGlobalMessage);
            setNewGlobalMessage("");
            console.log("Message sent successfully");
        } catch (error) {
            console.error("Failed to send message: ", error);
        }
    };

    // Effect to scroll to the bottom when new messages are added
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [globalChatHistory]);

    
    // Effect to fetch initial chat history when the component mounts
    useEffect(() => {
        const initializeChat = async () => {
            try {
                const initialHistory = await getChatHistoryByChannel(channel);
                setGlobalChatHistory(initialHistory);
                // console.log("Initial chat history fetched successfully:", initialHistory);
            } catch (error) {
                console.error("Failed to fetch initial chat history: ", error);
            }
        };

        initializeChat();

        const chatRef = ref(realtimeDB, channel);

        const handleNewMessage = (snapshot) => {
            const newMessage = snapshot.val();
            setGlobalChatHistory((prevChatHistory) => [...prevChatHistory, newMessage]);
        };
        
        const unsubscribe = onChildAdded(chatRef, handleNewMessage);
        
        return () => {
            off(unsubscribe);
        };

        
    }, []);

    // Render the chat history window
    const RenderChatHistoryWindow = () => {
        // console.log("Rendering chat history window");
        const globalChatHistoryDisplay = renderChatHistoryWindow(globalChatHistory);
        // console.log("Output from renderChatHistoryWindow:", globalChatHistory);
        return globalChatHistoryDisplay;
    };


    // CHAT INPUT BOX COMPONENT
    return (
        <div className=" w-[400px] h-auto z-20 bg-slate-800 p-5 round-md bg-opacity-80">
            <div ref={scrollRef} className=" flex flex-col z-20 gap-2 overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600">
                <RenderChatHistoryWindow />
            </div>
            <div className="flex mt-4">
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
        </div>
    );
}
