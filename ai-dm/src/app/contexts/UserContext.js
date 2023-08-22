import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase-config";
const { USERS } = require("../utils/variables/database-vars");
import {
    signUp as signUpWithFirebase,
    signOut as signOutWithFirebase,
    createUser
} from "../firebase/firebase-auth";
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
                    // User does not exist in Firestore, create a new document
                    const user = {
                        uid: authUser.uid,
                        email: authUser.email,
                    };
                    // ... creates new user in firestore
                    createFirestoreUser(user)

                }
            } else {
                // Auth user is null, meaning user signed out
                setCurrentUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    // async function signIn(email, password) {
    //     try {
    //         const authUser = await signInWithFirebase(email, password);
    //         console.log(authUser.uid);
    //         debugger;

    //         // Get user data from Firestore USERS collection
    //         const userDocRef = doc(db, "users", authUser.uid);
    //         const userDocSnapshot = await getDoc(userDocRef);
    //         if (userDocSnapshot.exists()) {
    //             const userData = userDocSnapshot.data();
    //             console.log("user data: ", userData);
    //             setCurrentUser(userData);
    //         } else {
    //             // User does not exist in Firestore, create a new document
    //             const user = {
    //                 uid: authUser.uid,
    //                 email: email,
    //             };
    //             setCurrentUser(user);
    //         }
    //     } catch (error) {
    //         console.error("Sign-in error:", error);
    //     }
    // }

    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged(async (user) => {
    //         if (user) {
    //             try {
    //                 const userDocRef = doc(db, "users", user.uid); // Reference to the user document
    //                 const userDocSnapshot = await getDoc(userDocRef); // Get the document snapshot

    //                 if (userDocSnapshot.exists()) {
    //                     const userData = userDocSnapshot.data(); // Get user data from the snapshot
    //                     const updatedUser = { ...user, profile: userData };
    //                     setCurrentUser(updatedUser);
    //                     navToMyProfile();
    //                 } else {
    //                     console.log("User profile document does not exist.");
    //                 }
    //             } catch (error) {
    //                 console.error("Error fetching user profile:", error);
    //             }
    //         } else {
    //             setCurrentUser(null);
    //             navToHome();
    //         }
    //     });

    //     return unsubscribe;
    // }, []);

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
        // ... Add other CRUD operations as needed
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
