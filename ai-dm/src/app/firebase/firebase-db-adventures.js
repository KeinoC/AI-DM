const {
    collection,
    doc,
    getDocs,
    onSnapshot,
    setDoc,
    Timestamp,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    getFirestore,
    query,
    where,
    arrayUnion,
    arrayRemove,
    runTransaction,
} = require("firebase/firestore");
import { auth, db, realtimeDB } from "./firebase-config";
import { ITEMS } from "../utils/variables/database-vars";
import { getUserIdByUsername } from "./firebase-auth";
import { navToFullRoute } from "../utils/helpers/navigation";
import {
    ref,
    limitToLast,
    onValue,
    on,
    off,
    get,
    set,
    query as realtimeQuery,
} from "firebase/database";
// import { useUser } from "../contexts/UserContext";

// const {currentUser} = useUser();
// ********* realtimeDB update functionality ****************

// testing generic get based on firebase docs

export async function testRealtimeGet(adventureId, setTokens) {
    // console.log(adventureId);
    try {
        const tokensRef = ref(
            realtimeDB,
            `adventures/${adventureId}/game-state/tokens`
        );
        onValue(tokensRef, (snapshot) => {
            const tokensData = snapshot.val();
            // console.log(tokensData);
            if(setTokens) {
                setTokens(tokensData);
                // console.log("tokens set - fb-db-adv: ", tokensData);
            }
        });
    } catch (error) {
        console.error("Error fetching tokens data", error);
        throw error;
    }
}

// *** this section is where we model gamestate off of the global chat

export async function updateGamestate(
    adventureId,
    updatedTokensData,
) {
    try {
        // adventure argument check.

        if (!updatedTokensData) {
            throw new Error("No tokens");
        }

        const gameStateRef = ref(
            realtimeDB,
            `adventures/${adventureId}/game-state/tokens`
        );
        if (!gameStateRef) {
            throw new Error("No game state ref");
        }

        const newTokenData = updatedTokensData.map((token) => {
            return {
                id: token.id,
                img: token.img,
                name: token.name,
                position: token.position,
                user: token.user,
            };
        });

        await set(gameStateRef, newTokenData);
        console.log(Object.values(newTokenData));
        // return Object.values(data);
    } catch (error) {
        console.error("Error updating game state", error);
        throw error;
    }
}


export function realtimeTokens(adventureId, setTokens) {
    try {
        const dbRef = ref(
            realtimeDB,
            `adventures/${adventureId}/game-state/tokens`
        );

        // Set up a query to get the latest tokens (limiting to the last one in this case)
        const dbQuery = query(dbRef, limitToLast(1));

        // Attach an event listener to this query
        const unsubscribe = onValue(
            dbQuery,
            (snapshot) => {
                if (!snapshot.exists()) {
                    setTokens([]);
                    return;
                }

                const tokensData = snapshot.val();
                const tokenDataObject = Object.values(tokensData);

                // Update your component's state here
                setTokens(tokenDataObject);

                // console.log("Updated tokens: ", tokenDataObject);
            },
            (error) => {
                console.error("Error fetching data: ", error);
            }
        );

        // The 'unsubscribe' function can be used to remove this listener when you no longer need it,
        // for example, when the component unmounts
        return unsubscribe;
    } catch (error) {
        console.error("Error retrieving tokens data: ", error);
    }
}

export async function getTokensData(adventureId, setTokens) {
    try {
        // Create a reference to the tokens data in the Realtime Database
        const tokensRef = ref(
            realtimeDB,
            `adventures/${adventureId}/game-state/tokens`
        );

        // Fetch the data
        const snapshot = await get(tokensRef);

        // Check if data exists
        if (snapshot.exists()) {
            setTokens(snapshot.val());
            return snapshot.val(); // Returns the tokens data
        } else {
            throw new Error("No tokens data found");
        }
    } catch (error) {
        console.error("Error fetching tokens data", error);
        throw error;
    }
}

export async function getRealtimeAdventure(adventureId, setSelectedAdventure) {
    try {
        // Create a reference to the tokens data in the Realtime Database
        const adventureRef = ref(
            realtimeDB,
            `adventures/${adventureId}`
        );

        // Fetch the data
        const snapshot = await get(adventureRef);

        // Check if data exists
        if (snapshot.exists()) {
            setSelectedAdventure(snapshot.val());
            // return snapshot.val(); // Returns the tokens data
        } else {
            return
        }
    } catch (error) {
        console.error("Error fetching adventure data", error);
        throw error;
    }
}

