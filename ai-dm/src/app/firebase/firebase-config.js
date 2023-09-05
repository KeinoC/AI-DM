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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const realtimeDB = getDatabase(app);

// async function signIn(email, password) {

//     try {
//         const authUser = await signInWithFirebase(email, password);
//         console.log(authUser.uid);

//         // Get user data from Firestore USERS collection
//         const userDocRef = doc(db, "users", authUser.uid);
//         const userDocSnapshot = await getDoc(userDocRef);

//         if (userDocSnapshot.exists()) {
//             const userData = userDocSnapshot.data();
//             console.log('user data: ', userData)
//             setCurrentUser(userData);
//         } else {
//             // User does not exist in Firestore, create a new document
//             const user = {
//                 uid: authUser.uid,
//                 email: email,
//             };
//             setCurrentUser(user);
//         }

//     } catch (error) {
//         console.error("Sign-in error:", error);
//     }
// };


export { db, auth, realtimeDB, };

