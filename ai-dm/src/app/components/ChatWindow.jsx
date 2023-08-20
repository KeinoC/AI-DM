import React from "react";
import { useChat } from "../contexts/ChatContext";
import { useUser } from "../contexts/UserContext";
import {
    getCurrentUnixTimestamp,
    convertUnixToTime,
} from "../utils/helpers/timestamp";

// TODO: 'window' is temporarily undefined when component is mounted and an errors out for a brief moment. Need make sure it's loaded before component runs. not sure how yet
// TODO: chat history needs to auto scroll to bottom

export default function ChatWindow() {
    const { chatHistory, setChatHistory, newChatMessage, setNewChatMessage } =
        useChat();
    const { currentUser } = useUser();

    const handleSubmit = async (e) => {
        if (e.key === "Enter") {
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
            <div key={index} className="bg-gray-100 p-2 m-1 rounded">
                <li className="text-gray-500">{entry}</li>
            </div>
        );
    });

    const newChatMessageWindow = () => {
        return (
            <div className="flex mt-4">
                <input
                    type="text"
                    value={newChatMessage}
                    onChange={(e) => setNewChatMessage(e.target.value)}
                    onKeyUp={handleSubmit} // Handle Enter key press
                    className="flex-grow border rounded-l p-2 text-gray-500"
                />
                <button
                    onSubmit={() => handleSubmit()}
                    onClick={() => handleSubmit()}
                    className="bg-blue-500 text-white px-4 py-2 rounded-r"
                >
                    Send
                </button>
            </div>
        );
    };

    return (
        <div className="fixed bottom-0 left-0 w-1/4 max-h-1/4-screen bg-white bg-opacity-50 p-4 text-salmon">
            <div
                className="max-h-25vh overflow-y-auto"
            >
                {chatHistoryWindow}
            </div>
            {newChatMessageWindow()}
        </div>
    );
}
