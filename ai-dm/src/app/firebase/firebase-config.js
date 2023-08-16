const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getAuth } = require("firebase/auth");
const { getDatabase } = require("firebase/database");

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

let db, auth, realtimeDB; // Declare the variables outside the try-catch block

// Initialize Firebase
try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    realtimeDB = getDatabase(app);

    console.log("Firebase App initialized:", !!app);
    console.log("Firestore initialized:", !!db);
    console.log("Auth initialized:", !!auth);
    console.log("Realtime Database initialized:", !!realtimeDB);

} catch (error) {
    console.error("Error initializing Firebase:", error);
}

export { db, auth, realtimeDB };

