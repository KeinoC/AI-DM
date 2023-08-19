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




// * items collection CRUD Methods * ----------------

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
