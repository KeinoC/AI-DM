const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, doc, setDoc } = require("firebase/firestore");
const { getAuth, browserSessionPersistence } = require("firebase/auth");
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const realtimeDB = getDatabase(app);

// Set the Auth persistence to SESSION
try {
    auth.setPersistence(browserSessionPersistence);
} catch (err) {
    console.error("Could not set Auth persistence", err);
}

export { db, auth, realtimeDB };
