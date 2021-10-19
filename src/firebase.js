// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB7XyBeMyEQ5gLHwUtR3Xs6bKXzAi9_zYI",
    authDomain: "instagram-clone-ee30d.firebaseapp.com",
    databaseURL: "https://instagram-clone-ee30d-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-ee30d",
    storageBucket: "instagram-clone-ee30d.appspot.com",
    messagingSenderId: "603840374253",
    appId: "1:603840374253:web:633cb39bfe3d9318f533e4",
    measurementId: "G-0W3TNGFWC6"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};




