// import { ref, set, onDisconnect } from "firebase/database";
// import { auth, realtimeDB } from "./firebase-config";

// console.log(auth);

// let idleTimer;

// const setIdle = () => {
//     updateUserStatus("idle");
// };

// export const updateUserStatus = (status) => {
//     try {
//         const uid = auth.currentUser.uid;
//         if (!uid) {
//             console.log("UID is null or undefined.");
//             return;
//         }
//         console.log(`UID is: ${uid}`);

//         const userStatusDatabaseRef = ref(realtimeDB, `status/${uid}`);
//         console.log(`userStatusDatabaseRef is: ${userStatusDatabaseRef}`);

//         set(userStatusDatabaseRef, {
//             status,
//             lastSeen: new Date().toISOString(),
//         });

//         onDisconnect(userStatusDatabaseRef).set({
//             status: "offline",
//             lastSeen: new Date().toISOString(),
//         });
//     } catch (error) {
//         console.error("Error in updateUserStatus:", error);
//     }
// };

// export const initializeUserStatus = () => {
//     updateUserStatus("online");

//     document.addEventListener("mousemove", resetIdleTimer, false);
//     document.addEventListener("mousedown", resetIdleTimer, false);
//     document.addEventListener("keypress", resetIdleTimer, false);
//     document.addEventListener("DOMMouseScroll", resetIdleTimer, false);
//     document.addEventListener("mousewheel", resetIdleTimer, false);
//     document.addEventListener("touchmove", resetIdleTimer, false);
//     document.addEventListener("MSPointerMove", resetIdleTimer, false);

//     startIdleTimer();
// };

// const startIdleTimer = () => {
//     idleTimer = setTimeout(setIdle, 5 * 60 * 1000);
// };

// const resetIdleTimer = () => {
//     clearTimeout(idleTimer);
//     updateUserStatus("online");
//     startIdleTimer();
// };

// export const cleanUpUserStatus = () => {
//     document.removeEventListener("mousemove", resetIdleTimer, false);
//     document.removeEventListener("mousedown", resetIdleTimer, false);
//     document.removeEventListener("keypress", resetIdleTimer, false);
//     document.removeEventListener("DOMMouseScroll", resetIdleTimer, false);
//     document.removeEventListener("mousewheel", resetIdleTimer, false);
//     document.removeEventListener("touchmove", resetIdleTimer, false);
//     document.removeEventListener("MSPointerMove", resetIdleTimer, false);
//     clearTimeout(idleTimer);
// };

import { ref, set, onDisconnect } from "firebase/database";
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

        const userStatusDatabaseRef = ref(realtimeDB, `status/${uid}`);
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

// No event listeners or idle timer needed