export const listenRealtimeTokens = (adventureId, setTokens) => {
    const dbRef = ref(
        realtimeDB,
        `adventures/${adventureId}/game-state/tokens`
    );
    const dbQuery = realtimeQuery(dbRef, limitToLast(1));

    const handleTokensData = (snapshot) => {
        const tokensData = snapshot.val();
        setTokens(tokensData);
    };

    // Subscribe to child_added event

    try {
        on(dbQuery, handleTokensData);
        // console.log("dbQuery: " + dbQuery);
        // console.log("on: " + on);
    } catch (error) {
        console.error("Error listening to tokens data", error);
        throw error;
    }

    // return an unsubscribe function for cleanup
    return () => {
        try {
            off(dbQuery, "child_added", handleTokensData);
            // console.log("off: " + off);
        } catch (error) {
            console.error("Error listening to tokens data", error);
        }
    };
};

// ***

// Initialize your Realtime Database

export async function updateRealtimeAdventure(adventureId, gameState) {
    try {
        // Log for debugging
        console.log(JSON.stringify(gameState, null, 2));

        // Clean the object
        const cleanGameState = JSON.parse(JSON.stringify(gameState));

        // Update Realtime Database
        const gameStateRef = ref(
            realtimeDB,
            `/adventure/${adventureId}`
        );
        await set(gameStateRef, cleanGameState);

        console.log(
            "Adventure's game-state updated successfully in Realtime Database"
        );
    } catch (error) {
        console.error(
            "Error updating adventure's game-state in Realtime Database:",
            error
        );
        throw error;
    }
}

export async function realtime(adventureId, updatedTokenData) {
    try {
        // Create a reference to the specific adventure
        const adventureRef = ref(
            realtimeDB,
            `/adventures/${adventureId}/game-state/tokens`
        );

        // Perform the update
        await update(adventureRef, updatedTokenData);

        console.log(`Token Positions Reassigned`);
    } catch (error) {
        console.error("Error updating token positions:", error);
    }
}

// Listener to automatically update all clients
export function realtimeListener(adventureId, callback) {
    const tokensRef = ref(
        realtimeDB,
        `/adventures/${adventureId}/game-state/tokens`
    );

    const unsubscribe = onValue(tokensRef, (snapshot) => {
        const tokens = snapshot.val();
        callback(tokens);
    });

    // Use this function to stop listening to changes
    return () => off(tokensRef, unsubscribe);
}

export async function updateTokenPosition(adventureId, tokenId, newPosition) {
    try {
        // Initialize database

        // Prepare the updates
        let updates = {};
        updates[
            `/adventure/${adventureId}/game-state/tokens/${tokenId}/position`
        ] = newPosition;

        // Update the data in the Realtime Database
        await update(ref(realtimeDB), updates);

        console.log(
            "Token's position updated successfully in Realtime Database"
        );
    } catch (error) {
        console.error("Error updating tokens in Realtime Database:", error);
        throw error;
    }
}

// * Firestore adventures collection CRUD Methods * ----------------
// Create Adventure
export async function createAdventure(adventureData) {
    try {
        const adventuresCollection = collection(db, "adventures");

        const newAdventureRef = await addDoc(adventuresCollection, {
            ...adventureData,
            createdAt: Timestamp.fromDate(new Date()),
            createdBy: auth.currentUser.uid,
            players: [],
            tokens: [],
        });

        navToFullRoute(`./adventures/${newAdventureRef.id}`);
        console.log("Adventure created with ID: ", newAdventureRef.id);
        return newAdventureRef.id;
    } catch (error) {
        console.error("Error creating adventure: ", error);
        throw error;
    }
}

// Get All Adventures from DB
export async function getAllAdventures() {
    try {
        const adventuresCollection = collection(db, "adventures");
        const querySnapshot = await getDocs(adventuresCollection);

        return querySnapshot.docs.map((adventure) => ({
            id: adventure.id,
            ...adventure.data(),
        }));
    } catch (error) {
        console.error("Error getting adventures: ", error);
        throw error;
    }
}

