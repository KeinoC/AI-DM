import React, { useEffect, useRef, useState } from "react";
import { useUser } from "@/app/contexts/UserContext";
import { useChat } from "@/app/contexts/ChatContext";
import { useAdventure } from "@/app/contexts/AdventureContext";
import {
    getChatHistoryByChannel,
    subscribeToChatUpdates,
    sendAdvMessage,
} from "@/app/firebase/firebase-chat";
import { renderChatHistoryWindow } from "@/app/components/ChatHistoryTemplate";
import { realtimeDB } from "@/app/firebase/firebase-config";
import { ref, onChildAdded, off } from "firebase/database";
import { useRouter, usePathname, getRoute } from "next/navigation";

export default function AdvChatComponent() {


    
    const { currentUser } = useUser();
    const { selectedAdventure } = useChat();
    const [adventureId, setAdventureId] = useState("");
    
    

    const scrollRef = useRef(null);
    const channel = `chat/adventure-chat/${adventureId}/`;
    const {
        newAdvMessage,
        setNewAdvMessage,
        advChatHistory,
        setAdvChatHistory,
    } = useChat();
    
    // Handler for setting new message
    const pathname = usePathname();
    
    useEffect(() => {
        if(pathname) {
            console.log(pathname)
            const pathSegments = pathname?.split("/");
            const idSegment = pathSegments[pathSegments?.length - 1].toLowerCase();
            console.log(idSegment);
            setAdventureId(idSegment);
        }
        }, [pathname]);


    const handleNewAdvMessage = (e) => {
        setNewAdvMessage(e.target.value);
    };

    // Handler for sending a new message
    const handleSendAdvMessage = async (e, source) => {
        if (source === "keyboard" && e.key !== "Enter") return;

        try {
            await sendAdvMessage(adventureId, currentUser, newAdvMessage);
            setNewAdvMessage("");
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
    }, [advChatHistory]);

    // Effect to fetch initial chat history when the component mounts
    useEffect(() => {
        const initializeChat = async () => {
            if (!adventureId && !channel) return;
            try {
                const initialHistory = await getChatHistoryByChannel(channel);
                console.log("Initial history: ", initialHistory);
                await setAdvChatHistory(initialHistory);
                console.log(
                    "Initial chat history fetched successfully:",
                    advChatHistory
                );
            } catch (error) {
                console.error("Failed to fetch initial chat history: ", error);
            }
        };
        initializeChat();

        const chatRef = ref(realtimeDB, channel);

        const handleNewMessage = (snapshot) => {
            const newMessage = snapshot.val();
            setAdvChatHistory((prevChatHistory) => [
                ...prevChatHistory,
                newMessage,
            ]);
        };

        const unsubscribe = onChildAdded(chatRef, handleNewMessage);

        return () => {
            off(unsubscribe);
        };
    }, []);


    // Render the chat history window
    const RenderChatHistoryWindow = () => {
        console.log("Rendering chat history window");
        const advChatHistoryDisplay = renderChatHistoryWindow(advChatHistory);
        console.log("Output from renderChatHistoryWindow:", advChatHistory);
        return advChatHistoryDisplay;
    };

    // CHAT INPUT BOX COMPONENT
    return (
        <div className=" w-[400px] h-auto z-20 bg-slate-800 p-5 round-md bg-opacity-80">
            <div
                ref={scrollRef}
                className=" flex flex-col z-20 gap-2 overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600"
            >
                <RenderChatHistoryWindow />
            </div>
            <div className="flex mt-4">
                <input
                    id="smh"
                    name="smh"
                    type="text"
                    value={newAdvMessage}
                    onChange={handleNewAdvMessage}
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
        </div>
    );
}
