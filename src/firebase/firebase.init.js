// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8LPASx22h-XmYhCgCi5cUVhmxizAvabM",
  authDomain: "utility-bill-be390.firebaseapp.com",
  projectId: "utility-bill-be390",
  storageBucket: "utility-bill-be390.firebasestorage.app",
  messagingSenderId: "310203857422",
  appId: "1:310203857422:web:edc704417c1478d3fd9a5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);