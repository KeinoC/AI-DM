"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
    getAllAdventures,
    testRealtimeGet,
    realtimeTokens,
    getTokensData,
    getRealtimeAdventure,
} from "../firebase/firebase-db-adventures";
import { useRouter, usePathname, getRoute } from "next/navigation";

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
    const [currentPath, setCurrentPath] = useState("");
    const [adventureCreator, setAdventureCreator] = useState(null);
    const [selectedAdventureId, setSelectedAdventureId] = useState("");
    const [newAdventureData, setNewAdventureData] = useState([]);
    const [allAdventures, setAllAdventures] = useState([]);
    const [createAdventureMode, setCreateAdventureMode] = useState(false);
    const [selectedAdventure, setSelectedAdventure] = useState({});
    const [tokens, setTokens] = useState([]);

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
        // fetchTokens();
    }, []);

    const pathname = usePathname();

    // useEffect(() => {
    //     console.log(pathname);
    //     if (pathname) {
    //         console.log(pathname)
    //         const pathnameString = pathname.toString();
    //         const pathSegments = pathnameString?.split("/");
    //         const idSegment =
    //             pathSegments[pathSegments?.length - 1].toLowerCase();
    //         // console.log(idSegment);
    //         setSelectedAdventureId(idSegment);
    //     }
    // }, [pathname]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (pathname) {
                    const pathnameString = pathname.toString();
                    if (typeof pathnameString === "string") {
                        const pathSegments = pathnameString.split("/");
                        const idSegment =
                            pathSegments[pathSegments.length - 1].toLowerCase();
                        setSelectedAdventureId(idSegment);
                    }
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };

        fetchData();
    }, [pathname]);

    useEffect(() => {
        const fetchCurrentAdventure = async () => {
            if (selectedAdventureId) {
                const adventureData = await getRealtimeAdventure(
                    selectedAdventureId,
                    setSelectedAdventure
                );

                adventureData && setSelectedAdventure(adventureData);
                // console.log(selectedAdventure);
            }
        };
        fetchCurrentAdventure();
    }, [selectedAdventureId]);

    useEffect(() => {
        const fetchTokens = async () => {
            if (selectedAdventure) {
                const tokensData = await selectedAdventure.tokens;
                console.log(tokensData);
                tokensData && setTokens(tokensData);
            }
        };
        fetchTokens();
    }, [selectedAdventure]);

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
        selectedAdventureId,
        adventureCreator,
        setAdventureCreator,
    };

    return (
        <AdventureContext.Provider value={value}>
            {children}
        </AdventureContext.Provider>
    );
};
