// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAIWrwmfo47-DBUSxvU6PlPEOO-4mX6jE",
  authDomain: "movies-app-mvelardeq.firebaseapp.com",
  projectId: "movies-app-mvelardeq",
  storageBucket: "movies-app-mvelardeq.appspot.com",
  messagingSenderId: "1043588102960",
  appId: "1:1043588102960:web:34372a22de4e10ed5966f5"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)