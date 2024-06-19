import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNl_3tKIcGgzdX7rMPDgRO6fwDuQ0XEVc",
  authDomain: "authentication-d0a6c.firebaseapp.com",
  projectId: "authentication-d0a6c",
  storageBucket: "authentication-d0a6c.appspot.com",
  messagingSenderId: "1011643992470",
  appId: "1:1011643992470:web:90dbd4f59d3881686df5b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { auth, db, storage }