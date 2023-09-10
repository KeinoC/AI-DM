import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db, realtimeDB } from "../firebase/firebase-config";
const { USERS } = require("../utils/variables/database-vars");
import { onValue, ref } from "firebase/database";
import {
    initializeUserStatus,
    cleanUpUserStatus,
    getUserStatuses,
    updateUserStatus,
} from "../firebase/firebase-online-status";

import {
    signUp as signUpWithFirebase,
    signOut as signOutWithFirebase,
    createUser,
} from "../firebase/firebase-auth";
import {
    getAdventuresCreatedByUserId,
    getAdventureById,
} from "../firebase/firebase-db-adventures";
const { doc, getDoc } = require("firebase/firestore");
import {
    navToMyProfile,
    navToMapNamed,
    navToHome,
} from "../utils/helpers/navigation";

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    // Profile Details
    const [advUserIsIn, setAdvUserIsIn] = useState(0);
    const [advCreatedByUser, setAdvCreatedByUser] = useState(0);
    const [userStatusArray, setUserStatusArray] = useState([]);

    // const [links, setLinks] = useState([])

    const signUp = async (email, password) => {
        const user = await signUpWithFirebase(email, password);
        // TODO: create firestore instance and set currentUser to it
    };
    // user statuses

    useEffect(() => {
        const fetchUserStatuses = async () => {
            try {
                const fetchedUserStatuses = await getUserStatuses();
                console.log(fetchedUserStatuses);
                setUserStatusArray(fetchedUserStatuses);
                console.log(fetchedUserStatuses);
            } catch (error) {
                console.error("Failed to fetch user statuses:", error);
            }
        };
        fetchUserStatuses();
    }, []);

    // auth change

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                const userDocRef = doc(db, "users", authUser.uid);
                const userDocSnapshot = await getDoc(userDocRef);

                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    setCurrentUser(userData);

                } else {
                    console.log(
                        "user does not exist in firestore, creating a new document."
                    );
                    // User does not exist in Firestore, create a new document
                    const user = {
                        uid: authUser.uid,
                        email: authUser.email,
                    };
                    // ... creates new user in firestore
                    createFirestoreUser(user);
                }
                // initializeUserStatus();
            } else {
                // cleanUpUserStatus();
                setCurrentUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    // * status update

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // ... your existing logic
                initializeUserStatus();
            }
        });
        return () => unsubscribe();
    }, []);

    // useEffect(() => {
    //     const userStatusDatabaseRef = ref(realtimeDB, "users/status");
        
    //     // Setup a listener for any changes on /users/status path
    //     const userStatusListener = onValue(userStatusDatabaseRef, (snapshot) => {
    //         const value = snapshot.val();
    //         const updatedUserStatusArray = [];
    //         // console.log(value)
    
    //         for (const uid in value) {
    //             if (value.hasOwnProperty(uid)) {
    //                 // console.log(uid)
    //                 const userData = value[uid];
    //                 updatedUserStatusArray.push({
    //                     uid,
    //                     ...userData,
    //                 });
    //             }
    //         }
    //         console.log(updatedUserStatusArray)
            
    //         setUserStatusArray(updatedUserStatusArray);
    //     });
    
    //     return () => {
    //         // Detach the listener when the component is unmounted
    //         userStatusListener();
    //     };
    // }, []);
    

    // ...

    
    // Parse profile data / current user stats
    useEffect(() => {
        const parseUserData = async () => {
            try {
                if (currentUser?.myAdventures) {
                    const advIds = currentUser.myAdventures;

                    // Using Promise.all to fetch all adventures by their IDs in parallel
                    const fullAdvData = await Promise.all(
                        advIds.map((advId) => getAdventureById(advId))
                    );

                    setAdvUserIsIn(fullAdvData);
                }

                if (currentUser?.id) {
                    const createdAdv = await getAdventuresCreatedByUserId(
                        currentUser.id
                    );
                    setAdvCreatedByUser(createdAdv);
                }
            } catch (error) {
                console.error("Error parsing user data: ", error);
            }
        };

        if (currentUser) {
            parseUserData();
        }
    }, [currentUser]);
    // Added dependency on currentUser

    const signOut = async () => {
        cleanUpUserStatus();
        await signOutWithFirebase();
        setCurrentUser(null);
        if (!currentUser) {
            navToHome();
            console.log("User signed out successfully");
        }
    };

    const value = {
        currentUser,
        signUp,
        signOut,
        selectedUser,
        setSelectedUser,
        advUserIsIn,
        advCreatedByUser,
        advUserIsIn,
        userStatusArray,
        setUserStatusArray,

        // links,
        // setLinks
        // ... Add other CRUD operations as needed
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
