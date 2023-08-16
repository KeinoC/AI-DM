import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase/firebase-auth';
import { signUp as signUpWithFirebase, signIn as signInWithFirebase, signOut as signOutWithFirebase } from '../firebase/firebase-auth';

// Create the context
const UserContext = createContext();

// Custom hook to use the User context
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

// UserProvider component
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = auth?.onAuthStateChanged(async user => {
            try {
                if (user) {
                    const userDoc = await db.collection('users').doc(user.uid).get();
                    setCurrentUser({ ...user, profile: userDoc.data() });
                } else {
                    setCurrentUser(null);
                }
            } catch (error) {
                console.error("Error during Firebase auth state change:", error);
            } finally {
                setLoading(false);
            }
        });
    
        return unsubscribe;
    }, []);
    

    const signUp = async (email, password) => {
        const user = await signUpWithFirebase(email, password);
        await db.collection('users').doc(user.uid).set({
            email: user.email,
            createdAt: new Date().toISOString()
        });
        setCurrentUser(user);
    };

    const signIn = async (email, password) => {
        const user = await signInWithFirebase(email, password);
        const userDoc = await db.collection('users').doc(user.uid).get();
        setCurrentUser({ ...user, profile: userDoc.data() });
    };

    const signOut = async () => {
        await signOutWithFirebase();
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        loading,
        signUp,
        signIn,
        signOut,
        // ... Add other CRUD operations as needed
    };

    // return (
    //     <UserContext.Provider value={value}>
    //         {!loading && children}
    //     </UserContext.Provider>
    // );
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
