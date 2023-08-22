import { realtimeDB } from "./firebase-config";
const { ref, set } = require("firebase/database");

export async function sendGlobalMessage(channel, message, currentUser) {
    try {

        // Create a unique reference for the new message
        const newMessageRef = ref(realtimeDB, `${channel}/global-chat/${Date.now()}`);

        console.log(channel, message, currentUser)
        const newMessage = {
            sender: currentUser?.firstName,
            message: message,
            timestamp: Date.now(),
        };

        await set(newMessageRef, newMessage);
    } catch (error) {
        console.error(error);
    }
}