// Get Adventure by ID
export async function getAdventureById(adventureId) {
    try {
        const adventureDocRef = doc(db, "adventures", adventureId);
        const adventureSnapshot = await getDoc(adventureDocRef);

        if (adventureSnapshot.exists()) {
            const adventureData = adventureSnapshot.data();
            return { id: adventureSnapshot.id, ...adventureData };
        } else {
            throw new Error("Adventure not found");
        }
    } catch (error) {
        console.error("Error getting adventure by ID: ", error);
        throw error;
    }
}

// Update Adventure by ID - firestore adventure
export async function updateAdventure(adventureId, updateData) {
    try {
        const adventureDocRef = doc(db, "adventures", adventureId);
        await updateDoc(adventureDocRef, updateData);

        console.log("Adventure updated successfully");
    } catch (error) {
        console.error("Error updating adventure: ", error);
        throw error;
    }
}

// Delete Adventure by ID
export async function deleteAdventure(adventureId) {
    try {
        const adventureDocRef = doc(db, "adventures", adventureId);
        await deleteDoc(adventureDocRef);

        console.log("Adventure deleted successfully");
    } catch (error) {
        console.error("Error deleting adventure: ", error);
        throw error;
    }
}

// * Adventure Interaction Methods * ----------------

// Real-Time Adventure Listener
// export async function realtimeTokens(adventureId) {
//     const tokensRef = doc(db, "adventure", adventureId)

//     // Listen for changes to 'tokens' data
//     tokensRef.on('value', (snapshot) => {
//       const updatedTokens = snapshot.val();
//       if (updatedTokens) {
//         setTokens(updatedTokens);
//       }
//     });
//   };

export async function addPlayerToAdventure(adventureId, identifier) {
    try {
        let userId = identifier;

        // If the identifier is not in the format of a typical Firestore ID, assume it's a username
        if (!/^[a-zA-Z0-9]{20}$/.test(identifier)) {
            userId = await getUserIdByUsername(identifier);
        }

        // Reference to the adventure document
        const adventureDocRef = doc(db, "adventures", adventureId);

        // Reference to the user document
        const userReference = doc(db, "users", userId);
        const userDocRef = doc(db, "users", userId);

        // Transaction to ensure both operations complete
        await runTransaction(db, async (transaction) => {
            // Update adventure document to add the player
            transaction.update(adventureDocRef, {
                players: arrayUnion(userReference),
            });

            // Update user's document to add the adventure reference to "myAdventure"
            transaction.update(userDocRef, {
                myAdventures: arrayUnion(adventureId),
            });
        });

        console.log(
            "Player added to the adventure and adventure added to the player's myAdventure list successfully"
        );
    } catch (error) {
        console.error(
            "Error updating both player and adventure references: ",
            error
        );
        throw error;
    }
}

// Remove a player from an adventure
export async function removePlayerFromAdventure(adventureId, identifier) {
    try {
        let userId = identifier;

        // If the identifier is not in the format of a typical Firestore ID, assume it's a username
        if (!/^[a-zA-Z0-9]{20}$/.test(identifier)) {
            userId = await getUserIdByUsername(identifier.toLowerCase());
        }

        const adventureDocRef = doc(db, "adventures", adventureId);
        const userDocRef = doc(db, "users", userId);

        // Fetch the adventure to check the createdBy field
        const adventureSnapshot = await getDoc(adventureDocRef);
        if (!adventureSnapshot.exists()) {
            throw new Error("Adventure not found");
        }

        const adventureData = adventureSnapshot.data();
        if (adventureData.createdBy === userId) {
            alert("Cannot remove Adventure creator from this Adventure");
            return;
        }

        // Use a transaction to handle the updates
        await runTransaction(db, async (transaction) => {
            // Remove user from the adventure's players list
            transaction.update(adventureDocRef, {
                players: arrayRemove(userDocRef),
            });

            // Remove the adventure from the user's myAdventure list
            transaction.update(userDocRef, {
                myAdventures: arrayRemove(adventureId),
            });

            // Remove the adventureId from the user's currentAdventure (if present)
            if (adventureData.currentAdventure === adventureId) {
                transaction.update(userDocRef, {
                    currentAdventure: null, // Assuming the absence of the adventure is represented by null
                });
            }
        });

        console.log(
            "Player removed from the adventure successfully and adventure removed from player's lists"
        );
    } catch (error) {
        console.error("Error removing player from adventure: ", error);
        throw error;
    }
}

// Token CRUD
