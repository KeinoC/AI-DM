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
    const [newAdventure, setNewAdventure] = useState([]);
    const [allAdventures, setAllAdventures] = useState([]);

    useEffect(() => {
        const fetchAdventures = async () => {
            try {
                const fetchedAdventures = await getAllAdventures();
                setAllAdventures(fetchedAdventures);
                console.log(fetchedAdventures);
            } catch (error) {
                console.error("Failed to fetch adventures:", error);
            }
        };

        fetchAdventures();
    }, []);

    const value = {
        allAdventures,
        setAllAdventures,
        newAdventure,
        setNewAdventure,
    };

    return (
        <AdventureContext.Provider value={value}>
            {children}
        </AdventureContext.Provider>
    );
};
