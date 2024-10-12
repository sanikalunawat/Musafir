// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "musafir-4245b.firebaseapp.com",
  projectId: "musafir-4245b",
  storageBucket: "musafir-4245b.appspot.com",
  messagingSenderId: "314926792609",
  appId: "1:314926792609:web:40e52552bcdae3fb71d5e0",
  measurementId: "G-5S0MHDYDYW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
