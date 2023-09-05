"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getAllAdventures, testRealtimeGet } from "../firebase/firebase-db-adventures";

// * Initialize Context
const AdventureContext = createContext();
export const useAdventure = () => {
    const context = useContext(AdventureContext);
    if (context === undefined) {
        throw new Error("useAdventure must be used within a AdventureProvider");
    }
    return context;
};

export const AdventureProvider = ({ children }) => {
    const [newAdventureData, setNewAdventureData] = useState([]);
    const [allAdventures, setAllAdventures] = useState([]);
    const [createAdventureMode, setCreateAdventureMode] = useState(false);
    const [selectedAdventure, setSelectedAdventure] = useState({});
    const [tokens, setTokens] = useState(selectedAdventure?.selectedAdventure?.tokens || []) // attempting to make this global, in order to set it in the handleJoinAdventure button.

// *** Fetch Adventure Functionality ***
    useEffect(() => {
        const fetchAdventures = async () => {
            try {
                const fetchedAdventures = await getAllAdventures();
                setAllAdventures(fetchedAdventures);
            } catch (error) {
                console.error("Failed to fetch adventures:", error);
            }
        };

        const fetchTokens = async () => {
            if (selectedAdventure) {
                const advId = await selectedAdventure.id;
                console.log(advId);
                try {
                    const fetchedTokens = await testRealtimeGet(advId);
                    setTokens(fetchedTokens);
                    console.log("tokens fetched:", fetchedTokens);
                } catch(error) {
                    console.error("Failed to fetchTokens:", error);
                }
            }
        };

        fetchAdventures();
        fetchTokens();
    }, []);




    const value = {
        allAdventures,
        setAllAdventures,
        newAdventureData,
        setNewAdventureData,
        createAdventureMode,
        setCreateAdventureMode,
        selectedAdventure,
        setSelectedAdventure,
        tokens,
        setTokens,
    
    };

    return (
        <AdventureContext.Provider value={value}>
            {children}
        </AdventureContext.Provider>
    );
};
