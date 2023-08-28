"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getAllAdventures } from "../firebase/firebase-db-adventures";

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
    const [selectedAdventure, setSelectedAdventure] = useState(null);


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

        fetchAdventures();
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
    
    };

    return (
        <AdventureContext.Provider value={value}>
            {children}
        </AdventureContext.Provider>
    );
};
