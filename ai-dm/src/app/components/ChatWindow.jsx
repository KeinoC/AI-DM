import React, { useRef, useEffect } from "react";
import { useChat } from "../contexts/ChatContext";
import { useUser } from "../contexts/UserContext";
import {
    getCurrentUnixTimestamp,
    convertUnixToTime,
} from "../utils/helpers/timestamp";
import {
    sendGlobalMessage,
    getChatHistoryByChannel,
} from "../firebase/firebase-chat";

// TODO: Chat History needs to scroll to the bottom - again

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

            const updatedChatMessage = prefix + newChatMessage;

            await sendGlobalMessage("global", newChatMessage, currentUser);

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

    const chatHistoryWindow = chatHistory.map((message, index) => {
        const timeStamp = convertUnixToTime(message.timestamp);
        return (
            <div
                key={index}
                className="bg-slate-100 bg-opacity-10 text-slate-400 p-1 m-1 h-auto rounded-lg shadow-md flex items-start"
            >
                <img
                    src="/Default_Profile_Picture.jpeg"
                    alt="Profile"
                    className="w-5 h-5 rounded-full mr-3"
                />

                <div className="flex-1">
                    <div className="flex justify-between">
                        <span className="font-medium text-xs text-slate-400">
                            {message.sender}
                        </span>
                        <span className="text-xs text-slate-400">
                            [{timeStamp}]
                        </span>
                    </div>
                    <li className=" list-none mt-1 text-xs text-slate-300 break-words">
                        {message.message}
                    </li>
                </div>
            </div>
        );
    });

    useEffect(() => {
        async function fetchChatHistory() {
            // Call the function to get chat history
            const history = await getChatHistoryByChannel("global"); // Replace 'your-channel-name' with the desired channel name
            setChatHistory(history);
        }

        // Call the function on component mount
        fetchChatHistory();
    }, []);

    // useEffect(() => {
    //     console.log(chatHistory)
    //     if (scrollRef.current) {
    //       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    //     }
    //   }, [chatHistory]);

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
        <div className="z-20 bg-opacity-10 fixed bottom-0 left-0 sm:w-[400px] sm:h-[400px] bg-slate-800 p-6 rounded-lg text-salmon">
            <div ref={scrollRef} className="overflow-y-scroll sm:h-[300px]">
                {chatHistoryWindow}
            </div>

            {currentUser ? (
                newChatMessageWindow()
            ) : (
                <div className="flex justify-center items-center">
                    <h1>Login to chat.</h1>
                </div>
            )}
        </div>
    );
}
