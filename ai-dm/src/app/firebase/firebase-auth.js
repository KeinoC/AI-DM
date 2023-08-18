import { auth, db } from "./firebase-config"; // Note: You should also export 'db' from firebase-config
import { navToMyProfile } from "../utils/helpers/navigation";
const {
    createUserWithEmailAndPassword,
} = require("firebase/auth");
import { signInWithEmailAndPassword } from "firebase/auth";
const {
    doc,
    setDoc,
    Timestamp,
    collection,
    getDocs,
    addDoc,
    updateDoc,
    getFirestore,
} = require("firebase/firestore");

import { USERS } from "../utils/variables/database-vars";

// Sign Up
// check if profile / email already exist. and throw error / exception

export const createUser = async (id, email, createdAt) => {
    try {
        const newUser = {
            id: id,
            email: email,
            createdAt: createdAt,
        };
        const docRef = doc(db, USERS, id);
        await setDoc(docRef, newUser);

        console.log("User document created successfully");
    } catch (error) {
        console.error("Error creating user document:", error);
    }
};

export const signUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        // Check if email already exists in the 'users' collection
        if (user) {
            const id = user?.uid;
            const email = user?.email;
            const createdAt = Timestamp.fromDate(new Date());
            await createUser(id, email, createdAt);
        }
        console.log("Document written with ID:", user.uid);
        navToMyProfile();
        return user;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
    }
};


export const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Successful sign-in logic
        if (user) {
            console.log("User signed in successfully:", user.uid);
            navToMyProfile(); // Navigate to the user's profile page
            return user;
        }
    } catch (error) {
        // Handle sign-in errors
        const errorCode = error.code;
        const errorMessage = error.message;
        
        // You can handle different error codes with custom messages
        if (errorCode === "auth/wrong-password") {
            console.error("Wrong password");
        } else if (errorCode === "auth/user-not-found") {
            console.error("User not found");
        } else {
            console.error("Sign-in error:", errorMessage);
        }
        
        // You can also return the error message or code for displaying to the user
        // return { errorCode, errorMessage };
    }
};




// // Sign Out
// export const signOut = () => auth.signOut();

// // Password Reset
// export const resetPassword = (email) => auth.sendPasswordResetEmail(email);

// // Update Password
// export const updatePassword = async (newPassword) => {
//     const user = auth.currentUser;
//     if (!user) {
//         throw new Error("No user is signed in");
//     }
//     return user.updatePassword(newPassword);
// };

// CRUD Operations for the 'users' collection in Firestore

// // Read user details
// export const getUserDetails = async (uid) => {
//     const userDoc = await db.collection("users").doc(uid).get();
//     if (!userDoc.exists) {
//         throw new Error("User not found");
//     }
//     return userDoc.data();
// };

// // Update user details
// export const updateUserDetails = (uid, data) => {
//     return db.collection("users").doc(uid).update(data);
// };

// // Delete user document (consider this carefully, as it's permanent!)
// export const deleteUserDocument = (uid) => {
//     return db.collection("users").doc(uid).delete();
// };
