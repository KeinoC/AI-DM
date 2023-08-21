'use client'
import React, { createContext, useContext, useState, useEffect } from "react";
import { getApiEquipmentByIndex, getAllApiEquipment } from "../dnd-api/api-equipment";

// * Initialize Context
const DNDApiContext = createContext();
export const useDNDApi = () => {
    const context = useContext(DNDApiContext);
    if (context === undefined) {
        throw new Error("ussDNDApi must be used within a DNDApiProvider");
    }
    return context;
};

export const DNDApiProvider = ({ children }) => {

    const [apiItems, setAPIItems] = useState(0)

    useEffect(() => {
        const item = getApiEquipmentByIndex("shortsword")
        const items = getAllApiEquipment()
        console.log(item, items);
    }, [])

    const value = {
        apiItems
    };

    return (
        <DNDApiContext.Provider value={value}>{children}</DNDApiContext.Provider>
    );
}