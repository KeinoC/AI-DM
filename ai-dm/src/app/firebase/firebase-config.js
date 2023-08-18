const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, doc, setDoc } = require("firebase/firestore");
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

    // getUsers(db);
    // createUser(db);



    console.log("Firebase App initialized:", !!app);
    console.log("Firestore initialized:", !!db);
    console.log("Auth initialized:", !!auth);
    console.log("Realtime Database initialized:", !!realtimeDB);

} catch (error) {
    console.error("Error initializing Firebase:", error);
}
// async function getUsers(db) {
//     // debugger;
//     const usersCol = collection(db, 'users');
//     const usersSnapshot = await getDocs(usersCol);
//     const usersList = usersSnapshot.docs.map(doc => doc.data());
//     console.log(usersList);
// }

// async function createUser(db) {
//     try {
//         const newUser = {
//             id: "1",
//             email: "abc@abc.com",
//             createdAt: "now",
//         };
//         // debugger;
//         const docRef = doc(db, "users", "1");
//         await setDoc(docRef, newUser);
//         // const userCollection = db.ref("users")

//         console.log("User document created successfully");
//     } catch (error) {
//         console.error("Error creating user document:", error);
//     }
// };

export { db, auth, realtimeDB };

