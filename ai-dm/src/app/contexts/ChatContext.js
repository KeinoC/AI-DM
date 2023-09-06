'use client'
import React, { createContext, useContext, useState } from "react";

// * Initialize Context
const ChatContext = createContext();
export const useChat = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error("ussChat must be used within a ChatProvider");
    }
    return context;
};

export const ChatProvider = ({ children }) => {

    const [chatHistory, setChatHistory] = useState([])
    const [newChatMessage, setNewChatMessage] = useState([])
    const [globalChatHistory, setGlobalChatHistory] = useState([])
    const [newGlobalMessage, setNewGlobalMessage] = useState("")
    const [newAdvMessage, setNewAdvMessage] = useState("")
    const [advChatHistory, setAdvChatHistory] = useState([])

    // * hub 
    const [hubArea, setHubArea] = useState(100)

    const value = {
        chatHistory,
        setChatHistory,
        newChatMessage,
        setNewChatMessage,
        globalChatHistory,
        setGlobalChatHistory,
        newGlobalMessage,
        setNewGlobalMessage,
        newAdvMessage,
        setNewAdvMessage,
        advChatHistory,
        setAdvChatHistory,
        hubArea,
        setHubArea,
    };

    return (
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    );
}