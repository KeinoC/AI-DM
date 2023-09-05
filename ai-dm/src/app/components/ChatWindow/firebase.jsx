import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";


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
export const db = getFirestore(app);
export const auth = getAuth(app);