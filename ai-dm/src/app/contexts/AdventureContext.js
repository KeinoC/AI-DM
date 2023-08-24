'use client'
import React, { createContext, useContext, useState } from "react";

// * Initialize Context
const AdventureContext = createContext();
export const useAdventure = () => {
    const context = useContext(AdventureContext);
    if (context === undefined) {
        throw new Error("ussAdventure must be used within a AdventureProvider");
    }
    return context;
};

export const AdventureProvider = ({ children }) => {

    const [newAdventureMessage, setNewAdventureMessage] = useState([])

    

    const value = {
        adventureHistory,
        setAdventureHistory,
        newAdventureMessage,
        setNewAdventureMessage,
    };

    return (
        <AdventureContext.Provider value={value}>{children}</AdventureContext.Provider>
    );
}