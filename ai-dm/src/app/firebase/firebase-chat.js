import { realtimeDB } from "./firebase-config";
const { ref, set, orderByChild, limitToLast, query, get } = require("firebase/database");

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

export async function getChatHistoryByChannel(channel) {
    try {
        // Reference to the global chat
        const globalChatRef = ref(realtimeDB, `${channel}/global-chat`);

        // Create a query to get the last 100 messages ordered by timestamp
        const messagesQuery = query(globalChatRef, orderByChild('timestamp'), limitToLast(100));

        const snapshot = await get(messagesQuery);

        if (snapshot.exists()) {
            // Return the messages as an array of objects.
            // The messages will be ordered from the oldest to the newest
            return Object.values(snapshot.val()).sort((a, b) => a.timestamp - b.timestamp);
        } else {
            console.log('No messages found');
            return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function deleteMessage(channel, messageId) {
    try {
        const messageRef = ref(realtimeDB, `${channel}/global-chat/${messageId}`);
        await remove(messageRef);
    } catch (error) {
        console.error(error);
    }
}

export async function editMessage(channel, messageId, newContent) {
    try {
        const messageRef = ref(realtimeDB, `${channel}/global-chat/${messageId}`);
        await update(messageRef, { message: newContent });
    } catch (error) {
        console.error(error);
    }
}

export async function getMessageById(channel, messageId) {
    try {
        const messageRef = ref(realtimeDB, `${channel}/global-chat/${messageId}`);
        const snapshot = await get(messageRef);
        return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getOlderMessages(channel, earliestTimestamp, limit=100) {
    const globalChatRef = ref(realtimeDB, `${channel}/global-chat`);
    const messagesQuery = query(globalChatRef, orderByChild('timestamp'), endAt(earliestTimestamp - 1), limitToLast(limit));
    
    const snapshot = await get(messagesQuery);
    if (snapshot.exists()) {
        return Object.values(snapshot.val()).sort((a, b) => a.timestamp - b.timestamp);
    } else {
        return [];
    }
}

