const { realtimeDB } = require("./firebase-config") ;
const {
    ref,
    set,
    orderByChild,
    limitToLast,
    query,
    get,
    on,
    off,
} = require("firebase/database");

export async function sendAdvMessage(adventureId, currentUser, message) {
    try {
        if (!adventureId) {
            throw new Error("Invalid Adventure");
        }

        if (!currentUser) {
            throw new Error("Invalid User as Sender");
        }

        if (message.length < 1) {
            throw new Error("Invalid Message");
        }

        const sender = currentUser?.username.toLowerCase();
        const newMessageRef = ref(
            realtimeDB,
            `chat/adventure-chat/${adventureId}/${Date.now()}`
            )
            const profileImage = currentUser?.profileImage ? currentUser?.profileImage : "https://tinyurl.com/aidmprofileimg"

            if (!newMessageRef) {
                throw new Error("Invalid Message Ref")
            }
            const newMessage = {
                sender: sender,
                message: message,
                timestamp: Date.now(),
                profileImage: profileImage
            };

        await set(newMessageRef, newMessage);
    } catch (error) {
        console.error(error);
    }
}

export async function sendGlobalMessage(currentUser, message) {
    try {

        if (!currentUser) {
            throw new Error("Invalid User as Sender");
        }

        if (message.length < 1) {
            throw new Error("Invalid Message");
        }

        const sender = currentUser?.username.toLowerCase();
        const newMessageRef = ref(
            realtimeDB,
            `chat/global-chat/${Date.now()}`
            )
        
        const profileImage = currentUser.profileImage ? currentUser.profileImage : "https://tinyurl.com/aidmprofileimg"
            if (!newMessageRef) {
                throw new Error("Invalid Message Ref")
            }
            const newMessage = {
                sender: sender,
                message: message,
                timestamp: Date.now(),
                profileImage: profileImage

            };

        await set(newMessageRef, newMessage);
    } catch (error) {
        console.error(error);
    }
}

export async function getChatHistoryByChannel(channel, limit = 100) {
    try {
        const dbRef = ref(realtimeDB, channel);
        const dbQuery = query(dbRef, limitToLast(limit));
        const snapshot = await get(dbQuery);

        if (!snapshot.exists()) {
            return [];
        }
        

        const data = snapshot.val();
        return Object.values(data);

    } catch (error) {
        console.error("Error fetching chat history:", error);
        throw error;
    }
}



export const subscribeToChatUpdates = (channel, callback, limit = 1) => {
    const dbRef = ref(realtimeDB, channel);
    const dbQuery = query(dbRef, limitToLast(limit)); // Create a query with limit
    
    const handleNewMessage = snapshot => {
        const newMessage = snapshot.val();
        callback(newMessage);
    }

    // Subscribe to child_added event
    try {
        on(dbQuery, 'child_added', handleNewMessage);  // Using `on` method on the Query object
        // console.log("dbQuery:"+ dbQuery)
        // console.log("on", on)
    } catch (error) {
        console.error("Error subscribing to chat updates:", error);
        throw error; // Propagate the error for further handling
    }

    // Return an unsubscribe function for cleanup
    return () => {
        try {
            off(dbQuery, 'child_added', handleNewMessage); // Use `off` method on the Query object
            console.log("off", off)
        } catch (error) {
            console.error("Error unsubscribing from chat updates:", error);
        }
    };
}





async function testDataRetrieval() {
    try {
        // Reference to the specific path "chat/adventure-chat"
        const specificPathRef = ref(realtimeDB, "chat/adventure-chat/");

        // Fetch the value at the specific path
        const snapshot = await get(specificPathRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            // console.log("Fetched data:", data);
        } else {
            console.log("No data found at the specified path");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Call the function to test data retrieval
// testDataRetrieval();

// export async function getChatHistoryByChannel(channel, roomId) {
//     try {
//         const chatPathRef = ref(realtimeDB, channel + "/" + roomId);
//         const snapshot = await get(chatPathRef);

//         if (snapshot.exists()) {
//             return Object.values(snapshot.val()).sort(
//                 (a, b) => a.timestamp - b.timestamp
//             );
//         } else {
//             console.log("No messages found");
//             return [];
//         }
//     } catch (error) {
//         console.error(error);
//         return [];
//     }
// }

// export async function deleteMessage(channel, messageId, roomId) {
//     try {
//         const messageRef = ref(realtimeDB, `${channel}/${roomId}/${messageId}`);
//         await remove(messageRef);
//     } catch (error) {
//         console.error(error);
//     }
// }

export async function editMessage(channel, messageId, newContent, roomId) {
    try {
        const messageRef = ref(realtimeDB, `${channel}/${roomId}/${messageId}`);
        await update(messageRef, { message: newContent });
    } catch (error) {
        console.error(error);
    }
}

export async function getMessageById(channel, messageId, roomId) {
    try {
        const messageRef = ref(realtimeDB, `${channel}/${roomId}/${messageId}`);
        const snapshot = await get(messageRef);
        return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getOlderMessages(
    channel,
    earliestTimestamp,
    limit = 100,
    roomId
) {
    const globalChatRef = ref(realtimeDB, `${channel}/${roomId}`);
    const messagesQuery = query(
        globalChatRef,
        orderByChild("timestamp"),
        endAt(earliestTimestamp - 1),
        limitToLast(limit)
    );

    const snapshot = await get(messagesQuery);
    if (snapshot.exists()) {
        return Object.values(snapshot.val()).sort(
            (a, b) => a.timestamp - b.timestamp
        );
    } else {
        return [];
    }
}
