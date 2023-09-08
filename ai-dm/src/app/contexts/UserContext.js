import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase-config";
const { USERS } = require("../utils/variables/database-vars");
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

    // const [links, setLinks] = useState([])

    const signUp = async (email, password) => {
        const user = await signUpWithFirebase(email, password);
        // TODO: create firestore instance and set currentUser to it
    };

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
            } else {
                // Auth user is null, meaning user signed out
                setCurrentUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

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

        // links,
        // setLinks
        // ... Add other CRUD operations as needed
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
