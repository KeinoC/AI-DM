'use client'
import React, { createContext, useContext, useState, useEffect } from "react";
import { getAllItems } from '../firebase/firebase-db-items';


// * Initialize Context
const GrimoireContext = createContext();
export const useGrimoire = () => {
    const context = useContext(GrimoireContext);
    if (context === undefined) {
        throw new Error("useGrimoire must be used within a GrimoireProvider");
    }
    return context;
};

// * Grimoire global states logic
export const GrimoireProvider = ({ children }) => {

    const [displayedItems, setDisplayedItems] = useState([])
    const [allItems, setAllItems] = useState([])
    const [itemFilters, setItemFilters] = useState([{}])

    // fetch and set all items to allItems state
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const fetchedItems = await getAllItems();
                setAllItems(fetchedItems); // Set fetched items to allItems state
            } catch (error) {
                // Handle error here
                console.error('Error fetching items: ', error);
            }
        };

        fetchItems();
    }, []);

    useEffect(() => {
        if (allItems.length > 0) {
            setDisplayedItems(allItems);
        }
    }, [allItems, itemFilters])



// ******** Exporting global state values **********

    const value = {
        displayedItems,
        setDisplayedItems,
    };

    return (
        <GrimoireContext.Provider value={value}>{children}</GrimoireContext.Provider>
    );
}