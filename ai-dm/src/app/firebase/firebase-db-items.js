const {
    doc,
    setDoc,
    Timestamp,
    collection,
    getDocs,
    addDoc,
    updateDoc,
    getFirestore,
} = require("firebase/firestore");
import { auth, db } from "./firebase-config";
import { ITEMS } from "../utils/variables/database-vars";




// * CRUD Methods * ----------------



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