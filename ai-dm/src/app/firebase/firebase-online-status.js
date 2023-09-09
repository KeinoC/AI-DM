
import { ref, get, set, onDisconnect } from "firebase/database";
import { auth, realtimeDB } from "./firebase-config";

console.log(auth);

export const updateUserStatus = (status) => {
    try {
        const uid = auth.currentUser.uid;
        if (!uid) {
            console.log("UID is null or undefined.");
            return;
        }
        console.log(`UID is: ${uid}`);

        const userStatusDatabaseRef = ref(realtimeDB, `users/status/${uid}`);
        console.log(`userStatusDatabaseRef is: ${userStatusDatabaseRef}`);

        set(userStatusDatabaseRef, {
            status,
            lastSeen: new Date().toISOString(),
        });

        onDisconnect(userStatusDatabaseRef).set({
            status: "offline",
            lastSeen: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error in updateUserStatus:", error);
    }
};

export const initializeUserStatus = () => {
    updateUserStatus("online");
};

export const getUserStatuses = async () => {
    const userStatusDatabaseRef = ref(realtimeDB, "users/status");
    const snapshot = await get(userStatusDatabaseRef);
    const value = snapshot.val();

    const userStatusArray = [];

    for (const uid in value) {
        if (value.hasOwnProperty(uid)) {
            const userData = value[uid];
            userStatusArray.push({
                uid,
                ...userData,
            });
        }
    }
console.log(userStatusArray)
    return userStatusArray;
};

export const cleanUpUserStatus = () => {
    try {
        const uid = auth.currentUser?.uid;
        if (!uid) {
            console.log("UID is null or undefined, user already signed out.");
            return;
        }
        const userStatusDatabaseRef = ref(realtimeDB, `users/status/${uid}`);

        set(userStatusDatabaseRef, {
            status: "offline",
            lastSeen: new Date().toISOString(),
        });

    } catch (error) {
        console.error("Error in cleanUpUserStatus:", error);
    }
};




// No event listeners or idle timer needed
