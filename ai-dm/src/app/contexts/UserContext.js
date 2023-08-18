import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase-config";
import {
    signUp as signUpWithFirebase,
    signIn as signInWithFirebase,
    signOut as signOutWithFirebase,
} from "../firebase/firebase-auth";
import { doc, getDoc } from "firebase/firestore";
import { navToMyProfile, navToHome } from "../utils/helpers/navigation";

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
        setCurrentUser(user);
    };

    const signIn = async (email, password) => {
        const user = await signInWithFirebase(email, password);
        const userDoc = await db.collection("users").doc(user.uid).get();
        setCurrentUser({ ...user, profile: userDoc.data() });
    };

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
        signIn,
        signOut,
        // ... Add other CRUD operations as needed
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
