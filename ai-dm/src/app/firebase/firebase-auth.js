import { auth, db } from "./firebase-config";
import { navToMapNamed, navToHome } from "../utils/helpers/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
const {
    doc,
    setDoc,
    Timestamp,
    collection,
    getDocs,
    addDoc,
    updateDoc,
    getFirestore,
    query,
    where,

} = require("firebase/firestore");
import { USERS } from "../utils/variables/database-vars";
import { WATERDEEP } from "../utils/variables/map-vars";


// Sign Up
// check if profile / email already exist. and throw error / exception

export const createFirestoreUser = async (id, email, username) => {
    const createdAt = Timestamp.fromDate(new Date());
    try {
        const newUser = {
            id: id,
            username: username.toLowerCase(),
            email: email,
            createdAt: createdAt,
        };
        const docRef = doc(db, USERS, id);
        await setDoc(docRef, newUser);

        console.log("User document created successfully");
    } catch (error) {
        console.log(err.response.data.error);
        console.error("Error creating user document:", error);
    }
};

export const signUp = async (email, password, username) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        // Check if email already exists in the 'users' collection
        if (user) {
            const id = user?.uid;
            const email = user?.email;
            await createFirestoreUser(id, email, username);
        }
        console.log("Document written with ID:", user.uid);
        // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        navToHome();
        return user;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(err.response.data.error);
        console.error(errorCode, errorMessage);
    }
};

export const signIn = async (email, password) => {
    try {
        // await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;

        // Successful sign-in logic
        if (user) {
            console.log("User signed in successfully:", user.uid);
            navToHome();
            return user;
        }
    } catch (error) {
        // Handle sign-in errors
        const errorCode = error.code;
        const errorMessage = error.message;

        // You can handle different error codes with custom messages
        if (errorCode === "auth/wrong-password") {
            console.error("Wrong password");
        } else if (errorCode === "auth/user-not-found") {
            console.error("User not found");
        } else {
            console.error("Sign-in error:", errorMessage);
        }

        // You can also return the error message or code for displaying to the user
        // return { errorCode, errorMessage };
    }
};

export async function getUserIdByUsername(username) {
    try {
        const usersQuery = query(collection(db, "users"), where("username", "==", username));
        const querySnapshot = await getDocs(usersQuery);

        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].id;
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
        console.error('Error fetching user by username: ', error);
        throw error;
    }
}





// Sign Out
export const signOut = async () => {
    await auth.signOut();
    navToHome();
}
