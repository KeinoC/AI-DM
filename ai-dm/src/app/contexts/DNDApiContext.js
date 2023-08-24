"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";
import { DND_API_DB } from "./DNDApi.db";
import {
    getApiEquipmentByIndex,
    getEquipmentCategories,
} from "../dnd-api/api-equipment";

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
    const { currentUser } = useUser();
    const [apiEquipment, setAPIEquipment] = useState(0);
    const [equipCatIndexes, setEquipCatIndexes] = useState([]);
    const [equipCatObjs, setEquipCatObjs] = useState([]);
    const [selectedCat, setSelectedCat] = useState("");
    const [selectedArray, setSelectedArray] = useState([]);

    //
    const [equipCatNames, setEquipCatNames] = useState([]);

    // equipment categories >> use categories url to get all Equipment

    // ******** Categories Data **********

    // -- get equipment categories
    useEffect(() => {
        if (equipCatObjs.length !== 0) {
            return;
        } else {
            const fetchCategories = async () => {
                try {
                    // 1. Fetch the categories objects
                    const fetchedCategories = await getEquipmentCategories();
                    setEquipCatObjs(fetchedCategories.results);
                    console.log("equipment categories fetched");
                } catch (error) {
                    console.error("Error fetching categories: ", error);
                }
            };
            fetchCategories();
        }
    }, [equipCatObjs]);

    // Get all equipment
    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             // 1. Fetch the categories objects
    //             const fetchedCategories = await getEquipmentCategories();
    //             setEquipCatObjs(fetchedCategories?.results);

    //             // 2. Use the categories obj to get the urls
    //             const catUrls = fetchedCategories.results.map(
    //                 (cat) => cat?.url
    //             );

    //             // 3. Fetch data for each URL
    //             const intermediateResults = await Promise.all(
    //                 catUrls.map((url) =>
    //                     fetch(`https://www.dnd5eapi.co${url}`).then((res) =>
    //                         res.json()
    //                     )
    //                     )
    //                     );

    //             // 4. Extract equipment data from each intermediate result, then flatten into a single array
    //             let fetchedEquipment = intermediateResults.flatMap(
    //                 (result) => result.equipment || []
    //             );

    //             // 5. Fetch detailed data for each equipment item using `getApiEquipmentByIndex`
    //             const detailedEquipmentPromises = fetchedEquipment.map((item) => {
    //                 return item?.index
    //                     ? getApiEquipmentByIndex(item.index)
    //                     : null;
    //             });

    //             const detailedEquipment = await Promise.all(detailedEquipmentPromises);
    //             // Filter out any null or undefined values from detailedEquipment
    //             const filteredEquipment = detailedEquipment.filter(
    //                 (item) => item !== null && item !== undefined
    //             );

    //             // Set the detailed Equipment to global state
    //             setAPIEquipment(filteredEquipment);
    //         } catch (error) {
    //             console.error("Error fetching categories: ", error);
    //         }
    //     };

    //     // Call the function
    //     fetchCategories();
    // }, []);

    // console.log(apiEquipment)

    // ******** Locally / client Stored Equipment Data **********

    useEffect(() => {
        if (currentUser) {
            setAPIEquipment(DND_API_DB);
        }
    }, [currentUser]);

    const value = {
        apiEquipment,
        equipCatObjs,
        selectedCat,
        setSelectedCat,
        selectedArray,
        setSelectedArray,
    };

    return (
        <DNDApiContext.Provider value={value}>
            {children}
        </DNDApiContext.Provider>
    );
};
