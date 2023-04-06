// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJJ7tfh4biJG7Oj1HChyaE5KDp8MywQRM",
  authDomain: "moviesapi-464c7.firebaseapp.com",
  projectId: "moviesapi-464c7",
  storageBucket: "moviesapi-464c7.appspot.com",
  messagingSenderId: "1025025487879",
  appId: "1:1025025487879:web:9ca14681aa4794f227e6a2",
  measurementId: "G-R7MCFMCBZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const  db = getFirestore(app);
