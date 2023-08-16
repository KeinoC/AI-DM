import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCZDLfPHplyTOzke4UfJtLCYaBJrzctJAs",
    authDomain: "ai-dnd-e1178.firebaseapp.com",
    databaseURL: "https://ai-dnd-e1178-default-rtdb.firebaseio.com",
    projectId: "ai-dnd-e1178",
    storageBucket: "ai-dnd-e1178.appspot.com",
    messagingSenderId: "53624100351",
    appId: "1:53624100351:web:765dccc7c3a9f08d8143ca",
    measurementId: "G-38W8CS831Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const realtimeDB = getDatabase(app);

console.log("Firebase App initialized:", !!app);
console.log("Firestore initialized:", !!db);
console.log("Auth initialized:", !!auth);

export { db, auth, realtimeDB };
