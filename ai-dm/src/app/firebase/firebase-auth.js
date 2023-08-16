import { auth, db } from "./firebase-config";  // Note: You should also export 'db' from firebase-config

// Sign Up
export const signUp = async (email, password) => {
    const cred = await auth.createUserWithEmailAndPassword(email, password);

    // Create a user document in Firestore after signing up
    await db.collection('users').doc(cred.user.uid).set({
        // Add any default data: username, profile picture, etc.
        email: cred.user.email,
        createdAt: new Date().toISOString(),
        // ... any other fields
    });

    return cred.user;
};

// Sign In
export const signIn = (email, password) =>
    auth.signInWithEmailAndPassword(email, password).then((cred) => cred.user);

// Sign Out
export const signOut = () => auth.signOut();

// Password Reset
export const resetPassword = (email) => auth.sendPasswordResetEmail(email);

// Update Password
export const updatePassword = async (newPassword) => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error("No user is signed in");
    }
    return user.updatePassword(newPassword);
};

// CRUD Operations for the 'users' collection in Firestore

// Read user details
export const getUserDetails = async (uid) => {
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
        throw new Error('User not found');
    }
    return userDoc.data();
};

// Update user details
export const updateUserDetails = (uid, data) => {
    return db.collection('users').doc(uid).update(data);
};

// Delete user document (consider this carefully, as it's permanent!)
export const deleteUserDocument = (uid) => {
    return db.collection('users').doc(uid).delete();
};
