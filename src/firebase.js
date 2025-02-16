// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRvaLcU8X--tCZ_pcRZecEAW95X5WY6a0",
  authDomain: "gradlink-80a83.firebaseapp.com",
  projectId: "gradlink-80a83",
  storageBucket: "gradlink-80a83.appspot.com", // Fix incorrect domain
  messagingSenderId: "323160039273",
  appId: "1:323160039273:web:330e05a8e63b1c204667f8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

// Export auth and db
export { auth, db };
export default app;
