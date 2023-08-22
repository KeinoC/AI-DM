import { db } from "./firebase-config";
import { ref, push } from "firebase/database";


export async function sendGlobalMessage(channel, message, user) {
    try {
        const senderName = user.firstName;
        const chatRef = ref(db, `${channel}/chat-history`);
        const newMessage = {
            senderName,
            message,
            timestamp: Date.now()
        };
        await push(chatRef, newMessage);
    } catch (error) {
        console.error(error);
    }
}
