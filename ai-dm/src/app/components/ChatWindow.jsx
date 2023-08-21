import React, { useRef, useEffect } from "react";
import { useChat } from "../contexts/ChatContext";
import { useUser } from "../contexts/UserContext";
import {
    getCurrentUnixTimestamp,
    convertUnixToTime,
} from "../utils/helpers/timestamp";

// TODO: 'window' is temporarily undefined when component is mounted and an errors out for a brief moment. Need make sure it's loaded before component runs. not sure how yet
// TODO: chat history needs to auto scroll to bottom

export default function ChatWindow() {
    const scrollRef = useRef(null);
    const { chatHistory, setChatHistory, newChatMessage, setNewChatMessage } =
        useChat();
    const { currentUser } = useUser();

    const handleSubmit = async (e) => {
        if (e?.key === "Enter" || e == "submit") {
            const currentTimeNormalized = convertUnixToTime(
                await getCurrentUnixTimestamp()
            );
            const prefix = `[${currentTimeNormalized}] ${currentUser?.username}: `;
            console.log(prefix);

            const updatedChatMessage = prefix + newChatMessage;
            console.log(updatedChatMessage);

            setNewChatMessage(updatedChatMessage);
            setChatHistory([...chatHistory, updatedChatMessage]);
            setNewChatMessage("");
        }
    };

    const handleInputChange = (e) => {
        const currentTimeNormalized = convertUnixToTime(currentUnixTime);
        const newMessage = e.target.value;
        setNewChatMessage(
            `[${currentTimeNormalized}] ${currentUser?.username}: ${newMessage}`
        );
    };

    const chatHistoryWindow = chatHistory.map((entry, index) => {
        return (
            <div key={index} className=" bg-slate-600 p-2 m-1 rounded">
                <li className="text-white">{entry}</li>
            </div>
        );
    });

    useEffect(() => {
        console.log(chatHistory)
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, [chatHistory]);

    const newChatMessageWindow = () => {
        return (
            <div className="flex mt-4">
                <input
                    type="text"
                    value={newChatMessage}
                    onChange={(e) => setNewChatMessage(e.target.value)}
                    onKeyUp={handleSubmit} // Handle Enter key press
                    className="flex-grow border-none outline-none rounded-l p-2 text-white"
                />
                <button
                    onSubmit={() => handleSubmit("submit")}
                    onClick={() => handleSubmit("submit")}
                    className="bg-blue-500 text-white px-4 py-2 rounded-r"
                >
                    Send
                </button>
            </div>
        );
    };

    return (
        <div className="fixed bottom-0 left-0 sm:w-[400px] sm:h-[400px] bg-slate-800 bg-opacity-90 p-6 rounded-lg text-salmon">

            <div ref={scrollRef} className="overflow-y-scroll sm:h-[300px]">
                {chatHistoryWindow}
            </div>

            { currentUser ?
                newChatMessageWindow()
                :
                <div className="flex justify-center items-center">
                    <h1>Login to chat.</h1>
                </div>
            }

        </div>
    );
}
