// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAI5lqOZMVlxtcNB5IFdWWJ4A0gUA5LVsU",
  authDomain: "e-commerce-6f8d2.firebaseapp.com",
  projectId: "e-commerce-6f8d2",
  storageBucket: "e-commerce-6f8d2.appspot.com",
  messagingSenderId: "807619100089",
  appId: "1:807619100089:web:94d835a528f081cd934a68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);