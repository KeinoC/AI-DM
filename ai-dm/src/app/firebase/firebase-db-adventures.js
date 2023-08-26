const {
    doc,
    setDoc,
    Timestamp,
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    getFirestore,
    query,
    where,
    arrayUnion,
} = require("firebase/firestore");
import { auth, db } from "./firebase-config";
import { ITEMS } from "../utils/variables/database-vars";
import { getUserIdByUsername } from "./firebase-auth";

// * adventures collection CRUD Methods * ----------------

// Create Adventure
export async function createAdventure(adventureData) {
    try {
        const adventuresCollection = collection(db, "adventures");

        const newAdventureRef = await addDoc(adventuresCollection, {
            ...adventureData,
            createdAt: Timestamp.fromDate(new Date()),
            createdBy: auth.currentUser.uid,
        });

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

        const adventureDocRef = doc(db, "adventures", adventureId);
        const userReference = doc(db, "users", userId);

        await updateDoc(adventureDocRef, {
            players: arrayUnion(userReference),
        });

        console.log("Player added to the adventure successfully");
    } catch (error) {
        console.error("Error adding player to adventure: ", error);
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
        const userReference = doc(db, "users", userId);

        await updateDoc(adventureDocRef, {
            players: arrayRemove(userReference),
        });

        console.log("Player removed from the adventure successfully");
    } catch (error) {
        console.error("Error removing player from adventure: ", error);
        throw error;
    }
}
