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
} = require("firebase/firestore");
import { auth, db } from "./firebase-config";
import { ITEMS } from "../utils/variables/database-vars";


// * characters collection CRUD Methods * ----------------

// Create Character
export async function createCharacter(characterData) {
    try {
        const charactersCollection = collection(db, "characters");

        const newCharacterRef = await addDoc(charactersCollection, {
            ...characterData,
            createdAt: Timestamp.fromDate(new Date()),
            createdBy: auth.currentUser.uid,
        });

        console.log("Character created with ID: ", newCharacterRef.id);
        return newCharacterRef.id;
    } catch(error) {
        console.error('Error creating character: ', error);
        throw error;
    }
}

// Get All Characters from DB
export async function getAllCharacters() {
    try {
        const charactersCollection = collection(db, "characters");
        const querySnapshot = await getDocs(charactersCollection);

        const allCharacters = [];
        querySnapshot.forEach((character) => {
            allCharacters.push({ id: character.id, ...character.data() });
        });

        return allCharacters;
    } catch (error) {
        console.error('Error getting characters: ', error);
        throw error;
    }
}

// Get Character by ID
export async function getCharacterById(characterId) {
    try {
        const characterDocRef = doc(db, "characters", characterId);
        const characterSnapshot = await getDoc(characterDocRef);

        if (characterSnapshot.exists()) {
            const characterData = characterSnapshot.data();
            return { id: characterSnapshot.id, ...characterData };
        } else {
            throw new Error("Character not found");
        }
    } catch (error) {
        console.error('Error getting character by ID: ', error);
        throw error;
    }
}

// Update Character by ID
export async function updateCharacter(characterId, updateData) {
    try {
        const characterDocRef = doc(db, "characters", characterId);
        await updateDoc(characterDocRef, updateData);

        console.log("Character updated successfully");
    } catch (error) {
        console.error('Error updating character: ', error);
        throw error;
    }
}

// Delete Character by ID
export async function deleteCharacter(characterId) {
    try {
        const characterDocRef = doc(db, "characters", characterId);
        await deleteDoc(characterDocRef);

        console.log("Character deleted successfully");
    } catch (error) {
        console.error('Error deleting character: ', error);
        throw error;
    }
}
