const {
    collection,
    doc,
    getDocs,
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
import { auth, db } from "./firebase-config";
import { ITEMS } from "../utils/variables/database-vars";
import { getUserIdByUsername } from "./firebase-auth";
import { navToFullRoute } from "../utils/helpers/navigation";
// import { useUser } from "../contexts/UserContext";

// const {currentUser} = useUser();

// * adventures collection CRUD Methods * ----------------

// Create Adventure
export async function createAdventure(adventureData) {
    try {
        const adventuresCollection = collection(db, "adventures");

        const newAdventureRef = await addDoc(adventuresCollection, {
            ...adventureData,
            createdAt: Timestamp.fromDate(new Date()),
            createdBy: auth.currentUser.uid,
            players: [],
            tokens: []
        });

        navToFullRoute(`./adventures/${newAdventureRef.id}`)
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

// Update Adventure by ID
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

        console.log("Player removed from the adventure successfully and adventure removed from player's lists");
    } catch (error) {
        console.error("Error removing player from adventure: ", error);
        throw error;
    }
}

// * Adventure, Token CRUD Methods * ----------------

// Create Token
// export async function addTokenToAdventure(adventureId, tokenData) {
//     try {

//         // Reference to the adventure document
//         const adventureDocRef = doc(db, "adventures", adventureId);

//         await runTransaction(db, async (transaction) => {
//             // Update adventure document to add token
//             transaction.update(adventureDocRef, {
//                 tokens: arrayUnion()
//             })
//         })


//     } catch (error) {
//         console.log(
//             "Error creating token: ",
//             error
//         );
//         throw error;
//     }
// }

// Update Token By Id (User edits token)

// Update Token Position (Take in updatedTokens array and replace all?)
