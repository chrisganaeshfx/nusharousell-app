import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCIjV9WAf1OBTx0wk7_YXuvvLW1RA7HS2Q",
  authDomain: "nusharousell-app.firebaseapp.com",
  projectId: "nusharousell-app",
  storageBucket: "nusharousell-app.appspot.com",
  messagingSenderId: "1055443206020",
  appId: "1:1055443206020:web:b56f01e4cd0a3a581427d1",
  measurementId: "G-613XR3FH3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);