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
import { ITEMS, ADVENTURES, CHARACTERS } from "../utils/variables/database-vars";




// * items collection basic CRUD Methods * ----------------

// create item
export async function createItem(ItemData) {
    try {
        const itemsCollection = collection(db, ITEMS)

        const newItemRef = await addDoc(itemsCollection, {
            ...ItemData,
            createdAt: Timestamp.fromDate(new Date()),
            createdBy: auth.currentUser.uid,
        });

        console.log("Item created with ID: ", newItemRef.id);
        return newItemRef.id;
    } catch(error) {
        console.error('Error creating item: ', error);
        throw error;
    }
}

// get All items from db
export async function getAllItems() {
    try {
        const itemsCollection = collection(db, ITEMS);
        const querySnapshot = await getDocs(itemsCollection);

        const allItems = [];
        querySnapshot.forEach((item) => {
            allItems.push({id: doc.id, ...doc.data()});
        });

        return allItems;
    } catch (error) {
        console.error('Error getting items: ', error);
        throw error;
    }
}

// get item by id
export async function getItemById(itemId) {
    try {
        const itemDocRef = doc(db, ITEMS, itemId);
        const itemSnapshot = await getDoc(itemDocRef);

        if (itemSnapshot.exists()) {
            const itemData =  itemSnapshot.data();
            return { id: itemSnapshot.id, ...itemData };
        }
    } catch (error) {
        console.error('Error getting item by ID: ', error);
        throw error
    }
}

// Update Item by ID
export async function updateItem(itemId, updateData) {
    try {
        const itemDocRef = doc(db, ITEMS, itemId);
        await updateDoc(itemDocRef, updateData);

        console.log("Item updated successfully");
    } catch (error) {
        console.error('Error updating item: ', error);
        throw error;
    }
}

// Delete Item by ID
export async function deleteItem(itemId) {
    try {
        const itemDocRef = doc(db, ITEMS, itemId);
        await deleteDoc(itemDocRef);

        console.log("Item deleted successfully");
    } catch (error) {
        console.error('Error deleting item: ', error);
        throw error;
    }
}

// * item interaction methods * --------------------------------

// Add Item to Adventure
export async function addItemToAdventure(adventureId, itemId) {
    try {
        const adventureDocRef = doc(db, ADVENTURES, adventureId);
        const adventureData = await adventureDocRef.get();

        if (adventureData.exists()) {
            const updatedItems = [...(adventureData.data().items || []), itemId];
            await updateDoc(adventureDocRef, { items: updatedItems });

            console.log("Item added to adventure successfully");
        } else {
            throw new Error("Adventure not found");
        }
    } catch (error) {
        console.error('Error adding item to adventure: ', error);
        throw error;
    }
}

// Remove Item from Adventure
export async function removeItemFromAdventure(itemId) {
    try {
        const itemDocRef = doc(db, ITEMS, itemId);
        const itemData = await itemDocRef.get();

        if (itemData.exists()) {
            const adventureId = itemData.data().adventureId;

            if (!adventureId) {
                throw new Error("Item is not associated with any adventures");
            }

            const adventureDocRef = doc(db, ADVENTURES, adventureId);
            const adventureData = await adventureDocRef.get();

            if (adventureData.exists()) {
                const characterCollection = collection(db, CHARACTERS);
                const characterDataSnapshot = await getDocs(characterCollection)

                // Remove items from characters who have it
                characterDataSnapshot.forEach(async (characterDoc) => {
                    const characterData = characterDoc.data();
                    if (characterData.items && characterData.items.includes(itemId)) {
                        const updatedItems = characterData.items.filter(id => id !== itemId)
                        await updateDoc(adventureDocRef, {items: updatedItems});
                    }
                });

                    // remove item from adventure
                    const updatedAdventureItems = adventureData.data().items.filter(id => id !== itemId);
                    await updateDoc(adventureDocRef, { items: updatedAdventureItems });

                        // Delete the actual item (not sure if we want to delete the original item, just from adventure and character is enough)
                        // await deleteDoc(itemDocRef);

                        console.log("Item removed from game successfully");
                    } else {
                        throw new Error("Adventure not found");
                    }
                } else {
                    throw new Error("Item not found");
                }
            } catch (error) {
                console.error("Error removing item from game: ", error);
                throw error
            }
}

// Add Item to Character
export async function addItemToCharacter(characterId, itemId) {
    try {
        const characterDocRef = doc(db, CHARACTERS, characterId);
        const characterData = await characterDocRef.get();

        if (characterData.exists()) {
            const adventureId = characterData.data().adventureId;

            if (!adventureId) {
                throw new Error("Character is not associated with any adventure");
            }

            const adventureDocRef = doc(db, ADVENTURES, adventureId);
            const adventureData = await adventureDocRef.get();

            if (adventureData.exists() && adventureData.data().items.includes(itemId)) {
                const updatedItems = [...(characterData.data().items || []), itemId];
                await updateDoc(characterDocRef, { items: updatedItems });

                console.log("Item added to character successfully");
            } else {
                throw new Error("Item is not in the adventure the character is playing in");
            }
        } else {
            throw new Error("Character not found");
        }
    } catch (error) {
        console.error('Error adding item to character: ', error);
        throw error;
    }
}

// Remove item from character
export async function removeItemFromCharacter(characterId, itemId) {
    try {
        const characterDocRef = doc(db, CHARACTERS, characterId);
        const characterData = await characterDocRef.get();

        if (characterData.exists()) {
            const updatedItems = characterData.data().items.filter(id => id !== itemId);
            await updateDoc(characterDocRef, { items: updatedItems });

            console.log("Item removed from character successfully");
        } else {
            throw new Error("Character not found");
        }
    } catch (error) {
        console.error('Error removing item from character: ', error);
        throw error;
    }
}
