import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBEUjdj-qynpI6L-JZ7Me2yLVDcvfI2DII",
    authDomain: "pocket-26446.firebaseapp.com",
    databaseURL: "https://pocket-26446-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pocket-26446",
    storageBucket: "pocket-26446.appspot.com",
    messagingSenderId: "950201080119",
    appId: "1:950201080119:web:a0ba933b58d0f81bd822b2",
    measurementId: "G-8J190P9CPQ"
};
const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);